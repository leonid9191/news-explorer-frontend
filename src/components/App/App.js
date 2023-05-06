import { Main } from "./../Main/Main";
import { AboutMe } from "../AboutMe/AboutMe";
import "./App.css";
import { Footer } from "../Footer/Footer";
import { NewCardList } from "../NewsCardList/NewCardList";
import { PopupWithForm } from "../PopupWithForm/PopupWithForm";
import { browserHistory, Router, Route, Routes } from "react-router";
import { Header } from "../Header/Header";
import { SavedNewsHeader } from "../SavedNewsHeader/SavedNewsHeader";
import { SavedNews } from "../SavedNews/SavedNews";
import { useState, useEffect } from "react";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const closeAllPopups = () => {
    setIsLoginOpen(false);
  };

  //close popups by ESC
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    const clickClose = (e) => {
      if (
        e.target.className.includes("popup-active") ||
        e.target.className.includes("navigation__overlay")
      ) {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    document.addEventListener("mousedown", clickClose);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
      document.removeEventListener("mousedown", clickClose);
    };
  }, []);
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="app">
              <Main handleLoginClick={handleLoginClick} />
              <NewCardList />
              <AboutMe />
              <Footer />
            </div>
          }
        />
        <Route
          exact
          path="/saved-news"
          element={
            <div className="app">
              <Header />
              <SavedNewsHeader />
              <SavedNews />
              <Footer />
            </div>
          }
        />
      </Routes>
      <PopupWithForm isOpen={isLoginOpen} onClose={closeAllPopups} />
    </>
  );
}

export default App;
