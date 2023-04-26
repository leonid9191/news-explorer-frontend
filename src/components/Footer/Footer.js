import github from '../../images/github.png'
import facebook from '../../images/facebook.png'

export function Footer() {
  const dateYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {dateYear} © 2021 Supersite, Powered by News API</p>
      <nav>
        <ul>
          <li>Home</li>
          <li>Practicum</li>
        </ul>
        <ul>
          <li>
            <img src={github} alt="github" />
          </li>
          <li>
            <img src={facebook} alt="facebook" />
          </li>
        </ul>
      </nav>
    </footer>
  );
}