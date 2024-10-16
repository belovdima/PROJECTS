import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    zoom: 1.5,
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        increaseZoom: (state) => {
            state.zoom += 0.5; // Увеличиваем уровень приближения
        },
        decreaseZoom: (state) => {
            state.zoom = Math.max(state.zoom - 0.5, 1); // Уменьшаем уровень приближения, но не ниже 1
        },
    },
});

export const { increaseZoom, decreaseZoom } = mapSlice.actions;
export default mapSlice.reducer;
