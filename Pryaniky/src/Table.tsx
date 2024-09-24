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
            <div className="header">
                <button className="change-theme" onClick={changeTheme}>
                    {theme ? (
                        <>
                            {`Change theme`}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </>
                    ) : (
                        <>
                            {`Change theme`}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                            </svg>
                        </>
                    )}
                </button>

                <button className="btn-add__show" onClick={showAdd}>
                    New Post
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none">
                        <path
                            d="M8.5 2.75C8.5 2.55109 8.42098 2.36032 8.28033 2.21967C8.13968 2.07902 7.94891 2 7.75 2C7.55109 2 7.36032 2.07902 7.21967 2.21967C7.07902 2.36032 7 2.55109 7 2.75V7H2.75C2.55109 7 2.36032 7.07902 2.21967 7.21967C2.07902 7.36032 2 7.55109 2 7.75C2 7.94891 2.07902 8.13968 2.21967 8.28033C2.36032 8.42098 2.55109 8.5 2.75 8.5H7V12.75C7 12.9489 7.07902 13.1397 7.21967 13.2803C7.36032 13.421 7.55109 13.5 7.75 13.5C7.94891 13.5 8.13968 13.421 8.28033 13.2803C8.42098 13.1397 8.5 12.9489 8.5 12.75V8.5H12.75C12.9489 8.5 13.1397 8.42098 13.2803 8.28033C13.421 8.13968 13.5 7.94891 13.5 7.75C13.5 7.55109 13.421 7.36032 13.2803 7.21967C13.1397 7.07902 12.9489 7 12.75 7H8.5V2.75Z"
                            fill="white"
                        />
                    </svg>
                </button>
                <button
                    className="logout"
                    onClick={() => {
                        localStorage.clear();
                        navigate("/login", { replace: true });
                    }}>
                    Logout
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                    </svg>
                </button>
            </div>

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
                                className={index % 2 === 0 ? "even" : "odd"} // Применение классов even и odd
                                onMouseEnter={() => setHoveredRow(index)}
                                onMouseLeave={() => setHoveredRow(null)}>
                                <td>
                                    {hoveredRow === index ? (
                                        <div className="action__buttons">
                                            <div
                                                onClick={() =>
                                                    handleEdit(item)
                                                }>
                                                <svg
                                                    className="svg__edit"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="25"
                                                    height="24"
                                                    viewBox="0 0 25 24"
                                                    fill="none">
                                                    <path
                                                        d="M11.625 4H4.625C4.09457 4 3.58586 4.21071 3.21079 4.58579C2.83571 4.96086 2.625 5.46957 2.625 6V20C2.625 20.5304 2.83571 21.0391 3.21079 21.4142C3.58586 21.7893 4.09457 22 4.625 22H18.625C19.1554 22 19.6641 21.7893 20.0392 21.4142C20.4143 21.0391 20.625 20.5304 20.625 20V13"
                                                        stroke="#624DE3"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                    <path
                                                        d="M19.125 2.50001C19.5228 2.10219 20.0624 1.87869 20.625 1.87869C21.1876 1.87869 21.7272 2.10219 22.125 2.50001C22.5228 2.89784 22.7463 3.4374 22.7463 4.00001C22.7463 4.56262 22.5228 5.10219 22.125 5.50001L12.625 15L8.625 16L9.625 12L19.125 2.50001Z"
                                                        stroke="#624DE3"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }>
                                                <svg
                                                    className="svg__delete"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="25"
                                                    height="24"
                                                    viewBox="0 0 25 24"
                                                    fill="none">
                                                    <path
                                                        d="M3.625 6H5.625H21.625"
                                                        stroke="#A30D11"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                    <path
                                                        d="M8.625 6V4C8.625 3.46957 8.83571 2.96086 9.21079 2.58579C9.58586 2.21071 10.0946 2 10.625 2H14.625C15.1554 2 15.6641 2.21071 16.0392 2.58579C16.4143 2.96086 16.625 3.46957 16.625 4V6M19.625 6V20C19.625 20.5304 19.4143 21.0391 19.0392 21.4142C18.6641 21.7893 18.1554 22 17.625 22H7.625C7.09457 22 6.58586 21.7893 6.21079 21.4142C5.83571 21.0391 5.625 20.5304 5.625 20V6H19.625Z"
                                                        stroke="#A30D11"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                    <path
                                                        d="M10.625 11V17"
                                                        stroke="#A30D11"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                    <path
                                                        d="M14.625 11V17"
                                                        stroke="#A30D11"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </div>
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
