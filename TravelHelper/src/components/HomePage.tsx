import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="home">
            <div className="home__content">
                <h1 className="home__title">
                    Добро пожаловать в Планировщик Путешествий!
                </h1>
                <p className="home__description">
                    Наш сайт поможет вам спланировать идеальное путешествие,
                    выбрать страны, рассчитать бюджет, и получить информацию о
                    визовых требованиях.
                </p>
                <button
                    className="home__btn"
                    onClick={() => navigate("/mappage", { replace: true })}>
                    Выбрать моё путешествие
                </button>
            </div>
        </div>
    );
};
