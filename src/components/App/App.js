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
import { MobileMenu } from "../MobileMenu/MobileMenu";

function App() {
  const darkStyle = "_dark";
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsLoginOpen(true);
  };

  const closeAllPopups = () => {
    setIsLoginOpen(false);
    setIsMobileMenuOpen(false);
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
    <div className="app">
      <MobileMenu
        isLoggedIn={isLoggedIn}
        isOpen={isMobileMenuOpen}
        onClose={closeAllPopups}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Main
                openHamburger={() => setIsMobileMenuOpen(true)}
                handleLoginClick={handleLoginClick}
              />
              <NewCardList />
              <AboutMe />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/saved-news"
          element={
            <>
              <Header darkStyle={darkStyle} />
              <SavedNewsHeader />
              <SavedNews />
              <Footer />
            </>
          }
        />
      </Routes>
      <PopupWithForm isOpen={isLoginOpen} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
