import { useState } from 'react';
import { teamZ, dispatchNetwork, villains } from '../../data/characters';
import CharacterCard from '../../components/character-card/CharacterCard';
import './Characters.css';

function Characters() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const allCharacters = [
    ...teamZ.map(c => ({ ...c, faction: 'Equipo Z' })),
    ...dispatchNetwork.map(c => ({ ...c, faction: 'Dispatch' })),
    ...villains.map(c => ({ ...c, faction: 'Villanos' }))
  ];

  const filteredCharacters = allCharacters.filter(character => {
    const matchesTab = activeTab === 'Todos' || character.faction === activeTab;
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          character.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section className="wiki-page">
      <div className="wiki-header">
        <h1>Base de Datos Central</h1>
        <p>Accediendo a los expedientes clasificados de héroes y amenazas registradas...</p>
      </div>

      <div className="wiki-controls">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar expediente por nombre o rol (ej. Waterboy, Ataque...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="wiki-search"
          />
        </div>

        <div className="wiki-tabs">
          <button 
            className={activeTab === 'Todos' ? 'active' : ''} 
            onClick={() => setActiveTab('Todos')}
          >
            Todos
          </button>
          <button 
            className={activeTab === 'Equipo Z' ? 'active' : ''} 
            onClick={() => setActiveTab('Equipo Z')}
          >
            Equipo Z
          </button>
          <button 
            className={activeTab === 'Dispatch' ? 'active' : ''} 
            onClick={() => setActiveTab('Dispatch')}
          >
            Red Dispatch
          </button>
          <button 
            className={activeTab === 'Villanos' ? 'active' : ''} 
            onClick={() => setActiveTab('Villanos')}
          >
            Villanos
          </button>
        </div>
      </div>

      {filteredCharacters.length === 0 ? (
        <div className="no-results">
          <div className="warning-icon">⚠️</div>
          <h3>Expediente no encontrado</h3>
          <p>Ningún sujeto coincide con los parámetros de búsqueda en la base de datos.</p>
        </div>
      ) : (
        <div className="wiki-grid">
          {filteredCharacters.map(character => (
            <CharacterCard
              key={`${character.faction}-${character.id}`}
              name={character.name}
              role={character.role}
              description={character.description}
              image={character.image}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Characters;