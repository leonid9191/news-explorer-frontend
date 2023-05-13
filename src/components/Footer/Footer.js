import github from "../../images/github.png";
import facebook from "../../images/facebook.png";

export function Footer() {
  const dateYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {dateYear} Supersite, Powered by News API
      </p>
      <nav className="footer__navigation">
        <ul className="footer__navigation-list">
          <a  className="footer__link" href="/">
            <li>Home</li>
          </a>
          <a  className="footer__link" target="_blank" href="https://practicum.com/en-isr/">
            <li>Practicum</li>
          </a>
        </ul>
        <ul className="footer__navigation-list">
          <li>
            <a  className="footer__link" target="_blank" href="https://github.com/leonid9191/">
              <img src={github} alt="github" />
            </a>
          </li>
          <li>
            <a  className="footer__link" target="_blank" href="https://www.facebook.com/leonid.chernobilskiy/">
              <img src={facebook} alt="facebook" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
