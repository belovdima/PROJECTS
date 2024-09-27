import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Person {
    // Описываем тип данных человека
    id: number;
    name: string;
    age: number;
    email: string;
    position: string;
}

interface PeopleState {
    // Состояние, связанное с людьми
    people: Person[]; // Массив людей
    selectedPerson?: Person; // Выбранный человек (необязательный)
}

const initialState: PeopleState = {
    // Начальное состояние
    people: [], // По умолчанию список людей пуст
};

const peopleSlice = createSlice({
    name: "people", // Имя слайса
    initialState, // Начальное состояние
    reducers: {
        // Редьюсеры (логика изменения состояния)
        setPeople: (state, action: PayloadAction<Person[]>) => {
            state.people = action.payload; // Обновляем список людей
        },
        selectPerson: (state, action: PayloadAction<number>) => {
            state.selectedPerson = state.people.find(
                (person) => person.id === action.payload
            );
            // Находим и выбираем человека по его id
        },
    },
});

export const { setPeople, selectPerson } = peopleSlice.actions; // Экспортируем действия
export default peopleSlice.reducer; // Экспортируем редьюсер для Store
