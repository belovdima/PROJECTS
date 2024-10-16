interface ClassItem {
    title: string;
    description: string;
    schedule: string;
    price: string;
    imageUrl: string; // Добавим поле для изображения
}

const classesData: ClassItem[] = [
    {
        title: "Курс по гостеприимству",
        description: "Изучите основы гостеприимства и обслуживания клиентов.",
        schedule: "Пн-Чт, 18:00 - 20:00",
        price: "5000 ₽",
        imageUrl: "", // Пустое место для фото
    },
    {
        title: "Мастер-класс по виноделию",
        description: "Научитесь различать вина и подбирать их к блюдам.",
        schedule: "Сб, 14:00 - 17:00",
        price: "3500 ₽",
        imageUrl: "",
    },
    {
        title: "Курс по ресторанному менеджменту",
        description:
            "Управление рестораном: от выбора поставщиков до обслуживания клиентов.",
        schedule: "Вт-Чт, 19:00 - 21:00",
        price: "7000 ₽",
        imageUrl: "",
    },
    {
        title: "Кулинарный мастер-класс",
        description: "Научитесь готовить лучшие блюда от шеф-повара.",
        schedule: "Вс, 12:00 - 15:00",
        price: "4000 ₽",
        imageUrl: "",
    },
];

export const Classes = () => {
    return (
        <div className="classes">
            <h2 className="classes__title">Наши Классы</h2>
            <div className="classes__list">
                {classesData.map((classItem, index) => (
                    <div key={index} className="classes__item">
                        <div className="classes__item-image">
                            {/* Замените src на classItem.imageUrl, когда изображения будут доступны */}
                            <div className="classes__placeholder">Фото</div>
                        </div>
                        <h3 className="classes__item-title">
                            {classItem.title}
                        </h3>
                        <p className="classes__item-description">
                            {classItem.description}
                        </p>
                        <div className="classes__details">
                            <p className="classes__item-schedule">
                                Расписание: {classItem.schedule}
                            </p>
                            <p className="classes__item-price">
                                Стоимость: {classItem.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
