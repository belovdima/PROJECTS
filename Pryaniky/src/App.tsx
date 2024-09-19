import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import { Table } from './Table'; // Компонент с таблицей

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/table" element={<Table />} /> {/* Страница таблицы */}
            </Routes>
        </Router>
    );
}

export default App;
