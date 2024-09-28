import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

export const Filter = () => {
    const navigate = useNavigate();

    const people = useSelector((state: RootState) => state.people.people);

    console.log("People from Redux:", people);

    return (
        <div className="table-container">
            <table className="people-table">
                <thead>
                    <tr>
                        <th>Фото</th>
                        <th>Имя</th>
                        <th>Возраст</th>
                        <th>Email</th>
                        <th>Должность</th>
                        <th>Роль в системе</th>
                        <th>Уровень</th>
                        <th>Формат работы</th>
                        <th>Команда</th>
                        <th>Пол</th>
                        <th>Дата рождения</th>
                        <th>Бывшее место работы</th>
                    </tr>
                </thead>
                <tbody>
                    {people.length > 0 ? (
                        people.map((person) => (
                            <tr key={person.id}>
                                <td>
                                    <img
                                        src={person.photo}
                                        alt={`${person.name}'s photo`}
                                        width={50}
                                        height={50}
                                        style={{ borderRadius: "50%" }}
                                    />
                                </td>
                                <td>{person.name}</td>
                                <td>{person.age}</td>
                                <td>{person.email}</td>
                                <td>{person.position}</td>
                                <td>{person.status}</td>
                                <td>{person.level}</td>
                                <td>{person.format}</td>
                                <td>{person.team}</td>
                                <td>{person.sex}</td>
                                <td>{person.birthday}</td>
                                <td>{person.exWork}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={12}>Данные отсутствуют</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button
                className="person-card__button"
                onClick={() => navigate("/mainpage", { replace: true })}>
                На главную
            </button>
        </div>
    );
};
