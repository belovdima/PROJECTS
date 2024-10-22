import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useSelector } from "react-redux";
import { RootState } from "./../redux/store";

import ZoomControl from "@mapbox-controls/zoom";

export const MapPage = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const zoom = useSelector((state: RootState) => state.zoom.zoom);

    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    // const fixerApiKey = import.meta.env.VITE_FIXER_API_KEY;
    // const openWeatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

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

            mapRef.current?.on("load", () => {
                mapRef.current?.addSource("countries", {
                    type: "geojson",
                    data: "/public/stations.geojson",
                });

                mapRef.current?.addLayer({
                    id: "countries-layer",
                    type: "fill",
                    source: "countries",
                    paint: {
                        "fill-color": "#627BC1",
                        "fill-opacity": [
                            "case",
                            ["boolean", ["feature-state", "hover"], false],
                            1,
                            0.5,
                        ],
                    },
                });

                let hoveredCountryId: any = null;

                mapRef.current?.on("mousemove", "countries-layer", (e) => {
                    if (e.features && e.features.length > 0) {
                        if (hoveredCountryId !== null) {
                            mapRef.current?.setFeatureState(
                                { source: "countries", id: hoveredCountryId },
                                { hover: false }
                            );
                        }
                        hoveredCountryId = e.features[0].id;
                        mapRef.current?.setFeatureState(
                            { source: "countries", id: hoveredCountryId },
                            { hover: true }
                        );
                    }
                });

                mapRef.current?.on("mouseleave", "countries-layer", () => {
                    if (hoveredCountryId !== null) {
                        mapRef.current?.setFeatureState(
                            { source: "countries", id: hoveredCountryId },
                            { hover: false }
                        );
                    }
                    hoveredCountryId = null;
                });
            });

            mapRef.current.addControl(new ZoomControl(), "bottom-right");

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

    return (
        <div
            id="map-container"
            ref={mapContainerRef}
            style={{ width: "100%", height: "800px" }}
            className="mappage"
        />
    );
};
