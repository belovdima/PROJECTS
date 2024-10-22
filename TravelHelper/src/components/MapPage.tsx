import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../redux/store";
import { setZoom } from "./../redux/zoomSlice";

export const MapPage = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const zoom = useSelector((state: RootState) => state.zoom.zoom);
    const dispatch = useDispatch();

    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const labelsVisible = useSelector(
        (state: RootState) => state.label.isVisible
    ); // Получаем видимость названий

    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken = mapboxToken;
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center: [0, 48.429201],
                zoom: zoom,
            });

            //Вращение глобуса
            const secondsPerRevolution = 300;
            const maxSpinZoom = 5;
            const slowSpinZoom = 3;
            let userInteracting = false;
            let isMouseOver = false;
            function spinGlobe() {
                const zoom = mapRef.current?.getZoom();
                if (
                    !userInteracting &&
                    !isMouseOver &&
                    zoom &&
                    zoom < maxSpinZoom
                ) {
                    let distancePerSecond = 360 / secondsPerRevolution;
                    if (zoom > slowSpinZoom) {
                        const zoomDif =
                            (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                        distancePerSecond *= zoomDif;
                    }
                    const center = mapRef.current?.getCenter();
                    if (center) {
                        center.lng -= distancePerSecond;
                        mapRef.current?.easeTo({
                            center,
                            duration: 1000,
                            easing: (n) => n,
                        });
                    }
                }
            }
            mapRef.current.on("mousemove", () => {
                isMouseOver = true;
            });
            mapRef.current.on("mouseout", () => {
                isMouseOver = false;
                spinGlobe();
            });
            mapRef.current.on("mousedown", () => {
                userInteracting = true;
            });
            mapRef.current.on("mouseup", () => {
                userInteracting = false;
                spinGlobe();
            });
            mapRef.current.on("dragend", () => {
                userInteracting = false;
                spinGlobe();
            });
            mapRef.current.on("moveend", () => {
                spinGlobe();
            });
            spinGlobe();

            //Изменение Zoom
            if (mapRef.current) {
                mapRef.current.scrollZoom.setZoomRate(0.2);
            }
            const logZoom = () => {
                const currZoom = mapRef.current?.getZoom();
                if (currZoom) {
                    console.log(`Current zoom: ${currZoom}`);
                    dispatch(setZoom(currZoom));
                }
            };
            mapRef.current.on("zoomend", logZoom);
        }

        return () => {
            mapRef.current?.remove();
        };
    }, []);

    useEffect(() => {
        if (labelsVisible) {
            console.log("HI");
        }
    }, [labelsVisible]);

    //Изменение Zoom
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setZoom(zoom);
        }
    }, [zoom]);

    return (
        <div
            id="map-container"
            ref={mapContainerRef}
            style={{ width: "100%", height: "800px" }}
            className="mappage"
        />
    );
};
