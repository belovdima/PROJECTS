import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    zoom: 1.5,
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        increaseZoom: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload + 0.5; // Увеличиваем текущий зум
        },
        decreaseZoom: (state, action: PayloadAction<number>) => {
            state.zoom = Math.max(action.payload - 0.5, 1); // Уменьшаем текущий зум
        },
        setZoom: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload; // Устанавливаем зум напрямую
        },
    },
});

export const { increaseZoom, decreaseZoom, setZoom } = mapSlice.actions;
export default mapSlice.reducer;
