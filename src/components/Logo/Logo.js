import {Link} from 'react-router-dom'

export function Logo ({darkStyle = ''}) {
  return (
    <Link className="logo" to="/">
      <span className={`logo__header${darkStyle}`}>NewsExplorer</span>
    </Link>
  )
}