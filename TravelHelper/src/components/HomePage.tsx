import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";

export const HomePage = () => {
    const [menuOpen, setMenuOpen] = useState(true); // Состояние для меню
    const navigate = useNavigate();
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    const handleClick = () => {
        setMenuOpen(false);
        setTimeout(() => {
            navigate("/mappage", { replace: true });
        }, 1000); // Переход через 1 секунду после анимации
    };

    // Инициализация карты
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
            const secondsPerRevolution = 200;
            function spinGlobe() {
                if (mapRef.current) {
                    const center = mapRef.current.getCenter();
                    center.lng -= 360 / secondsPerRevolution;
                    mapRef.current.easeTo({
                        center,
                        duration: 1000,
                        easing: (n) => n, // Линейное вращение
                    });
                }
            }

            // Вращаем глобус через интервал
            const interval = setInterval(spinGlobe, 1000);

            // Очистка интервала при размонтировании компонента
            return () => {
                clearInterval(interval);
                mapRef.current?.remove();
            };
        }
    }, []);

    return (
        <div className={`home ${menuOpen ? "home--open" : "home--closed"}`}>
            <div className="home__glass-menu">
                <h1 className="home__title">Добро пожаловать!</h1>
                <p className="home__description">
                    Выберите путешествие и начните исследовать мир.
                </p>
                <button className="home__btn" onClick={handleClick}>
                    Выбрать путешествие
                </button>
            </div>
            <div
                className="home__map-overlay"
                id="map-container"
                ref={mapContainerRef}></div>
        </div>
    );
};
