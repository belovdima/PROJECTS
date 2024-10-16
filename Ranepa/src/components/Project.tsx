import React from "react";

export const Project: React.FC = () => {
    return (
        <div className="project-outer">
            <div className="curiosity-project">
                <div className="curiosity-project__header">
                    <h1 className="curiosity-project__title">
                        Спецпроект "Любопытства ради"
                    </h1>
                    <p className="curiosity-project__subtitle">
                        Узнайте больше о нашем увлекательном проекте и как вы
                        можете участвовать!
                    </p>
                </div>
                <div className="curiosity-project__content">
                    <div className="curiosity-project__section">
                        <h2 className="curiosity-project__section-title">
                            Цель проекта
                        </h2>
                        <p className="curiosity-project__section-description">
                            Этот проект направлен на исследование и изучение
                            интересных фактов из различных областей. Мы собираем
                            информацию, проводим опросы и создаем контент,
                            который поможет нам лучше понять мир вокруг нас.
                            Присоединяйтесь к нам в этом увлекательном
                            путешествии!
                        </p>
                    </div>
                    <div className="curiosity-project__section">
                        <h2 className="curiosity-project__section-title">
                            Как участвовать
                        </h2>
                        <p className="curiosity-project__section-description">
                            Вы можете принять участие в проекте, заполнив нашу
                            форму обратной связи. Мы будем рады услышать ваши
                            идеи, предложения и вопросы. Каждый ваш вклад важен
                            для нас!
                        </p>
                        <button className="curiosity-project__button">
                            Заполнить форму
                        </button>
                    </div>
                    <div className="curiosity-project__section">
                        <h2 className="curiosity-project__section-title">
                            Контактная информация
                        </h2>
                        <p className="curiosity-project__section-description">
                            Если у вас есть вопросы, вы можете связаться с нами
                            по электронной почте:
                            <a
                                href="mailto:info@curiosityproject.com"
                                className="curiosity-project__email">
                                {" "}
                                info@curiosityproject.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
