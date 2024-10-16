import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

// Указываем тип для ссылки на карту
export const MapPage = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null); // Используем тип Map или null
    const mapContainerRef = useRef<HTMLDivElement | null>(null); // Указываем тип HTMLDivElement или null

    useEffect(() => {
        if (mapContainerRef.current) {
            // Проверяем, что ссылка на контейнер карты существует
            mapboxgl.accessToken =
                "pk.eyJ1IjoiYmVsb3ZkaW1hIiwiYSI6ImNtMjBpbmhscDBqa3cyam9lempzNDRwbjIifQ.Mgf7Th-mTg07hZ_-qKYIUw";
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current, // Теперь container точно HTMLDivElement
                center: [0, 0], // Указываем начальные координаты
                zoom: 1, // Указываем начальный зум
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove(); // Проверяем, что карта существует перед удалением
            }
        };
    }, []);

    return (
        <>
            <div
                id="map-container"
                ref={mapContainerRef}
                style={{ width: "100%", height: "500px" }}
            />
        </>
    );
};
