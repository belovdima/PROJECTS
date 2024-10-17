export const MainComponent = () => {
    return (
        <div className="main-component">
            {/* Background */}
            <div className="main-component__background">
                <img
                    src="/src/assets/pics/backgroundnew.JPEG"
                    alt="Background"
                />
            </div>

            {/* Header */}
            <div className="main-component__header">
                <div className="header__logo">
                    <img
                        src="/src/assets/pics/png logo 2.png"
                        alt="Лаборатория Гостеприимства"
                    />
                </div>
                <div className="header__links">
                    <a href="#about">О проекте</a>
                    <a href="#classes">Классы</a>
                    <a href="#cases">Наши кейсы</a>
                    <a href="#expert">Наши эксперты</a>
                    <a href="#anons">Анонсы</a>
                    <a href="#contacts">Контакты</a>
                </div>
            </div>

            {/* Title */}
            <div className="main-component__title">
                ЛАБОРАТОРИЯ ГОСТЕПРИИМСТВА
                <br />
                <span>
                    — первый в России проект по разработке стратегии продвижения
                    в сфере гостеприимства
                </span>
            </div>

            <br></br>
            <br></br>

            <button type="button" className="main-component__button">
                Заполни заявку
            </button>
        </div>
    );
};
