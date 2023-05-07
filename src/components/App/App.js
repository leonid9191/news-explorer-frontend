import { Main } from "./../Main/Main";
import { AboutMe } from "../AboutMe/AboutMe";
import "./App.css";
import { Footer } from "../Footer/Footer";
import { NewCardList } from "../NewsCardList/NewCardList";
import { Route, Routes } from "react-router";
import { Header } from "../Header/Header";
import { SavedNewsHeader } from "../SavedNewsHeader/SavedNewsHeader";
import { SavedNews } from "../SavedNews/SavedNews";
import { useState, useEffect } from "react";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { LogIn } from "../LogInForm/LogInForm";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";

function App() {
  const darkStyle = "_dark";
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsLoginOpen(true);
  };

  const closeAllPopups = () => {
    setIsLoginOpen(false);
    setIsMobileMenuOpen(false);
    setIsRegisterOpen(false);
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
        handleLoginClick={handleLoginClick}
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
      <LogIn
        openModal={(e) => {
          e.preventDefault();
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        isOpen={isLoginOpen}
        onClose={closeAllPopups}
      />
      <RegistrationForm
        openModal={(e) => {
          e.preventDefault();
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
        isOpen={isRegisterOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
