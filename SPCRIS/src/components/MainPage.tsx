import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setPeople, selectPerson } from "../redux/peopleSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const people = useSelector((state: RootState) => state.people.people);
    const navigate = useNavigate();

    // Заглушка данных, но в реальной жизни можно сделать fetch к API
    useEffect(() => {
        const mockPeople = [
            {
                id: 1,
                name: "Michael Scott",
                age: 45,
                email: "michael.scott@dundermifflin.com",
                position: "Regional Manager",
                status: "employee",
                level: "senior",
                format: "office",
                team: "management",
                sex: "male",
                birthday: "15-03-1965",
                exWork: "Sears",
                photo: "./../../public/michael.jpg",
            },
            {
                id: 2,
                name: "Jim Halpert",
                age: 32,
                email: "jim.halpert@dundermifflin.com",
                position: "Sales Representative",
                status: "employee",
                level: "senior",
                format: "office",
                team: "sales",
                sex: "male",
                birthday: "01-10-1978",
                exWork: "Staples",
                photo: "./../../public/jim.jpg",
            },
            {
                id: 3,
                name: "Pam Beesly",
                age: 30,
                email: "pam.beesly@dundermifflin.com",
                position: "Receptionist",
                status: "employee",
                level: "middle",
                format: "office",
                team: "administration",
                sex: "female",
                birthday: "25-09-1980",
                exWork: "Art School",
                photo: "./../../public/pam.jpg",
            },
            {
                id: 4,
                name: "Dwight Schrute",
                age: 40,
                email: "dwight.schrute@dundermifflin.com",
                position: "Assistant Regional Manager",
                status: "employee",
                level: "senior",
                format: "office",
                team: "management",
                sex: "male",
                birthday: "20-01-1970",
                exWork: "Schrute Farms",
                photo: "./../../public/dwight.jpg",
            },
            {
                id: 5,
                name: "Stanley Hudson",
                age: 55,
                email: "stanley.hudson@dundermifflin.com",
                position: "Sales Representative",
                status: "employee",
                level: "senior",
                format: "office",
                team: "sales",
                sex: "male",
                birthday: "08-02-1955",
                exWork: "OfficeMax",
                photo: "./../../public/stanley.jpg",
            },
            {
                id: 6,
                name: "Angela Martin",
                age: 39,
                email: "angela.martin@dundermifflin.com",
                position: "Head of Accounting",
                status: "employee",
                level: "senior",
                format: "office",
                team: "accounting",
                sex: "female",
                birthday: "11-06-1981",
                exWork: "Scranton High School",
                photo: "./../../public/angela.jpg",
            },
            {
                id: 7,
                name: "Kevin Malone",
                age: 38,
                email: "kevin.malone@dundermifflin.com",
                position: "Accountant",
                status: "employee",
                level: "middle",
                format: "office",
                team: "accounting",
                sex: "male",
                birthday: "01-05-1982",
                exWork: "Scranton Bowling Alley",
                photo: "./../../public/kevin.jpg",
            },
            {
                id: 8,
                name: "Ryan Howard",
                age: 28,
                email: "ryan.howard@dundermifflin.com",
                position: "Temp",
                status: "employee",
                level: "junior",
                format: "office",
                team: "sales",
                sex: "male",
                birthday: "30-04-1982",
                exWork: "Business School",
                photo: "./../../public/ryan.jpg",
            },
            {
                id: 9,
                name: "Darryl Philbin",
                age: 38,
                email: "darryl.philbin@dundermifflin.com",
                position: "Warehouse Foreman",
                status: "employee",
                level: "senior",
                format: "office",
                team: "warehouse",
                sex: "male",
                birthday: "18-06-1972",
                exWork: "Unknown",
                photo: "./../../public/darryl.jpg",
            },
        ];

        console.log("Dispatching people:", mockPeople);
        dispatch(setPeople(mockPeople));
    }, [dispatch]);

    return (
        <div>
            <div className="header">
                <div className="header__logo">
                    <img
                        onClick={() => navigate("/mainpage", { replace: true })}
                        src="./../../public/Dunder-Mifflin-Logo.png"
                        height={100}
                        width={177.7}
                        alt=""
                    />
                </div>
                <div className="header__content">
                    {/* <a href="./filter">Поиск по фильтрам</a> */}
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
                            <img
                                className="people__inner--photo"
                                width={100}
                                height={100}
                                src={person.photo}
                                alt={`${person.name}'s photo`}
                            />{" "}
                            <div className="people__inner--writing">
                                <div className="writing--name">
                                    {person.name}
                                </div>
                                <div className="writing--position">
                                    {person.position}
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
