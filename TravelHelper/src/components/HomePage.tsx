import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../redux/store";
import { toggleMenu } from "./../redux/menuSlice";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const HomePage = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    const isOpen = useSelector((state: RootState) => state.menu.isOpen);
    const dispatch = useDispatch();
    const [interactive, setInteractive] = useState(false);

    // Используем useEffect для обновления интерактивности глобуса при изменении isOpen
    useEffect(() => {
        setInteractive(!isOpen); // Если меню открыто - отключаем интерактивность
    }, [isOpen]);

    const handleClick = () => {
        dispatch(toggleMenu()); // Переключаем состояние меню
    };

    // Загрузка и настройка карты
    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken = mapboxToken;
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center: [0, 0],
                zoom: 1.5,
                interactive: interactive, // Глобус не интерактивен
            });

            const secondsPerRevolution = 300;
            const maxSpinZoom = 5;
            const slowSpinZoom = 3;
            let userInteracting = false;
            let isMouseOver = false; // Флаг для отслеживания, наведен ли курсор на карту

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

            // Останавливаем вращение при наведении мыши на карту, только если меню закрыто
            mapRef.current.on("mousemove", () => {
                if (!isOpen) {
                    isMouseOver = true; // Наведена мышь на карту
                }
            });

            // Возобновляем вращение, когда мышь выходит за пределы карты, только если меню закрыто
            mapRef.current.on("mouseout", () => {
                if (!isOpen) {
                    isMouseOver = false; // Мышь убрана с карты
                    spinGlobe();
                }
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

            // Плавное масштабирование
            mapRef.current.scrollZoom.setZoomRate(0.2);

            // Запускаем вращение
            spinGlobe();

            return () => {
                mapRef.current?.remove();
            };
        }
    }, [interactive]);

    return (
        <div className={`home ${isOpen ? "home--open" : "home--closed"}`}>
            <div className="home__glass-menu">
                {isOpen ? (
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
