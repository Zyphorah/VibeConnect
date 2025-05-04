import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Css/navbar.css';
import { ApiConfigContext } from '../Context/ApiContext.js';
import { GestionLocalStorage } from '../LocalStorage/GestionLocalStorage.js';
import { UsersAPI } from '../Api/UsersAPI.js';

export function BarreNavigation() {
    const navigate = useNavigate();
    const { url, key } = useContext(ApiConfigContext);
    const gestionLocalStorage = new GestionLocalStorage();
    const currentUserId = gestionLocalStorage.recuperer('id');
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
        if (currentUserId) {
            const usersApi = new UsersAPI(key, url);
            usersApi.recupererDetailsUtilisateur(currentUserId)
                .then((data) => {
                    setUserData(data);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des informations utilisateur :", error);
                });
        }
    }, [currentUserId, key, url]);

    const nomUtilisateur = userData?.userName || "Utilisateur inconnu";
    const photoProfil = userData?.profilePicture || "https://via.placeholder.com/150";
  
    return (
        <header>
            <Navbar expand="lg" variant="dark" className="custom-navbar">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand as={Link} to="/Accueil" className="custom-navbar-brand" id="logo" style={{ marginRight: '20px' }}>
                        Vibe Connect
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav" className="justify-content-center flex-row">
                        <Nav>
                        <Nav.Link as={Link} to="/Accueil" className="text-white" style={{ marginRight: '20px' }}>Accueil</Nav.Link>
                            <Nav.Link as={Link} to="/ToutesLesPublications" className="text-white" style={{ marginRight: '20px' }}>Toutes les publications</Nav.Link>
                            <Nav.Link as={Link} to="/MesPublications" className="text-white" style={{ marginRight: '20px' }}>Mes publications</Nav.Link>
                            <Nav.Link
                                onClick={() => navigate("/Profil", { state: { userData } })}
                                className="text-white"
                                style={{ cursor: 'pointer', marginRight: '20px' }}
                            >
                                Profil
                            </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/Connexion" 
                            className="text-white" 
                            style={{ marginRight: '20px' }}
                            onClick={() => {
                                gestionLocalStorage.supprimer('token');
                                gestionLocalStorage.supprimer('id');
                                navigate("/Connexion");
                            }}
                        >
                            Déconnexion
                        </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    
                    <img
                        onClick={() => navigate("/Profil", { state: { userData } })}
                        src={photoProfil}
                        alt={nomUtilisateur}
                        className="avatar"
                        style={{ cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', marginLeft: '20px' }}
                    />
                    <h1 id="nomUtilisateur">{nomUtilisateur}</h1>
                   
                </Container>
            </Navbar>
        </header>
    );
}

export default BarreNavigation;