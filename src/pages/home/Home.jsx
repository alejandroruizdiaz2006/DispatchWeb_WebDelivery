import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { teamZ, dispatchNetwork, villains } from '../../data/characters';
import CharacterCard from '../../components/character-card/CharacterCard';
import IncidentCard from '../../components/incident-card/IncidentCard';
import heroImage from '../../assets/hero/dispatch-hero.jpg';

import './Home.css';

function Home() {
  const { t } = useTranslation();
  
  const [incidents, setIncidents] = useState([]);
  const [filter, setFilter] = useState('Todos');

  const [newTitle, setNewTitle] = useState('');
  const [newStatus, setNewStatus] = useState('Activa');
  const [newDescription, setNewDescription] = useState('');

  const fetchIncidents = async () => {
    const querySnapshot = await getDocs(collection(db, "incidents"));
    const incidentsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setIncidents(incidentsData);
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleAddIncident = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) return;

    await addDoc(collection(db, "incidents"), {
      title: newTitle,
      status: newStatus,
      description: newDescription
    });

    setNewTitle('');
    setNewStatus('Activa');
    setNewDescription('');
    fetchIncidents();
  };

  const handleDeleteIncident = async (id) => {
    await deleteDoc(doc(db, "incidents", id));
    fetchIncidents();
  };

  const handleUpdateIncident = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Activa' ? 'Completada' : 'Activa';
    await updateDoc(doc(db, "incidents", id), {
      status: nextStatus
    });
    fetchIncidents();
  };

  const filteredIncidents = filter === 'Todos' 
    ? incidents 
    : incidents.filter(incident => incident.status === filter);

  return (
    <section className="home-page">
      <div 
        className="home-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(2,6,23,0.7), rgba(2,6,23,0.9)), url(${heroImage})`
        }}
      >
        <h1>{t('homeTitle')}</h1>
        <p>{t('homeDescription')}</p>
      </div>

      <section className="home-section">
        <h2>Reportes de Incidentes</h2>

        <div className="add-incident-container">
          <form className="add-incident-form" onSubmit={handleAddIncident}>
            <input 
              type="text" 
              placeholder="Título del incidente..." 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)} 
              required 
            />
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              <option value="Activa">Activa</option>
              <option value="Completada">Completada</option>
            </select>
            <input 
              type="text" 
              placeholder="Descripción breve..." 
              value={newDescription} 
              onChange={(e) => setNewDescription(e.target.value)} 
              required 
            />
            <button type="submit">➕ Añadir</button>
          </form>
        </div>

        <div className="filter-buttons">
          <button onClick={() => setFilter('Todos')} className={filter === 'Todos' ? 'active' : ''}>Todos</button>
          <button onClick={() => setFilter('Activa')} className={filter === 'Activa' ? 'active' : ''}>Activas</button>
          <button onClick={() => setFilter('Completada')} className={filter === 'Completada' ? 'active' : ''}>Completadas</button>
        </div>
        
        <div className="incidents-grid">
          {filteredIncidents.map(incident => (
            <IncidentCard 
              key={incident.id}
              id={incident.id}
              title={incident.title}
              status={incident.status}
              description={incident.description}
              onDelete={handleDeleteIncident}
              onUpdate={handleUpdateIncident}
            />
          ))}
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="home-section">
        <h2>Equipo Z</h2>
        <div className="characters-grid">
          {teamZ.map(character => (
            <CharacterCard
              key={character.id}
              name={character.name}
              role={character.role}
              description={character.description}
              image={character.image}
            />
          ))}
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="home-section">
        <h2>Integrantes del Superhero Dispatch Network</h2>
        <div className="characters-grid">
          {dispatchNetwork.map(character => (
            <CharacterCard
              key={character.id}
              name={character.name}
              role={character.role}
              description={character.description}
              image={character.image}
            />
          ))}
        </div>
      </section>

      <div className="section-divider"></div>

      <section className="home-section">
        <h2 className="villain-title">Villanos</h2>
        <div className="characters-grid">
          {villains.map(character => (
            <CharacterCard
              key={character.id}
              name={character.name}
              role={character.role}
              description={character.description}
              image={character.image}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default Home;