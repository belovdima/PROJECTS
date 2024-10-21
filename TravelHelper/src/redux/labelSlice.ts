import { createSlice } from "@reduxjs/toolkit";

interface LabelState {
    isVisible: boolean;
}

const initialState: LabelState = {
    isVisible: true,
};

const labelSlice = createSlice({
    name: "label",
    initialState,
    reducers: {
        toggleLabel: (state) => {
            state.isVisible = !state.isVisible;
        },
    },
});

export const { toggleLabel } = labelSlice.actions;
export default labelSlice.reducer;
