import './IncidentCard.css';

function IncidentCard({ id, title, status, description, onDelete, onUpdate }) {
  return (
    <article className={`incident-card status-${status.toLowerCase()}`}>
      <h3>{title}</h3>
      <span className="incident-status">{status}</span>
      <p>{description}</p>
      
      <div className="incident-actions">
        <button className="action-btn update-btn" onClick={() => onUpdate(id, status)}>
          ↻ Cambiar Estado
        </button>
        <button className="action-btn delete-btn" onClick={() => onDelete(id)}>
          ✕ Borrar
        </button>
      </div>
    </article>
  );
}

export default IncidentCard;