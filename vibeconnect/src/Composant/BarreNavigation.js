import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Css/navbar.css';

export function BarreNavigation() {
    return (
        <header>
            <Navbar expand="lg" variant="dark" className="custom-navbar">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand as={Link} to="/Accueil" className="custom-navbar-brand" id="logo">
                        Vibe Connect
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav">
                        <Nav>
                            <Nav.Link as={Link} to="/Accueil" className="text-white">Accueil</Nav.Link>
                            <Nav.Link as={Link} to="/MesPublications" className="text-white">Mes publications</Nav.Link>
                            <Nav.Link as={Link} to="/Profil" className="text-white">Profil</Nav.Link>
                            <Nav.Link as={Link} to="/Connexion" className="text-white">Déconnexion</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default BarreNavigation;