import { Header } from "./Header";
import { Footer } from "./Footer";
import { HomePage } from "./HomePage";
import { MapPage } from "./MapPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Router>
                <Header />

                <Routes>
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path="/mappage" element={<MapPage />} />

                    <Route path="/" element={<HomePage />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;
