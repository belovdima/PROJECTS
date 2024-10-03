import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
    },
});

export default store;
