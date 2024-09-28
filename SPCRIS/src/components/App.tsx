import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./MainPage";
import { PersonPage } from "./PersonPage";
import { Filter } from "./Filter";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/mainpage" element={<MainPage />} />
                <Route path="/person/:id" element={<PersonPage />} />
                <Route path="/filter" element={<Filter />} />

                <Route path="/" element={<MainPage />} />
            </Routes>
        </Router>
    );
};

export default App;
