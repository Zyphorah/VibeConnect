import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { DescriptionSection } from "../Composant/DescriptionSection.js";
import "./Css/Formulaire/Connexion.css";
import "./Css/index.css";
import "./Css/Formulaire/formulaire.css";
import { UsersAPI } from "../Api/UsersAPI.js";
import { GestionLocalStorage } from "../LocalStorage/GestionLocalStorage.js";
import { useNavigate } from "react-router-dom";

 var apiKey = 'API_RA7834F9B2E65C1D0';
 var apiUrl = 'https://api-427-gne0gxh8bwg4bbgp.canadacentral-01.azurewebsites.net';
 var userApi = new UsersAPI(apiKey, apiUrl);

 var gestionLocalStorage = new GestionLocalStorage();
 
export function Connexion() {
  const [userName, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  const navigate = useNavigate(); 
  async function GestionButtonConnexion() {

    if (userName.trim() === "" || password.trim() === "") {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const response = await userApi.authentifierUtilisateur(userName, password);
      if (!response) {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
      } else {
        gestionLocalStorage.sauvegarder("token",response.token);
        gestionLocalStorage.sauvegarder("id",response.user.id);
        navigate("/Accueil");
        console.log("Connexion réussie :", response);
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      if (error.status === 401) {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
      } 
    }
    //teste
   var teste = await userApi.recupererDetailsUtilisateur("04d35bd1-636b-492a-9978-7a6b90c38f50");
   console.log("test",teste);

  }
 
  return (
    <div className="vibe-login-page">
      <Container className="d-flex justify-content-center align-items-center vh-100 container-vibe">
        <div className="login-card">
          <div className="form-section">
            <h2 className="connexion-title">connexion</h2>
            <Form className="FormulaireConnexion">
              <Form.Group controlId="formUsername">
                <Form.Control type="text" placeholder="Votre nom d’utilisateur" className="input-field" onChange={(e)=>setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Control type="password" placeholder="Votre mot de passe" className="input-field" onChange={(e)=>setPassword(e.target.value) } />
              </Form.Group>

              <Button
                  variant="danger"
                  className="login-button mt-4"
                  onClick={async () => {
                  GestionButtonConnexion();
              }}
              >
                Se connecter
            </Button>

              <div className="text-center mt-3">
                <Link to="/inscription" className="create-account-link">
                  Créer un compte
                </Link>
              </div>
            </Form>
          </div>
          <div className="description-section">
            <DescriptionSection />
          </div>
        </div>
      </Container>
    </div>
  );

}

export default Connexion;
