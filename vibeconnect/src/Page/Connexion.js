import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { DescriptionSection } from "../Composant/DescriptionSection.js";
import "./Css/Formulaire/Connexion.css";
import "./Css/index.css";
import "./Css/Formulaire/formulaire.css";

export function Connexion() 
{
  return (
    <div className="vibe-login-page">
      <Container className="d-flex justify-content-center align-items-center vh-100 container-vibe">
        <Card className="card" id="cardConnexion">
          <Card.Body>
            <Form ClassName="FormulaireConnexion">
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Control type="text" placeholder="Votre nom d’utilisateur" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control type="password" placeholder="Votre mot de passe" />
              </Form.Group>

              <Button variant="danger" className="w-100 mb-3">
                Se connecter
              </Button>
              <hr />
              
               <Link to="/inscription" className="text-center">
                    <Button variant="secondary" className="w-100">
                        Créer un nouveau compte
                    </Button>
               </Link>
            </Form>
          </Card.Body>
        </Card>
       <DescriptionSection/>
      </Container>
    </div>
  );
}

export default Connexion;
