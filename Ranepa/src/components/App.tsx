import { Caseorium } from "./Caseorium";
import { Classes } from "./Classes";
// import { Contact } from "./Contact";
import { Expert } from "./Expert";
import { FAQ } from "./FAQ";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Help } from "./Help";
import { Project } from "./Project";
import { Ready } from "./Ready";
import { Services } from "./Services";

function App() {
    return (
        <>
            <Header />
            <Services />
            <Classes />
            <Expert />
            <Caseorium />
            <FAQ />
            <Help />
            <Ready />
            <Project />
            {/* <Contact /> */}
            <Footer />
        </>
    );
}

export default App;
