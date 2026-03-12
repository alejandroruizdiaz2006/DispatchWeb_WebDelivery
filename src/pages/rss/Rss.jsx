import { useState } from 'react';
import './Rss.css';

function Rss() {
  const [noticias, setNoticias] = useState([
  {
    title: 'Base de datos de la Wiki actualizada con los perfiles del Equipo Z',
    pubDate: '2026-03-12 15:05:09',
    image: '/main_logo.png',
    link: '/rss/News.xml'
  },
  {
    title: 'Nuevo sistema de Reportes de Incidentes activo en la terminal',
    pubDate: '2026-03-11 14:36:39',
    image: '/main_logo.png',
    link: '/rss/News.xml'
  },
  {
    title: 'Protocolo DEFCON implementado exitosamente en la red de seguridad',
    pubDate: '2026-03-10 14:26:03',
    image: '/main_logo.png',
    link: '/rss/News.xml'
  },
  {
    title: 'Precisión del mapa holográfico del HQ mejorada vía satélite',
    pubDate: '2026-03-09 13:54:04',
    image: '/main_logo.png',
    link: '/rss/News.xml'
  }
]);

  return (
    <div className="rss-container">
      <div className="rss-header">
        <a href="https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fes.ign.com%2Ffeed.xml" target="_blank" rel="noopener noreferrer" className="rss-button">
          Archivo RSS
        </a>
      </div>
      
      <div className="news-grid">
        {noticias.map((noticia, index) => (
          <div key={index} className="news-card">
            <img src={noticia.image} alt="Imagen de actualización" className="news-image" />
            <div className="news-content">
              <h3>{noticia.title}</h3>
              <p className="news-date">{noticia.pubDate}</p>
              <a href={noticia.link} className="read-more-btn">
                Leer informe completo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rss;