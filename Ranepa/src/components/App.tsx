import { Caseorium } from "./Caseorium";
import { Classes } from "./Classes";
import { Contact } from "./Contact";
import { Expert } from "./Expert";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Help } from "./Help";
import { Project } from "./Project";
import { Ready } from "./Ready";

function App() {
    return (
        <>
            <Header />
            <Classes />
            <Expert />
            <Caseorium />
            <Help />
            <Ready />
            <Project />
            <Contact />
            <Footer />
        </>
    );
}

export default App;
