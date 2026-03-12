import { useState, useEffect } from 'react';
import './SecretTerminal.css';

function SecretTerminal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleInput = (e) => {
      if (e.target.tagName === 'INPUT' && e.target.value === 'HACKER') {
        setIsOpen(true);
      }
    };

    window.addEventListener('input', handleInput);
    return () => window.removeEventListener('input', handleInput);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="secret-terminal-overlay">
      <div className="secret-terminal-box">
        <div className="terminal-header">
          <span>TERMINAL CLASIFICADA SDN</span>
          <button onClick={() => setIsOpen(false)}>X</button>
        </div>
        <div className="terminal-content">
          <p>ACCESO DE ADMINISTRADOR CONCEDIDO.</p>
          <p>Cargando base de datos encriptada...</p>
          <p>Estado de la base: OPERATIVA.</p>
          <p className="blinking-cursor">_</p>
        </div>
      </div>
    </div>
  );
}

export default SecretTerminal;