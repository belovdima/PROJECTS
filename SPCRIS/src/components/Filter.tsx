import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setPeople } from "../redux/peopleSlice";
import { useNavigate } from "react-router-dom";
// Определяем тип Person
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

export const Filter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const people = useSelector((state: RootState) => state.people.people);

    const [filteredPeople, setFilteredPeople] = useState(people);
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: string;
    }>({ key: "", direction: "" });
    const [filters, setFilters] = useState({
        position: "",
        status: "",
        level: "",
        format: "",
        team: "",
        sex: "",
    });

    useEffect(() => {
        if (people.length === 0) {
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
            dispatch(setPeople(mockPeople));
        }
    }, [dispatch, people]);

    type PersonKeys = keyof Person;

    const sortBy = (key: PersonKeys) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });

        const sortedPeople = [...people].sort((a, b) => {
            if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
            if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
            return 0;
        });
        setFilteredPeople(sortedPeople);
    };

    const handleFilterChange = (filterKey: string, value: string) => {
        setFilters((prev) => ({ ...prev, [filterKey]: value }));
    };

    useEffect(() => {
        const filtered = people.filter((person) => {
            return Object.keys(filters).every((key) => {
                if (!filters[key as keyof typeof filters]) return true;
                return (
                    person[key as keyof typeof person] ===
                    filters[key as keyof typeof filters]
                );
            });
        });
        setFilteredPeople(filtered);
    }, [filters, people]);

    return (
        <div>
            <div className="header">
                <div className="header__logo">
                    <img
                        onClick={() => navigate("/mainpage", { replace: true })}
                        src="./../../public/Dunder-Mifflin-Logo.png"
                        height={100}
                        width={177.7}
                        alt="Dunder Mifflin Logo"
                    />
                </div>
                <div className="header__content">
                    <a href="./filter">Поиск по фильтрам</a>
                    <a href="./">ABOUT</a>
                    <a href="./">LOCATION</a>
                </div>
            </div>
            <div className="filters">
                <label>Должность:</label>
                <select
                    onChange={(e) =>
                        handleFilterChange("position", e.target.value)
                    }>
                    <option value="">Все</option>
                    <option value="Regional Manager">Regional Manager</option>
                    <option value="Sales Representative">
                        Sales Representative
                    </option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Assistant Regional Manager">
                        Assistant Regional Manager
                    </option>
                    <option value="Sales Representative">
                        Sales Representative
                    </option>
                    <option value="Head of Accounting">
                        Head of Accounting
                    </option>
                    <option value="Accountant">Accountant</option>
                    <option value="Temp">Temp</option>
                    <option value="Warehouse Foreman">Warehouse Foreman</option>
                </select>

                <label>Статус:</label>
                <select
                    onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                    }>
                    <option value="">Все</option>
                    <option value="employee">Employee</option>
                </select>

                <label>Уровень:</label>
                <select
                    onChange={(e) =>
                        handleFilterChange("level", e.target.value)
                    }>
                    <option value="">Все</option>
                    <option value="senior">Senior</option>
                    <option value="middle">Middle</option>
                    <option value="junior">Junior</option>
                </select>

                <label>Формат:</label>
                <select
                    onChange={(e) =>
                        handleFilterChange("format", e.target.value)
                    }>
                    <option value="">Все</option>
                    <option value="office">Office</option>
                    <option value="remote">Remote</option>
                </select>

                <label>Команда:</label>
                <select
                    onChange={(e) =>
                        handleFilterChange("team", e.target.value)
                    }>
                    <option value="">Все</option>
                    <option value="management">Management</option>
                    <option value="sales">Sales</option>
                    <option value="accounting">Accounting</option>
                    <option value="administration">Administration</option>
                    <option value="warehouse">Warehouse</option>
                </select>

                <label>Пол:</label>
                <select
                    onChange={(e) => handleFilterChange("sex", e.target.value)}>
                    <option value="">Все</option>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                </select>
                <button
                    className="person-card__button"
                    onClick={() => navigate("/mainpage", { replace: true })}>
                    На главную
                </button>
            </div>

            <div className="table-container">
                <table className="people-table">
                    <thead>
                        <tr>
                            <th className="id">
                                ID
                                <button onClick={() => sortBy("id")}>
                                    {sortConfig.direction === "ascending"
                                        ? "↓"
                                        : "↑"}
                                </button>
                            </th>
                            <th>Фото</th>
                            <th>
                                Имя
                                <button onClick={() => sortBy("name")}>
                                    {sortConfig.direction === "ascending"
                                        ? "↓"
                                        : "↑"}
                                </button>
                            </th>
                            <th className="age">
                                Возраст
                                <button onClick={() => sortBy("age")}>
                                    {sortConfig.direction === "ascending"
                                        ? "↓"
                                        : "↑"}
                                </button>
                            </th>
                            <th>Email</th>
                            <th>
                                Должность
                                <button onClick={() => sortBy("position")}>
                                    {sortConfig.direction === "ascending"
                                        ? "↓"
                                        : "↑"}
                                </button>
                            </th>
                            <th>Роль в системе</th>
                            <th>Уровень</th>
                            <th>Формат работы</th>
                            <th>Команда</th>
                            <th>
                                Пол
                                <button onClick={() => sortBy("sex")}>
                                    {sortConfig.direction === "ascending"
                                        ? "↓"
                                        : "↑"}
                                </button>
                            </th>
                            <th>Дата рождения</th>
                            <th>Бывшее место работы</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPeople.length > 0 ? (
                            filteredPeople.map((person) => (
                                <tr key={person.id}>
                                    <td>{person.id}</td>
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
            </div>
        </div>
    );
};
