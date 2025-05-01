import React from 'react';
import './Css/CartePublication.css';
import { Card, Button, Form, Container, Image } from 'react-bootstrap';

export function CartePublication({ utilisateur }) {
  if (!utilisateur) {
    return <p>Utilisateur non disponible.</p>;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 container-vibe">
      <Card className="m-3 p-4" id="carte-publication">
        <div className="d-flex align-items-center mb-4">
          <img
            src={utilisateur.profilePicture || "https://via.placeholder.com/150"}
            alt={utilisateur.userName || "Utilisateur"}
            className="avatar"
          />
          <h5 className="ms-2 mb-0">{utilisateur.userName || "Nom inconnu"}</h5>
        </div>

        <h6 className="mb-3 fw-bold">{utilisateur.bio || "Pas de bio disponible"}</h6>

        <Card.Img
          variant="top"
          src={utilisateur.bannerPicture || "https://via.placeholder.com/600x300"}
          className="image-publication"
        />

        <div className="d-flex align-items-center mt-2">
          <i className="bi bi-hand-thumbs-up-fill text-primary"></i>
          <Image src="like.png" alt="Like" id="like-icon" />
          <span className="ms-1">10</span>
        </div>

        <Form.Control
          type="text"
          placeholder="Ajouter un commentaire"
          className="mt-3"
        />
        <div className="mt-3 d-flex justify-content-between">
          <Button variant="text">Afficher plus</Button>
          <div>
            <Button variant="text" className="text-primary me-2">
              Modifier
            </Button>
            <Button variant="text" className="text-danger">
              Supprimer
            </Button>
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default CartePublication;