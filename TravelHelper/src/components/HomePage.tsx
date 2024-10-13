import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./../redux/store";
import { toggleMenu } from "./../redux/menuSlice";
import { increaseZoom, decreaseZoom } from "./../redux/zoomSlice";

export const HomePage = () => {
    const isOpen = useSelector((state: RootState) => state.menu.isOpen);
    const dispatch = useDispatch();

    const handleToggleMenu = () => {
        dispatch(toggleMenu());
    };

    return (
        <div>
            <div
                className={`home__glass-menu ${
                    isOpen
                        ? "home__glass-menu--open"
                        : "home__glass-menu--closed"
                }`}>
                <h1 className="home__title">Добро пожаловать!</h1>
                <p className="home__description">
                    Выберите путешествие и начните исследовать мир.
                </p>
                <button className="home__btn" onClick={handleToggleMenu}>
                    {isOpen ? "Скрыть меню" : "Показать меню"}
                </button>
                <button onClick={() => dispatch(increaseZoom())}>
                    Приблизить
                </button>
                <button onClick={() => dispatch(decreaseZoom())}>
                    Удалить
                </button>
            </div>
        </div>
    );
};
