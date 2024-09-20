import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Интерфейс для структуры данных таблицы
interface DocumentData {
    id: string;
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
}

export const Table = () => {
    // Типизация состояния data
    const [data, setData] = useState<DocumentData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Функция для выхода
    const handleClick = () => {
        localStorage.clear();
        navigate("/login", { replace: true });
    };

    const API_url = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_url, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'x-auth': localStorage.getItem("token") || ''
                    }
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.statusText}`);
                }

                const result = await response.json();

                // Проверяем ответ на ошибки
                if (result.error_code !== 0) {
                    throw new Error(result.error_text);
                }

                setData(result.data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Обработка загрузки и ошибок
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div>
            <h1>Таблица с данными</h1>
            <button className="logout" onClick={handleClick}>Обратно на главную</button>

            {data && data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Company Signature Date</th>
                            <th>Company Signature Name</th>
                            <th>Document Name</th>
                            <th>Document Status</th>
                            <th>Document Type</th>
                            <th>Employee Number</th>
                            <th>Employee Signature Date</th>
                            <th>Employee Signature Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: DocumentData) => (
                            <tr key={item.id}>
                                <td>{item.companySigDate}</td>
                                <td>{item.companySignatureName}</td>
                                <td>{item.documentName}</td>
                                <td>{item.documentStatus}</td>
                                <td>{item.documentType}</td>
                                <td>{item.employeeNumber}</td>
                                <td>{item.employeeSigDate}</td>
                                <td>{item.employeeSignatureName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Нет данных для отображения</div>
            )}
        </div>
    );
};
