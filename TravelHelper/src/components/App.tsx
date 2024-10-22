import { Header } from "./Header";
import { Footer } from "./Footer";
import { BrowserRouter as Router } from "react-router-dom";
import { Middle } from "./Middle";

function App() {
    return (
        <>
            <Router>
                <Header />
                <Middle />
                <Footer />
            </Router>
        </>
    );
}

export default App;
