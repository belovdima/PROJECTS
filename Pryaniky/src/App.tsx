import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import { Table } from './Table'; // Компонент с таблицей

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/table" element={<Table />} />
                <Route path="*" element={<Login/>} /> {/* Редирект на /login, если путь не найден */}
            </Routes>

        </Router>
    );
}

export default App;
