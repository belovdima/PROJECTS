import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setPeople, selectPerson } from "../redux/peopleSlice";
import { Link } from "react-router-dom";

export const MainPage = () => {
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
                status: "employee",
                level: "senior",
                format: "remote",
                team: "frontend",
                sex: "male",
                birthday: "12-12-1990",
                exWork: "Liverpool FC",
                photo: "",
            },
            {
                id: 2,
                name: "Jane Smith",
                age: 25,
                email: "jane@example.com",
                position: "Manager",
                status: "employee",
                level: "junior",
                format: "office",
                team: "backend",
                sex: "male",
                birthday: "20-10-2000",
                exWork: "McDonalds",
                photo: "",
            },
            {
                id: 3,
                name: "Michael Johnson",
                age: 35,
                email: "michael.johnson@example.com",
                position: "Team Lead",
                status: "employee",
                level: "senior",
                format: "hybrid",
                team: "frontend",
                sex: "male",
                birthday: "15-05-1989",
                exWork: "Google",
                photo: "",
            },
            {
                id: 4,
                name: "Emily Davis",
                age: 28,
                email: "emily.davis@example.com",
                position: "Developer",
                status: "employee",
                level: "middle",
                format: "remote",
                team: "backend",
                sex: "female",
                birthday: "07-08-1995",
                exWork: "Microsoft",
                photo: "",
            },
            {
                id: 5,
                name: "David Wilson",
                age: 40,
                email: "david.wilson@example.com",
                position: "Product Manager",
                status: "employee",
                level: "senior",
                format: "office",
                team: "management",
                sex: "male",
                birthday: "22-11-1983",
                exWork: "Facebook",
                photo: "",
            },
            {
                id: 6,
                name: "Olivia Brown",
                age: 32,
                email: "olivia.brown@example.com",
                position: "QA Engineer",
                status: "employee",
                level: "middle",
                format: "hybrid",
                team: "QA",
                sex: "female",
                birthday: "03-03-1992",
                exWork: "Spotify",
                photo: "",
            },
            {
                id: 7,
                name: "Daniel Miller",
                age: 27,
                email: "daniel.miller@example.com",
                position: "Developer",
                status: "employee",
                level: "junior",
                format: "office",
                team: "frontend",
                sex: "male",
                birthday: "17-07-1996",
                exWork: "Tesla",
                photo: "",
            },
            {
                id: 8,
                name: "Sophia Taylor",
                age: 29,
                email: "sophia.taylor@example.com",
                position: "HR Manager",
                status: "employee",
                level: "middle",
                format: "office",
                team: "HR",
                sex: "female",
                birthday: "12-12-1994",
                exWork: "Netflix",
                photo: "",
            },
            {
                id: 9,
                name: "James Anderson",
                age: 26,
                email: "james.anderson@example.com",
                position: "Designer",
                status: "employee",
                level: "junior",
                format: "remote",
                team: "design",
                sex: "male",
                birthday: "18-09-1997",
                exWork: "Adobe",
                photo: "",
            },
        ];
        dispatch(setPeople(mockPeople));
    }, [dispatch]);

    return (
        <div>
            <div className="header">
                <div className="header__logo">header logo</div>
                <div className="header__content">
                    <a href="./">Поиск по фильтрам</a>
                    <a href="./">ABOUT</a>
                    <a href="./">LOCATION</a>
                </div>
            </div>
            <h1 className="main__w">Наши сотрудники</h1>
            <ul className="people">
                {people.map((person) => (
                    <li className="people__inner" key={person.id}>
                        <Link
                            className="people__inner--value"
                            to={`/person/${person.id}`}
                            onClick={() => dispatch(selectPerson(person.id))}>
                            {person.name} - {person.position}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
