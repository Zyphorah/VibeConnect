import { PiedDePage } from './Composant/PiedDePage';
import React from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import { Connexion } from './Page/Connexion';
import { Inscription } from './Page/Inscription';
import { PageProfil } from './Page/PageProfil';
import {CartePublication} from './Composant/CartePublication';

function App() {
    return (
            <Router>   
                <div className="d-flex flex-column min-vh-100">
                    <Routes>
                        <Route path="/" element={<Connexion />} />
                        <Route path="/Connexion" element={<Connexion />} /> 
                        <Route path="/Inscription" element={<Inscription />} /> 
                        <Route path="/Profil" element={<PageProfil/>} />
                        <Route path="/Publication" element={<CartePublication/>} />
                    </Routes>
                </div>
                  <PiedDePage />
            </Router>
          );
}
export default App;
