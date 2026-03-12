import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Characters from './pages/characters/Characters';
import Contact from './pages/contact/Contact';
import Rss from './pages/rss/Rss';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import EmergencyButton from './components/emergency/EmergencyButton';
import SecretTerminal from './components/secret/SecretTerminal';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rss" element={<Rss />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/condiciones" element={<Terms />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <EmergencyButton />
        <SecretTerminal />
      </main>
      <Footer />
    </>
  );
}

export default App;