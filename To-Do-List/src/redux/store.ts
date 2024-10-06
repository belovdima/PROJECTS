import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";
import {
    saveStateToLocalStorage,
    loadStateFromLocalStorage,
} from "./localStorage";

const preloadedState = loadStateFromLocalStorage();

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
    },

    preloadedState,
});

store.subscribe(() => {
    saveStateToLocalStorage({
        tasks: store.getState().tasks,
    });
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
