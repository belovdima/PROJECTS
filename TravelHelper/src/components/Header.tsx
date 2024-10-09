import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="header">
            <div
                className="header__logo"
                onClick={() => navigate("/homepage", { replace: true })}>
                Logo
            </div>
            <a href="">Конвертер валют</a>
        </div>
    );
};
