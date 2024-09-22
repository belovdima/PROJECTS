import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Интерфейс для структуры данных таблицы
interface DocumentData {
    id: string;
    companySigDate: string; // Дата в формате ISO строки
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string; // Дата в формате ISO строки
    employeeSignatureName: string;
}

export const Table = () => {
    // Типизация состояния data
    const [data, setData] = useState<DocumentData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const API_GET_URL = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get';
    const API_POST_URL = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/create';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_GET_URL, {
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

    // Состояние для новой записи
    const [newRow, setNewRow] = useState<DocumentData>({
        id: '', // Идентификатор будет генерироваться сервером
        companySigDate: '',
        companySignatureName: '',
        documentName: '',
        documentStatus: '',
        documentType: '',
        employeeNumber: '',
        employeeSigDate: '',
        employeeSignatureName: ''
    });

    // Обработчик изменений в полях формы
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewRow((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Функция добавления новой записи
    const addTd = async () => {
        try {
            const response = await fetch(API_POST_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': localStorage.getItem("token") || ''
                },
                body: JSON.stringify(newRow)
            });

            if (!response.ok) {
                throw new Error('Failed to add new row');
            }

            const result = await response.json();

            // Проверка успешного добавления
            if (result.error_code !== 0) {
                throw new Error(result.error_text);
            }

            // Обновление таблицы с новой записью
            setData((prevData) => prevData ? [...prevData, result.data] : [result.data]);

            // Очистка полей формы
            setNewRow({
                id: '',
                companySigDate: '',
                companySignatureName: '',
                documentName: '',
                documentStatus: '',
                documentType: '',
                employeeNumber: '',
                employeeSigDate: '',
                employeeSignatureName: ''
            });

        } catch (err) {
            setError((err as Error).message);
        }
    };

    // Обработка загрузки и ошибок
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div>
            <h1>Таблица с данными</h1>
            <button className="logout" onClick={() => { localStorage.clear(); navigate("/login", { replace: true }); }}>Обратно на главную</button>

            {data && data.length > 0 ? (
                <table className="table">
                    <thead className="thead">
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

            <div className="add">
                <h1>Добавить строку</h1>
                <div>
                    <input type="text" name="companySigDate" placeholder="Company Sig Date (ISO)" value={newRow.companySigDate} onChange={handleInputChange} />
                    <input type="text" name="companySignatureName" placeholder="Company Signature Name" value={newRow.companySignatureName} onChange={handleInputChange} />
                    <input type="text" name="documentName" placeholder="Document Name" value={newRow.documentName} onChange={handleInputChange} />
                    <input type="text" name="documentStatus" placeholder="Document Status" value={newRow.documentStatus} onChange={handleInputChange} />
                    <input type="text" name="documentType" placeholder="Document Type" value={newRow.documentType} onChange={handleInputChange} />
                    <input type="text" name="employeeNumber" placeholder="Employee Number" value={newRow.employeeNumber} onChange={handleInputChange} />
                    <input type="text" name="employeeSigDate" placeholder="Employee Sig Date (ISO)" value={newRow.employeeSigDate} onChange={handleInputChange} />
                    <input type="text" name="employeeSignatureName" placeholder="Employee Signature Name" value={newRow.employeeSignatureName} onChange={handleInputChange} />
                    <button onClick={addTd}>Add</button>
                </div>
            </div>
        </div>
    );
};
