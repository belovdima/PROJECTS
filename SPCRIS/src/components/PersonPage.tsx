import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
import { selectPerson } from "../redux/peopleSlice";
import { useNavigate } from "react-router-dom";

export const PersonPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Получаем параметр id из URL
    const dispatch = useDispatch<AppDispatch>();
    const selectedPerson = useSelector(
        (state: RootState) => state.people.selectedPerson
    );

    // Выбираем человека по ID при монтировании компонента
    useEffect(() => {
        if (id) {
            dispatch(selectPerson(Number(id)));
        }
    }, [id, dispatch]);

    if (!selectedPerson) {
        return <div>Пользователь не найден</div>;
    }

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
            <div className="person-card">
                <div className="person-card__photo">
                    <img
                        src={selectedPerson.photo}
                        alt={`${selectedPerson.name}'s photo`}
                    />
                </div>
                <div className="person-card__info">
                    <h1 className="person-card__name">{selectedPerson.name}</h1>
                    <div className="person-card__details">
                        <p>
                            <strong>Возраст:</strong> {selectedPerson.age}
                        </p>
                        <p>
                            <strong>Email:</strong> {selectedPerson.email}
                        </p>
                        <p>
                            <strong>Должность:</strong>{" "}
                            {selectedPerson.position}
                        </p>
                        <p>
                            <strong>Роль в системе:</strong>{" "}
                            {selectedPerson.status}
                        </p>
                        <p>
                            <strong>Уровень сотрудника:</strong>{" "}
                            {selectedPerson.level}
                        </p>
                        <p>
                            <strong>Формат работы:</strong>{" "}
                            {selectedPerson.format}
                        </p>
                        <p>
                            <strong>Команда:</strong> {selectedPerson.team}
                        </p>
                        <p>
                            <strong>Пол:</strong> {selectedPerson.sex}
                        </p>
                        <p>
                            <strong>Дата рождения:</strong>{" "}
                            {selectedPerson.birthday}
                        </p>
                        <p>
                            <strong>Бывшее место работы:</strong>{" "}
                            {selectedPerson.exWork}
                        </p>
                    </div>
                    <button
                        className="person-card__button"
                        onClick={() =>
                            navigate("/mainpage", { replace: true })
                        }>
                        На главную
                    </button>
                </div>
            </div>
        </div>
    );
};
