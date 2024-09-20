import { useNavigate } from "react-router-dom"; 

export const Table = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login", { replace: true });
    }

    return(
        <div>
            Вы на странице с таблицами
            <button className="logout" onClick={handleClick}>Обратно на главную</button>
        </div>
    )
}