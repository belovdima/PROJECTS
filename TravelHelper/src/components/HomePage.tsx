import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export const HomePage = () => {
    const [menuOpen, setMenuOpen] = useState(true); // Состояние для меню (открыто/закрыто)
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    const handleClick = () => {
        setMenuOpen(!menuOpen); // Переключение состояния меню
    };

    // Загрузка и настройка карты
    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken =
                "pk.eyJ1IjoiYmVsb3ZkaW1hIiwiYSI6ImNtMjBpbmhscDBqa3cyam9lempzNDRwbjIifQ.Mgf7Th-mTg07hZ_-qKYIUw";
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center: [0, 0],
                zoom: 1.5,
                interactive: false, // Глобус не интерактивен
            });

            // Вращение глобуса
            const secondsPerRevolution = 300;
            let animationFrameId: number;

            function spinGlobe() {
                if (mapRef.current) {
                    const center = mapRef.current.getCenter();
                    center.lng -= 360 / secondsPerRevolution;
                    mapRef.current.easeTo({
                        center,
                        duration: 1000,
                        easing: (n) => n, // Линейное вращение
                    });
                    animationFrameId = requestAnimationFrame(spinGlobe);
                }
            }

            spinGlobe();

            return () => {
                cancelAnimationFrame(animationFrameId);
                mapRef.current?.remove();
            };
        }
    }, []);

    return (
        <div className={`home ${menuOpen ? "home--open" : "home--closed"}`}>
            <div className="home__glass-menu">
                {menuOpen ? (
                    <>
                        <h1 className="home__title">Добро пожаловать!</h1>
                        <p className="home__description">
                            Выберите путешествие и начните исследовать мир.
                        </p>
                        <button className="home__btn" onClick={handleClick}>
                            Выбрать путешествие
                        </button>
                    </>
                ) : (
                    <button className="home__btn" onClick={handleClick}>
                        Вернуться назад
                    </button>
                )}
            </div>
            <div
                className="home__map-overlay"
                id="map-container"
                ref={mapContainerRef}></div>
        </div>
    );
};
