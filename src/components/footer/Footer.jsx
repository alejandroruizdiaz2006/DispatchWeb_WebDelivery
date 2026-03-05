import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Navegación</h4>
          <Link to="/home">Inicio</Link>
          <Link to="/characters">Wiki</Link>
          <Link to="/contact">Contacto</Link>
          <Link to="/rss">Canal RSS</Link>
        </div>

        <div className="footer-section">
          <h4>Proyecto</h4>
          <a href="https://github.com/alejandroruizdiaz2006/DispatchWeb_FirstDelivery" target="_blank" rel="noopener noreferrer">
            Repositorio GitHub
          </a>
          <a href="https://www.figma.com/community/file/1020338048666327318/dark-mode-dashboard-ui-kit" target="_blank" rel="noopener noreferrer">
            Inspiración en Figma
          </a>
        </div>

        <div className="footer-section">
          <h4>Redes Sociales</h4>
          <div className="social-links">
            <a href="https://twitter.com/marvel" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              Twitter
            </a>
            <a href="https://instagram.com/marvel" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              Instagram
            </a>
            <a href="https://github.com/alejandroruizdiaz2006" target="_blank" rel="noopener noreferrer" className="social-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              Desarrollador
            </a>
          </div>
        </div>
      </div>

      <div className="footer-legal">
        <p>© 2026 Dispatch Fan Project. Todos los derechos reservados.</p>
        <p>
          <Link to="/privacidad">Política de Privacidad y Cookies</Link> | <Link to="/condiciones">Condiciones de Venta</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;