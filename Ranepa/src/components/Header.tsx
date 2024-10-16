export const Header = () => {
    return (
        <div className="header">
            <div className="header__logo">
                <img
                    src="/src/assets/pics/logo.png"
                    alt="Лаборатория Гостеприимства"
                />
            </div>
            <div className="header__links">
                {/* Секция услуг */}
                <div className="header__section--services">
                    <a className="header__links--main" href="#">
                        Услуги
                    </a>
                    <div className="header__dropdown">
                        <a className="header__links--classes" href="#">
                            Классы
                        </a>
                        <a className="header__links--experts" href="#">
                            Эксперты лабы
                        </a>
                        <a className="header__links--caseorium" href="#">
                            Кейсориум исполненного
                        </a>
                    </div>
                </div>

                {/* Секция помощи */}
                <div className="header__section--help">
                    <a className="header__links--main" href="#">
                        Помощь
                    </a>
                    <div className="header__dropdown">
                        <a className="header__links--help" href="#">
                            Заявка на помощь
                        </a>
                        <a className="header__links--ready" href="#">
                            Готовые материалы в помощь гостеприимщику РФ
                        </a>
                    </div>
                </div>

                {/* Секция контактов */}
                <div className="header__section--contacts">
                    <a className="header__links--main" href="#">
                        Контакты
                    </a>
                    <div className="header__dropdown">
                        <a className="header__links--project" href="#">
                            Контактный спецпроект "любопытства ради"
                        </a>
                        <a className="header__links--contacts" href="#">
                            Контакты
                        </a>
                    </div>
                </div>
            </div>
            <div className="header__button">
                <button className="header__button--button" type="button">
                    Кнопка
                </button>
            </div>
        </div>
    );
};
