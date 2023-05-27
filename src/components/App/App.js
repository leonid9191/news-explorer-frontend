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
import MainApi from "../../utils/MainApi";
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
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchKeywords, setSearchKeywords] = useState([]);
  const [globalErrorMessage, setGlobalErrorMessage] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  const BASE_URL = "https://api.news-leo.mooo.com";
  // const BASE_URL = "http://localhost:3000";
  const mainApi = new MainApi({
    baseUrl: BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": BASE_URL,
      authorization: `Bearer ${jwt}`,
    },
  });
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
  // Save Article
  const saveArticle = (article) => {
    mainApi
      .saveArticle({
        keyword: keyword,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
        owner: currentUser._id,
      })
      .then((res) => {
        setSavedCards([res.data, ...savedCards]);
      })
      .catch((err) => console.log(err));
  };

  const closeAllPopups = () => {
    setIsLoginOpen(false);
    setIsMobileMenuOpen(false);
    setIsRegisterOpen(false);
    setSuccessRegistration(false);
    setGlobalErrorMessage("");
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

  const getSavedArticles = () => {
    mainApi
      .getSavedArticles()
      .then((res) => {
        setSavedCards(res);
      })
      .catch((err) => console.log(err));
  };

  // Delete from saved
  const deleteArticleFromSavedNews = (articleId) => {
    if (jwt) {
      mainApi.removeArticle(articleId).then(() => {
        const newSavedArticles = savedCards.filter(
          (item) => item._id !== articleId
        );
        setSavedCards(newSavedArticles);
      });
    }
  };

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
          console.log(err);
          setGlobalErrorMessage("Email exist");
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
        setCurrentUser(res.data);
        localStorage.setItem("jwt", res.token);
        setJwt(res.token)
        setIsLoggedIn(true);
        setIsLoginOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //log Out
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setJwt("");
    setIsLoggedIn(false);
    setCurrentUser({});
  };
  //check if user logged in
  useEffect(() => {
    if (jwt) {
      auth
        .checkingTokenValidity(jwt)
        .then((user) => {
          setCurrentUser(user.data);
          setIsLoggedIn(true);
          getSavedArticles();
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoggedIn(false);
      setCurrentUser({});
    }
  }, [jwt]);

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
                    cards={cards}
                    isLoggedIn={isLoggedIn}
                    loginModal={() => {
                      setIsLoginOpen(true);
                    }}
                    saveCard={saveArticle}
                    tipTitle={"Sign in to save articles"}
                    buttonType="save"
                    savedCards={savedCards}
                    deleteCard={deleteArticleFromSavedNews}
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
                <ProtectedRoute isLoggedIn={isLoggedIn} component={Main}>
                  <SavedNewsHeader
                    searchKeywords={searchKeywords}
                    savedCards={savedCards}
                  />
                  <SavedNews
                    NewsResults={""}
                    cards={savedCards}
                    isLoggedIn={isLoggedIn}
                    deleteCard={deleteArticleFromSavedNews}
                  />
                </ProtectedRoute>
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
          globalErrorMessage={globalErrorMessage}
        />
        <RegistrationForm
          openModal={(e) => {
            e.preventDefault();
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
          globalErrorMessage={globalErrorMessage}
          handleRegistration={handleRegistration}
          isOpen={isRegisterOpen}
          onClose={closeAllPopups}
          successRegistration={successRegistration}
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
