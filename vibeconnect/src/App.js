import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { PiedDePage } from './Composant/PiedDePage';
import Connexion from './Page/Connexion';
import Inscription from './Page/Inscription';
import PageProfil from './Page/PageProfil';
import CartePublication from './Composant/CartePublication';
import SesPublication from './Page/MesPublications.js';
import ToutesLesPublications from './Page/ToutesLesPublications.js';
import { BarreNavigation } from './Composant/BarreNavigation.js';
import Accueil from './Page/Accueil.js'; 


function MiseEnPageBarre() {
  return (
    <>
      <BarreNavigation />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/Inscription" element={<Inscription />} />
          <Route element={<MiseEnPageBarre />}>
            <Route path="/Profil" element={<PageProfil />} />
            <Route path="/Publication" element={<CartePublication />} />
            <Route path="/MesPublications" element={<SesPublication />} />
            <Route path="/ToutesLesPublications" element={<ToutesLesPublications />} />
            <Route path="/Accueil" element={<Accueil />}/>
          </Route>
        </Routes>
      </div>
      <PiedDePage />
    </Router>
  );
}

export default App;
