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
        toggleTask(state, action: PayloadAction<number>) {
            const task = state.find((task) => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                task.completionTime = task.completed
                    ? new Date().toISOString()
                    : null; // Устанавливаем время выполнения
            }
        },
    },
});

export const { addTask, deleteTask, toggleTask } = taskSlice.actions;
export default taskSlice.reducer;
