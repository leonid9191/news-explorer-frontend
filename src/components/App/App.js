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
import NothingFound from "../NothingFound/NothingFound";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchKeywords, setSearchKeywords] = useState([]);

  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  // useEffect(() => {
  //   console.log(savedCards)
  //   localStorage.setItem("save", savedCards)
  // },[savedCards])

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
    localStorage.clear();
    setIsLoggedIn(false);
    userHistory("/");
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
                handleNewsSearch={handleNewsSearch}
              />
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
              />
              <SavedNewsHeader searchKeywords={searchKeywords} />
              <SavedNews
                cards={savedCards}
                isLoggedIn={isLoggedIn}
                deleteCard={handleDeleteCard}
              />
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
  );
}

export default App;
