import { useState, useEffect } from 'react';
import './EmergencyButton.css';

function EmergencyButton() {
  const [isEmergency, setIsEmergency] = useState(false);

  useEffect(() => {
    if (isEmergency) {
      document.body.classList.add('emergency-active');
    } else {
      document.body.classList.remove('emergency-active');
    }
  }, [isEmergency]);

  return (
    <button
      className={`emergency-btn ${isEmergency ? 'active' : ''}`}
      onClick={() => setIsEmergency(!isEmergency)}
    >
      {isEmergency ? '⚠ DESACTIVAR ALARMA' : '🚨 PROTOCOLO DE EMERGENCIA'}
    </button>
  );
}

export default EmergencyButton;