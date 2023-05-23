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
import { SuccessRegistration } from "../SuccessRegistration/SuccessRegistration";
import { NewsApi } from "../../utils/NewsExplorerApi";
import { Preloader } from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import NothingFound from "../NothingFound/NothingFound";
import * as auth from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
function App() {
  const userHistory = useNavigate();
  //Styles
  const darkStyle = "_dark";
  const [isLoading, setIsLoading] = useState("_hidden");
  const [isNothingFound, setIsNothingFound] = useState("_hidden");
  const [isNewsResults, setIsNewsResults] = useState("_hidden");

  //Modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSuccessRegistration, setSuccessRegistration] = useState(false);

  //Status
  const [jwt, setJwt] = useState(localStorage.getItem('jwt'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchKeywords, setSearchKeywords] = useState([]);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  const handleNewsResults = () => {
    setIsNewsResults("");
    setIsNothingFound("_hidden");
    setIsLoading("_hidden");
  };
  const handleNothingFound = () => {
    setIsNewsResults("_hidden");
    setIsLoading("_hidden");
    setIsNothingFound("");
  };
  const handleLoginOpen = (e) => {
    e.preventDefault();
    setIsLoginOpen(true);
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    setIsLoggedIn(false);
    userHistory("/");
  };
  const handleOpenHamburger = () => {
    setIsMobileMenuOpen(true);
  };

  const successRegistration = () => {
    setIsRegisterOpen(false);
    setSuccessRegistration(true);
  };

  //save card
  const handleSaveCard = (card) => {
    setSavedCards([card, ...savedCards]);
    localStorage.setItem("save", savedCards);
  };
  //delete card
  const handleDeleteCard = (card) => {
    const newCards = savedCards.filter((c) => c.title !== card.title);
    localStorage.setItem("save", savedCards);
    setSavedCards(newCards);
  };

  const closeAllPopups = () => {
    setIsLoginOpen(false);
    setIsMobileMenuOpen(false);
    setIsRegisterOpen(false);
    setSuccessRegistration(false);
  };

  //News Explorer Api
  const handleNewsSearch = (userKeyword) => {
    setIsLoading("");
    NewsApi.getNews(userKeyword)
      .then((cardData) => {
        const newsArticles = cardData.articles;
        newsArticles.forEach((article) => (article["keyword"] = userKeyword));
        if (cardData.status === "ok") {
          if (cardData.totalResults > 0) {
            setKeyword(userKeyword);
            setSearchKeywords([keyword, ...searchKeywords]);
            setCards(newsArticles);
            handleNewsResults();
          } else {
            setIsNewsResults("_hidden");
            handleNothingFound();
          }
        }
        setIsLoading("_hidden");
      })
      .catch((err) => {
        setIsNewsResults("_hidden");

        if (err.status === 404) {
          handleNothingFound();
        }
        console.log(err);
      });
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

  //check if user logged in before and save email
  useEffect(() => {
    if (jwt) {
      auth
        .checkingTokenValidity(jwt)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          userHistory("/");
        })
        .catch((err) => console.log(err));
    }
  }, [jwt]);

  //Registration
  const handleRegistration = (email, password, username) => {
    if (password) {
      auth
        .register(email, password, username)
        .then((res) => {
          if (res) {
            setIsRegisterOpen(false);
            setSuccessRegistration(true);
          } else {
            console.log("Something went wrong.");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  //logIn by email and password
  const handleLogin = (email, password) => {
    if (!email || !password) {
      return;
    }
    auth
      .logIn(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setIsLoginOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //log Out
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setJwt('')
    setIsLoggedIn(false);
    setCurrentUser({});
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <MobileMenu
          handleLoginClick={handleLoginOpen}
          isLoggedIn={isLoggedIn}
          handleLogOut={handleLogout}
          isOpen={isMobileMenuOpen}
          onClose={closeAllPopups}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header
                  handleLoginClick={handleLoginOpen}
                  openHamburger={handleOpenHamburger}
                  isLoggedIn={isLoggedIn}
                  handleLogOut={handleLogout}
                  handleNewsSearch={handleNewsSearch}
                />
                <Main>
                  <NewCardList
                    NewsResults={isNewsResults}
                    keyword={keyword}
                    cards={cards}
                    isLoggedIn={isLoggedIn}
                    loginModal={() => {
                      setIsLoginOpen(true);
                    }}
                    saveCard={handleSaveCard}
                    tipTitle={"Sign in to save articles"}
                    buttonType="save"
                  />
                  <NothingFound isNothingFound={isNothingFound} />
                  <Preloader isLoading={isLoading} />
                  <AboutMe />
                </Main>
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/saved-news"
            element={
              <>
                <Header
                  darkStyle={darkStyle}
                  isLoggedIn={isLoggedIn}
                  handleLogOut={handleLogOut}
                  openHamburger={handleOpenHamburger}
                />
                {/* <ProtectedRoute isLoggedIn={isLoggedIn}> */}
                  <Main>
                    <SavedNewsHeader searchKeywords={searchKeywords} />
                    <SavedNews
                      NewsResults={isNewsResults}
                      cards={savedCards}
                      isLoggedIn={isLoggedIn}
                      deleteCard={handleDeleteCard}
                    />
                  </Main>
                {/* </ProtectedRoute> */}
                <Footer />
              </>
            }
          />
        </Routes>
        <LogIn
          onLoggedIn={handleLogin}
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
          handleRegistration={handleRegistration}
          isOpen={isRegisterOpen}
          onClose={closeAllPopups}
          // successRegistration={successRegistration}
        />
        <SuccessRegistration
          isOpen={isSuccessRegistration}
          onClose={closeAllPopups}
          openModal={(e) => {
            e.preventDefault();
            setSuccessRegistration(false);
            setIsLoginOpen(true);
          }}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
