import { Main } from "./../Main/Main";
import { AboutMe } from "../AboutMe/AboutMe";
import "./App.css";
import { Footer } from "../Footer/Footer";
import { NewCardList } from "../NewsCardList/NewCardList";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import { SavedNewsHeader } from "../SavedNewsHeader/SavedNewsHeader";
import { SavedNews } from "../SavedNews/SavedNews";
import { useState, useEffect } from "react";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { LogIn } from "../LogInForm/LogInForm";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";

function App() {
  const userHistory = useNavigate();
  //Styles
  const darkStyle = "_dark";

  //Modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

  //Status
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsLoginOpen(true);
  };
  const handleLoggedIn = (e) => {
    e.preventDefault();
    localStorage.setItem("jwt", true);
    setIsLoggedIn(true);
    closeAllPopups();
  };
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.setItem("jwt", false);
    setIsLoggedIn(false);
    userHistory("/");
  }

  const closeAllPopups = () => {
    setIsLoginOpen(false);
    setIsMobileMenuOpen(false);
    setIsRegisterOpen(false);
  };
  //check if user logged in before and save email
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoggedIn(true);
    }
  }, []);

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
                isLoggedIn={isLoggedIn}
                handleLogOut={handleLogOut}
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
              <Header darkStyle={darkStyle} isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
              <SavedNewsHeader />
              <SavedNews />
              <Footer />
            </>
          }
        />
      </Routes>
      <LogIn
        onLoggedIn={handleLoggedIn}
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
