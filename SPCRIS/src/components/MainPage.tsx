import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setPeople, selectPerson } from "../redux/peopleSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { peopleData } from "../redux/peopleData";

export const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const people = useSelector((state: RootState) => state.people.people);
    const navigate = useNavigate();

    useEffect(() => {
        if (people.length === 0) {
            dispatch(setPeople(peopleData));
        }
    }, [dispatch, people]);

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
                    <a href="./filter">Поиск по фильтрам</a>
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
