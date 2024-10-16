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
                    <a className="header__links--main" href="#services">
                        Услуги
                    </a>
                    <div className="header__dropdown">
                        <a className="header__links--classes" href="#classes">
                            Классы
                        </a>
                        <a className="header__links--experts" href="#expert">
                            Эксперты лабы
                        </a>
                        <a
                            className="header__links--caseorium"
                            href="#caseorium">
                            Кейсориум исполненного
                        </a>
                    </div>
                </div>

                {/* Секция помощи */}
                <div className="header__section--help">
                    <a className="header__links--main" href="#faq">
                        Помощь
                    </a>
                    <div className="header__dropdown">
                        <a className="header__links--help" href="#help">
                            Заявка на помощь
                        </a>
                        <a className="header__links--ready" href="#ready">
                            Готовые материалы в помощь гостеприимщику РФ
                        </a>
                    </div>
                </div>

                {/* Секция контактов */}
                <div className="header__section--contacts">
                    <a className="header__links--main" href="#project">
                        Контакты
                    </a>
                    <div className="header__dropdown">
                        <a className="header__links--project" href="#project">
                            Контактный спецпроект "любопытства ради"
                        </a>
                        <a className="header__links--contacts" href="#contacts">
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
