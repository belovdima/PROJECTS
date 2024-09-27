import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import PersonPage from "./PersonPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/mainpage" element={<MainPage />} />
                <Route path="/person/:id" element={<PersonPage />} />
            </Routes>
        </Router>
    );
};

export default App;
