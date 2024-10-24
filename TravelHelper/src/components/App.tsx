import { Header } from "./Header";
import { Footer } from "./Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Middle } from "./Middle";
import { Converter } from "./Converter";

function App() {
    return (
        <>
            <Router>
                <Header />

                <Routes>
                    <Route path="/middle" element={<Middle />} />
                    <Route path="/converter" element={<Converter />} />

                    <Route path="/" element={<Middle />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;
