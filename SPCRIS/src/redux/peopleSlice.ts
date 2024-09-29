import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Person {
    id: number;
    name: string;
    age: number;
    email: string;
    position: string;
    status: string;
    level: string;
    format: string;
    team: string;
    sex: string;
    birthday: string;
    exWork: string;
    photo: string;
}

interface PeopleState {
    people: Person[];
    selectedPerson?: Person;
}

const initialState: PeopleState = {
    people: [],
};

const peopleSlice = createSlice({
    name: "people",
    initialState,
    reducers: {
        setPeople: (state, action: PayloadAction<Person[]>) => {
            state.people = action.payload;
        },
        selectPerson: (state, action: PayloadAction<number>) => {
            state.selectedPerson = state.people.find(
                (person) => person.id === action.payload
            );
        },
    },
});

export const { setPeople, selectPerson } = peopleSlice.actions;
export default peopleSlice.reducer;
