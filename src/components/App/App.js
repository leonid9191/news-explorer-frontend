import { Main } from "./../Main/Main";
import { AboutMe } from "../AboutMe/AboutMe";
import "./App.css";
import { Footer } from "../Footer/Footer";
import { NewCardList } from "../NewsCardList/NewCardList";
import { PopupWithForm } from "../PopupWithForm/PopupWithForm";

function App() {
  return (
    <div className="app">
      <Main />
      <NewCardList />
      <AboutMe />
      <Footer />
      {/*<PopupWithForm/> */}
    </div>
  );
}

export default App;
