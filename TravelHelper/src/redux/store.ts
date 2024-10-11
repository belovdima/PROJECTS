import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice"; // Наш редьюсер для меню

const store = configureStore({
    reducer: {
        menu: menuReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
