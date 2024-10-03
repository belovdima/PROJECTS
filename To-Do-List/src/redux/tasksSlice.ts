import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Task {
    id: number;
    description: string;
    deadline: string;
    completed: boolean;
    completionTime: string | null;
}

const initialState: Task[] = [];

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Task>) {
            state.push(action.payload);
        },
        deleteTask(state, action: PayloadAction<number>) {
            return state.filter((task) => task.id !== action.payload);
        },
    },
});

export const { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
