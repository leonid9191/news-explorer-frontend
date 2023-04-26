import {Link} from 'react-router-dom'

export function Logo () {
  return (
    <Link className="logo" onClick={() => console.log('logo')} to="/">
      <span className='logo__header'>NewsExplorer</span>
    </Link>
  )
}