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
    const [editingRow, setEditingRow] = useState<DocumentData | null>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [theme, setTheme] = useState<boolean>(true);
    const [active, setActive] = useState<boolean>(false);

    const changeTheme = () => {
        setTheme(!theme);
    };

    const navigate = useNavigate();

    const API_GET_URL =
        "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get"; //URL для получения данных
    const API_POST_URL =
        "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/create"; //URL для создания
    const API_DELETE_URL =
        "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/delete"; // URL для удаления
    const API_EDIT_URL =
        "https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/set"; // URL для редактирования

    //useEffect для получения данных
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_GET_URL, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "x-auth": localStorage.getItem("token") || "",
                    },
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
        id: "", // Идентификатор будет генерироваться сервером
        companySigDate: "",
        companySignatureName: "",
        documentName: "",
        documentStatus: "",
        documentType: "",
        employeeNumber: "",
        employeeSigDate: "",
        employeeSignatureName: "",
    });

    // Обработчик изменений в полях формы
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewRow((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Функция добавления новой записи
    const addTd = async () => {
        try {
            const response = await fetch(API_POST_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth": localStorage.getItem("token") || "",
                },
                body: JSON.stringify(newRow),
            });

            if (!response.ok) {
                throw new Error("Failed to add new row");
            }

            const result = await response.json();

            // Проверка успешного добавления
            if (result.error_code !== 0) {
                throw new Error(result.error_text);
            }

            // Обновление таблицы с новой записью
            setData((prevData) =>
                prevData ? [...prevData, result.data] : [result.data]
            );

            // Очистка полей формы
            setNewRow({
                id: "",
                companySigDate: "",
                companySignatureName: "",
                documentName: "",
                documentStatus: "",
                documentType: "",
                employeeNumber: "",
                employeeSigDate: "",
                employeeSignatureName: "",
            });
        } catch (err) {
            setError((err as Error).message);
        }
    };

    // Функция редактирования
    // Функция редактирования
    const handleEdit = (item: DocumentData) => {
        setEditingRow(item);
        setNewRow(item);
        setActive(true); // Открывает форму редактирования
    };

    // Функция удаления
    const handleDelete = async (id: string) => {
        const question = confirm(`Are you sure you want to detele this row?`);
        if (question === true) {
            try {
                const response = await fetch(`${API_DELETE_URL}/${id}`, {
                    // Убрал фигурные скобки вокруг API_DELETE_URL
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth": localStorage.getItem("token") || "",
                    },
                });

                if (!response.ok) {
                    throw new Error("Ошибка при удалении строки");
                }

                const result = await response.json();

                if (result.error_code !== 0) {
                    throw new Error(result.error_text);
                }

                // Успешное удаление: обновить данные
                setData(
                    (prevData) =>
                        prevData?.filter((row) => row.id !== id) || null
                );
            } catch (error) {
                console.error("Ошибка удаления:", error);
                setError((error as Error).message);
            }
        }
    };

    // Функция сохранения изменений
    const saveChanges = async () => {
        if (!editingRow) {
            console.error("Не выбрана строка для редактирования");
            return;
        }

        try {
            const response = await fetch(`${API_EDIT_URL}/${editingRow.id}`, {
                // Убедись, что editingRow.id не undefined
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth": localStorage.getItem("token") || "",
                },
                body: JSON.stringify(newRow),
            });

            if (!response.ok) {
                throw new Error("Failed to update row");
            }

            const result = await response.json();
            if (result.error_code === 0) {
                setData((prevData) =>
                    prevData
                        ? prevData.map((row) =>
                              row.id === editingRow.id ? result.data : row
                          )
                        : []
                );
                setEditingRow(null);

                setNewRow({
                    id: "",
                    companySigDate: "",
                    companySignatureName: "",
                    documentName: "",
                    documentStatus: "",
                    documentType: "",
                    employeeNumber: "",
                    employeeSigDate: "",
                    employeeSignatureName: "",
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const showAdd = () => {
        if (active) {
            // Если модальное окно уже активно, просто закрываем его
            setActive(false);
        } else {
            // Если модальное окно не активно, открываем для добавления новой записи
            setEditingRow(null); // Сбрасываем редактируемую строку
            setNewRow({
                id: "", // Очищаем поля для новой записи
                companySigDate: "",
                companySignatureName: "",
                documentName: "",
                documentStatus: "",
                documentType: "",
                employeeNumber: "",
                employeeSigDate: "",
                employeeSignatureName: "",
            });
            setActive(true); // Открываем модальное окно
        }
    };

    // Обработка загрузки и ошибок
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className={theme ? "light-mode" : "dark-mode"}>
            <h1 className="table__topic">Таблица с данными</h1>
            <button
                className="logout"
                onClick={() => {
                    localStorage.clear();
                    navigate("/login", { replace: true });
                }}>
                Выйти из аккаунта
            </button>
            <button className="change-theme" onClick={changeTheme}>
                {theme
                    ? "Переключить на ночной режим"
                    : "Переключить на дневной режим"}
            </button>
            <button className="btn-add__show" onClick={showAdd}>
                Добавить данные +
            </button>

            {data && data.length > 0 ? (
                <table className="table">
                    <thead className="thead">
                        <tr>
                            <th className="th__number">№</th>
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
                        {data.map((item: DocumentData, index: number) => (
                            <tr
                                key={item.id}
                                onMouseEnter={() => setHoveredRow(index)}
                                onMouseLeave={() => setHoveredRow(null)}>
                                <td>
                                    {hoveredRow === index ? (
                                        <div>
                                            <button
                                                onClick={() =>
                                                    handleEdit(item)
                                                }>
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }>
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        index + 1
                                    )}
                                </td>
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

            {active && <div className="overlay" onClick={showAdd}></div>}

            <div className={active ? "add-active" : "add-hidden"}>
                <h1 className="add__w">Добавить данные</h1>
                <div className="add__input">
                    <div className="add__input--buttons">
                        {!editingRow ? (
                            <button className="btn-add" onClick={addTd}>
                                Add
                            </button>
                        ) : (
                            <button className="btn-save" onClick={saveChanges}>
                                Save
                            </button>
                        )}
                        <button
                            className="close"
                            onClick={() => setActive(false)}>
                            Закрыть без изменений
                        </button>
                    </div>

                    <div className="add__input--input">
                        <input
                            className="company-signature-date"
                            type="text"
                            name="companySigDate"
                            placeholder="Company Sig Date (ISO)"
                            value={newRow.companySigDate}
                            onChange={handleInputChange}
                        />
                        <input
                            className="company-signature-name"
                            type="text"
                            name="companySignatureName"
                            placeholder="Company Signature Name"
                            value={newRow.companySignatureName}
                            onChange={handleInputChange}
                        />
                        <input
                            className="document-name"
                            type="text"
                            name="documentName"
                            placeholder="Document Name"
                            value={newRow.documentName}
                            onChange={handleInputChange}
                        />
                        <input
                            className="document-status"
                            type="text"
                            name="documentStatus"
                            placeholder="Document Status"
                            value={newRow.documentStatus}
                            onChange={handleInputChange}
                        />
                        <input
                            className="document-type"
                            type="text"
                            name="documentType"
                            placeholder="Document Type"
                            value={newRow.documentType}
                            onChange={handleInputChange}
                        />
                        <input
                            className="employee-number"
                            type="text"
                            name="employeeNumber"
                            placeholder="Employee Number"
                            value={newRow.employeeNumber}
                            onChange={handleInputChange}
                        />
                        <input
                            className="employee-signature-date"
                            type="text"
                            name="employeeSigDate"
                            placeholder="Employee Sig Date (ISO)"
                            value={newRow.employeeSigDate}
                            onChange={handleInputChange}
                        />
                        <input
                            className="employee-signature-name"
                            type="text"
                            name="employeeSignatureName"
                            placeholder="Employee Signature Name"
                            value={newRow.employeeSignatureName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
