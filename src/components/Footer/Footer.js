import github from '../../images/github.png'
import facebook from '../../images/facebook.png'

export function Footer() {
  const dateYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {dateYear} Supersite, Powered by News API</p>
      <nav className='footer__navigation'>
        <ul className='footer__navigation-list'>
          <li>Home</li>
          <li>Practicum</li>
        </ul>
        <ul className='footer__navigation-list'>
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