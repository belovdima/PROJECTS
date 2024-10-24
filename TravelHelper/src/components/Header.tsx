import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="header">
            <div
                className="header__logo"
                onClick={() => navigate("/middle", { replace: true })}>
                Logo
            </div>
            <a
                href=""
                onClick={() => navigate("/converter", { replace: true })}>
                Конвертер валют
            </a>
        </div>
    );
};
