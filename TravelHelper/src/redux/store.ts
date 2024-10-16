import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice"; // Наш редьюсер для меню
import zoomReducer from "./zoomSlice";

const store = configureStore({
    reducer: {
        menu: menuReducer,
        zoom: zoomReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
