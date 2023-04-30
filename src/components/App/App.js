import { Main } from './../Main/Main';
import { AboutMe } from "../AboutMe/AboutMe";
import './App.css';
import { Footer } from '../Footer/Footer';
import { NewCardList } from '../NewsCardList/NewCardList';

function App() {
  return (
    <div className="app">
      <Main />
      <NewCardList/>
      <AboutMe />
      <Footer />
    </div>
  );
}

export default App;
