import './App.css';
import { PiedDePage } from './Composant/PiedDePage';
import React from 'react';
import { BrowserRouter as Router, Routes} from 'react-router-dom';

function App() {
    return (
            <Router>   
                <div className="d-flex flex-column min-vh-100">
                    <Routes>
                         
                    </Routes>
                </div>
                  <PiedDePage />
            </Router>
     
  );
}

export default App;
