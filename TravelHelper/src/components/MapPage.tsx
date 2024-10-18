import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../redux/store"; // Импортируем RootState для типизации
import { setZoom } from "./../redux/zoomSlice";

export const MapPage = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const zoom = useSelector((state: RootState) => state.zoom.zoom);
    const dispatch = useDispatch();

    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken = mapboxToken;
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center: [0, 48.429201],
                zoom: zoom,
            });

            // Настраиваем скорость масштабирования
            if (mapRef.current) {
                mapRef.current.scrollZoom.setZoomRate(0.2); // Плавное масштабирование
            }

            // Логируем текущий зум при изменении
            const logZoom = () => {
                const currZoom = mapRef.current?.getZoom();
                if (currZoom) {
                    console.log(`Current zoom: ${currZoom}`);
                    dispatch(setZoom(currZoom)); // Обновляем Redux при изменении зума
                }
            };

            // Подписка на изменение зума
            mapRef.current.on("zoomend", logZoom);

            // Настраиваем вращение
            const secondsPerRevolution = 300;
            const maxSpinZoom = 5;
            const slowSpinZoom = 3;
            let userInteracting = false;
            let isMouseOver = false; // Добавляем флаг для отслеживания, наведен ли курсор на карту

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

            // Останавливаем вращение при наведении мыши на карту
            mapRef.current.on("mousemove", () => {
                isMouseOver = true; // Наведена мышь на карту
            });

            // Возобновляем вращение, когда мышь выходит за пределы карты
            mapRef.current.on("mouseout", () => {
                isMouseOver = false; // Мышь убрана с карты
                spinGlobe();
            });

            // Останавливаем вращение при взаимодействии с картой
            mapRef.current.on("mousedown", () => {
                userInteracting = true;
            });

            // Возобновляем вращение при завершении взаимодействия
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

            // Запускаем вращение
            spinGlobe();
        }

        return () => {
            mapRef.current?.remove();
        };
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setZoom(zoom); // Обновляем зум карты, если он изменился
        }
    }, [zoom]);

    useEffect(() => {
        if (mapRef.current) {
            // Функция, которая будет логировать текущий зум
            const logZoom = () => {
                const currZoom = mapRef.current?.getZoom();
                console.log(currZoom);
            };

            // Подписка на событие изменения зума
            mapRef.current.on("zoomend", logZoom);

            // Убираем подписку при размонтировании компонента
            return () => {
                if (mapRef.current) {
                    mapRef.current.off("zoomend", logZoom);
                }
            };
        }
    }, []);

    return (
        <div
            id="map-container"
            ref={mapContainerRef}
            style={{ width: "100%", height: "800px" }}
            className="mappage"
        />
    );
};
