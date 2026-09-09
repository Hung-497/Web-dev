import Navbar from './Navbar';
import logo from '../assets/images/logo.svg'

function Header() {
  return (
    <header>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} className="nav-logo" alt="backroads" />
          <button type="button" className="nav-toggle" id="nav-toggle">
            <i className="fas fa-bars" />
          </button>
        </div>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
