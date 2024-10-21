import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import zoomReducer from "./zoomSlice";
import labelReducer from "./labelSlice";

const store = configureStore({
    reducer: {
        menu: menuReducer,
        zoom: zoomReducer,
        label: labelReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
