import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //импорт react роутера
import { Login } from "./Login"; //компонент с логином
import { Table } from "./Table"; // Компонент с таблицей

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} /> //ссылка на Login
                <Route path="/table" element={<Table />} /> //ссылка на Table
                <Route path="*" element={<Login />} /> //стандартная ссылка
            </Routes>
        </Router>
    );
}

export default App;
