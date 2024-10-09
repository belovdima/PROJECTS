import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

export const MapPage = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken =
                "pk.eyJ1IjoiYmVsb3ZkaW1hIiwiYSI6ImNtMjBpbmhscDBqa3cyam9lempzNDRwbjIifQ.Mgf7Th-mTg07hZ_-qKYIUw";
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center: [0, 0],
                zoom: 1.1,
            });

            // Настраиваем скорость масштабирования
            if (mapRef.current) {
                mapRef.current.scrollZoom.setZoomRate(0.2); // Плавное масштабирование
            }

            // Настраиваем вращение
            const secondsPerRevolution = 120;
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

    return (
        <div
            id="map-container"
            ref={mapContainerRef}
            style={{ width: "100%", height: "500px" }}
        />
    );
};
