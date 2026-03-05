import { useState, useEffect } from 'react';
import './Rss.css';

function Rss() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRss = async () => {
      try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fes.ign.com%2Ffeed.xml');
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          setNews(data.items);
        } else {
          throw new Error('API Rate Limit');
        }
      } catch (error) {
        setNews([
          { 
            title: "Nuevo parche de seguridad para la Red Dispatch", 
            pubDate: "Hace 2 horas", 
            link: "https://www.ign.com/es", 
            thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80" 
          },
          { 
            title: "El Equipo Z lidera la tabla de rescates globales", 
            pubDate: "Hace 5 horas", 
            link: "https://www.ign.com/es", 
            thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80" 
          },
          { 
            title: "Avances en la tecnología de trajes tácticos", 
            pubDate: "Hace 12 horas", 
            link: "https://www.ign.com/es", 
            thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80" 
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRss();
  }, []);

  return (
    <section className="rss-page">
      <div className="rss-header">
        <h1>Feed de Comunicaciones</h1>
        <a href="https://es.ign.com/feed.xml" target="_blank" rel="noopener noreferrer" className="rss-raw-btn">
          📡 Archivo RSS Original
        </a>
      </div>
      
      {loading ? (
        <p className="loading-text">Interceptando red de noticias globales...</p>
      ) : (
        <div className="rss-grid">
          {news.map((item, index) => (
            <article key={index} className="rss-card">
              {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="rss-image" />}
              <div className="rss-content">
                <h3>{item.title}</h3>
                <p>{item.pubDate}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="rss-link">
                  Leer informe completo
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Rss;