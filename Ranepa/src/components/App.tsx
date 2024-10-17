// import { Background } from "./Background";
import { MainComponent } from "./MainComponent";
import { Caseorium } from "./Caseorium";
import { Classes } from "./Classes";
// import { Contact } from "./Contact";
import { Expert } from "./Expert";
// import { FAQ } from "./FAQ";
import { Footer } from "./Footer";
import { About } from "./About";
import { Form } from "./Form";
import { Cases } from "./Cases";
// import { Header } from "./Header";
// import { Help } from "./Help";
// import { Project } from "./Project";
// import { Ready } from "./Ready";
// import { Services } from "./Services";

function App() {
    return (
        <>
            <MainComponent />
            <About />
            {/* <Background />
            <Header /> */}
            {/* <Services /> */}
            <Classes />
            <Expert />
            <Form />
            <Cases />
            <Caseorium />
            {/*<FAQ />
            <Help />
            <Ready />*/}
            {/* <Project /> */}
            <Footer />
        </>
    );
}

export default App;
