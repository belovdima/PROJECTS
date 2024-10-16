export const Services = () => {
    const servicesData = [
        {
            title: "Обучение",
            description:
                "Широкий спектр курсов и мастер-классов по гостеприимству, адаптированных под ваши нужды.",
        },
        {
            title: "Консультации",
            description:
                "Экспертная помощь по вопросам управления бизнесом в сфере гостеприимства.",
        },
        {
            title: "Аудит",
            description:
                "Проводим аудит ваших услуг для выявления слабых мест и улучшения качества обслуживания.",
        },
        {
            title: "Семинары",
            description:
                "Регулярные семинары для профессионалов, где делимся актуальными знаниями и опытом.",
        },
    ];

    return (
        <div className="services">
            <h2 className="services__title">Наши Услуги</h2>
            <div className="services__list">
                {servicesData.map((service, index) => (
                    <div key={index} className="services__item">
                        <h3 className="services__item-title">
                            {service.title}
                        </h3>
                        <p className="services__item-description">
                            {service.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
