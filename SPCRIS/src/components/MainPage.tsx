import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setPeople, selectPerson } from "../redux/peopleSlice";
import { Link } from "react-router-dom";

const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const people = useSelector((state: RootState) => state.people.people);

    // Заглушка данных, но в реальной жизни можно сделать fetch к API
    useEffect(() => {
        const mockPeople = [
            {
                id: 1,
                name: "John Doe",
                age: 30,
                email: "john@example.com",
                position: "Manager",
            },
            {
                id: 2,
                name: "Jane Smith",
                age: 25,
                email: "jane@example.com",
                position: "Manager",
            },
        ];
        dispatch(setPeople(mockPeople));
    }, [dispatch]);

    return (
        <div>
            <h1>Список людей</h1>
            <ul>
                {people.map((person) => (
                    <li key={person.id}>
                        <Link
                            to={`/person/${person.id}`}
                            onClick={() => dispatch(selectPerson(person.id))}>
                            {person.name} - {person.age} лет
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MainPage;
