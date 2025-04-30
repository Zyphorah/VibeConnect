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

 var apiKey = 'API_RA7834F9B2E65C1D0';
 var apiUrl = 'https://apisocialapi.azure-api.net'
 var userApi = new UsersAPI(apiKey, apiUrl);

 var gestionLocalStorage = new GestionLocalStorage();
 
export function Connexion() {
  const [userName, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");

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
        console.log("Connexion réussie :", response);
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      if (error.status === 401) {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
      } 
    }
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
/*
  {
    fetch('https://apisocialapi.azure-api.net/Users', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjJlOTM1MzI2LTJjNjUtNDAxYy04MGM1LTkzYTRmYTJhNTViMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJ6eXBob3JhaCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Inp5cGhvcmFoLnplbkBnbWFpbC5jb20iLCJqdGkiOiI2M2FmZGVkMi03ODM1LTQ4NTktYjVmZC1hMDc3ZTUzZTczOTgiLCJleHAiOjE3NDYxMjYxNzUsImlzcyI6Imh0dHBzOi8vbWFyY2VsbGFuZHJ5LmNvbSIsImF1ZCI6Imh0dHBzOi8vbWFyY2VsbGFuZHJ5LmNvbSJ9.wcEYx6l0W3l_SJemH5ugYewZhzGkmCO4abuOzwwZmnM',
        'X-Dev-Api-Key': 'API_RA7834F9B2E65C1D0'
      }
    })
  }
    */
}

export default Connexion;
