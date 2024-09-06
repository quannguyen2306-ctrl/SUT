import "./App.css";
import Navbar from "./components/Nav/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import SuMenh from "./components/SuMenh/SuMenh";
import VeChungToi from "./components/VeChungToi/VeChungToi";
import Products from "./components/Products/Products";
import LienLac from "./components/LienLac/LienLac";
import SignMe from "./components/SignMe/SignMe";
function App() {
    return (
        <div className="App">
            <Navbar />
            <HeroSection />
            <SuMenh />
            <br />
            <br />
            <br />
            <Products />
            <VeChungToi deviceType={"mobile"} />
            <LienLac />
            <SignMe />
        </div>
    );
}

export default App;
