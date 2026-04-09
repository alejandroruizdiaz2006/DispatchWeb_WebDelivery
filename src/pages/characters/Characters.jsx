import { useState, useEffect } from 'react';
import { getCharacters, addCharacter } from '../../services/firebaseService';
import { teamZ, dispatchNetwork, villains } from '../../data/characters';
import CharacterCard from '../../components/character-card/CharacterCard';
import * as XLSX from 'xlsx';
import './Characters.css';

function Characters() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const [allCharacters, setAllCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();
        setAllCharacters(data);
      } catch (error) {
        console.error("Error al cargar desde Firebase:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  const filteredCharacters = allCharacters.filter(character => {
    const matchesTab = activeTab === 'Todos' || character.faction === activeTab;
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });


  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        let newCharacters = [];
        const fileName = file.name.toLowerCase();
        const text = new TextDecoder().decode(e.target.result);

        if (fileName.endsWith('.json')) {
          newCharacters = JSON.parse(text);

        } else if (fileName.endsWith('.xml')) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(text, "text/xml");
          const chars = xmlDoc.getElementsByTagName("character");
          for (let i = 0; i < chars.length; i++) {
            newCharacters.push({
              name: chars[i].getElementsByTagName("name")[0]?.textContent || '',
              role: chars[i].getElementsByTagName("role")[0]?.textContent || '',
              faction: chars[i].getElementsByTagName("faction")[0]?.textContent || ''
            });
          }

        } else if (fileName.endsWith('.csv')) {
          const rows = text.split('\n').map(row => row.trim()).filter(row => row);

          for (let i = 1; i < rows.length; i++) {
            const columns = rows[i].split(',');
            if (columns[0]) {
              newCharacters.push({
                name: columns[0] || '',
                role: columns[1] || '',
                faction: columns[2] || ''
              });
            }
          }
        } else {
          throw new Error("Formato de archivo no permitido. Usa solo .json, .xml o .csv");
        }


        for (const char of newCharacters) {
          if (char.name) {
            await addCharacter(char);
          }
        }

        alert(`¡Éxito! Se han importado y guardado ${newCharacters.length} expedientes en Firebase.`);
        const data = await getCharacters();
        setAllCharacters(data);

      } catch (error) {
        alert("Error al leer el archivo: Comprueba que el formato sea correcto. Detalle: " + error.message);
      } finally {
        setIsLoading(false);
        event.target.value = null;
      }
    };

    reader.readAsArrayBuffer(file);
  };


  const handleUploadToFirebase = async () => {
    setIsLoading(true);
    const localCharacters = [
      ...teamZ.map(c => ({ ...c, faction: 'Equipo Z' })),
      ...dispatchNetwork.map(c => ({ ...c, faction: 'Dispatch' })),
      ...villains.map(c => ({ ...c, faction: 'Villanos' }))
    ];

    try {
      for (const char of localCharacters) {
        await addCharacter(char);
      }
      alert("¡Todos los personajes se han subido a Firebase con éxito!");
      const data = await getCharacters();
      setAllCharacters(data);
    } catch (error) {
      alert("Hubo un error al subir los datos: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleExportJSON = () => {
    const dataStr = JSON.stringify(filteredCharacters, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "datos.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const headers = ['name', 'role', 'faction'];
    const csvRows = [];
    csvRows.push(headers.join(','));
    filteredCharacters.forEach(char => {
      const row = [char.name, char.role, char.faction];
      csvRows.push(row.join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "datos.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportXML = () => {
    let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n<characters>\n';
    filteredCharacters.forEach(char => {
      xmlString += `  <character>\n    <name>${char.name}</name>\n    <role>${char.role}</role>\n    <faction>${char.faction}</faction>\n  </character>\n`;
    });
    xmlString += '</characters>';
    const blob = new Blob([xmlString], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "datos.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredCharacters.map(char => ({ Nombre: char.name, Rol: char.role, Faccion: char.faction }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expedientes");
    XLSX.writeFile(workbook, "datos.xlsx");
  };

  const handleExportODS = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredCharacters.map(char => ({ Nombre: char.name, Rol: char.role, Faccion: char.faction }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expedientes");
    XLSX.writeFile(workbook, "datos.ods", { bookType: "ods" });
  };


  return (
    <section className="wiki-page">
      <div className="wiki-header">
        <h1>Base de Datos Central</h1>
        <p>Accediendo a los expedientes clasificados de héroes y amenazas registradas...</p>

        {allCharacters.length === 0 && !isLoading && (
          <button onClick={handleUploadToFirebase} style={{ backgroundColor: 'red', color: 'white', padding: '10px', marginTop: '10px', cursor: 'pointer', borderRadius: '5px' }}>
            ⚠️ INICIALIZAR BASE DE DATOS ⚠️
          </button>
        )}
      </div>

      <div className="wiki-controls">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar expediente por nombre o rol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="wiki-search"
          />
        </div>

        <div className="wiki-tabs">
          <button className={activeTab === 'Todos' ? 'active' : ''} onClick={() => setActiveTab('Todos')}>Todos</button>
          <button className={activeTab === 'Equipo Z' ? 'active' : ''} onClick={() => setActiveTab('Equipo Z')}>Equipo Z</button>
          <button className={activeTab === 'Dispatch' ? 'active' : ''} onClick={() => setActiveTab('Dispatch')}>Red Dispatch</button>
          <button className={activeTab === 'Villanos' ? 'active' : ''} onClick={() => setActiveTab('Villanos')}>Villanos</button>
        </div>


        <div className="data-management" style={{ marginTop: '30px', padding: '20px', borderTop: '2px solid rgba(255,255,255,0.1)' }}>

          <div className="import-section" style={{ textAlign: 'center', marginBottom: '25px' }}>
            <h3 style={{ marginBottom: '15px', color: '#ff9800', fontSize: '1.2rem' }}>📥 Cargar Nuevos Expedientes</h3>
            <label htmlFor="file-upload" className="export-btn" style={{ backgroundColor: '#ff9800', color: 'white', cursor: 'pointer', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold' }}>
              Seleccionar Archivo (.json, .xml, .csv)
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".json,.csv,.xml"
              style={{ display: 'none' }}
              onChange={handleImport}
            />
          </div>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '20px 0' }} />

          <div className="export-section" style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '15px', color: '#4da6ff', fontSize: '1.2rem' }}>📤 Descargar Base de Datos Actual</h3>
            <div className="export-container" style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={handleExportJSON} className="export-btn">JSON</button>
              <button onClick={handleExportCSV} className="export-btn">CSV</button>
              <button onClick={handleExportXML} className="export-btn">XML</button>
              <button onClick={handleExportExcel} className="export-btn" style={{ backgroundColor: '#1d6f42', color: 'white' }}>Excel (.xlsx)</button>
              <button onClick={handleExportODS} className="export-btn" style={{ backgroundColor: '#0a3a1f', color: 'white' }}>Calc (.ods)</button>
            </div>
          </div>

        </div>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}><h3>Cargando expedientes desde la nube...</h3></div>
      ) : filteredCharacters.length === 0 ? (
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