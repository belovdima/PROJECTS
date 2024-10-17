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
                    <a href="">О проекте</a>
                    <a href="">Классы</a>
                    <a href="">Наши кейсы</a>
                    <a href="">Наши эксперты</a>
                    <a href="">Контакты</a>
                    <a href="">Анонсы</a>
                </div>
            </div>

            {/* Title */}
            <div className="main-component__title">
                Лаборатория гостеприимства - первый в России проект по
                разработке стратегии продвижения в сфере гостеприимства
            </div>
        </div>
    );
};
