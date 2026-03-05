import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/ui/logo-dispatch.png'; 

import './Header.css';

function Header() {
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="main-header">
      <div className="header-logo">
        <img src={logo} alt="Dispatch Logo" className="logo-img" />
      </div>

      <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/home" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/characters" onClick={closeMenu}>Wiki</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        <NavLink to="/rss" onClick={closeMenu}>RSS</NavLink>
      </nav>

      <div className="header-right">
        <div className="language-switch">
          <button onClick={() => i18n.changeLanguage('es')}>ES</button>
          <button onClick={() => i18n.changeLanguage('en')}>EN</button>
        </div>
        
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;