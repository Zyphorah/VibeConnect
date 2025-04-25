import React from 'react';
import './Css/CartePublication.css';
import {Commentaire} from './Commentaire.js';
import { Card, Button, Form, Container, Image } from 'react-bootstrap';


export function CartePublication() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 container-vibe">
    <Card className="m-3 p-4" id="carte-publication">
      <div className="d-flex align-items-center mb-4">
        <img src="https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png" alt="Homer" className="avatar" />
        <h5 className="ms-2 mb-0">Homer</h5>
      </div>

      <h6 className="mb-3 fw-bold">Magnifique vue depuis le sommet</h6>

      <Card.Img variant="top" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" className="image-publication" />

      <div className="d-flex align-items-center mt-2">
        <i className="bi bi-hand-thumbs-up-fill text-primary"></i>
        <Image src="like.png" alt="Like" id="like-icon"/>
        <span className="ms-1">10</span>
      </div>

      <Form.Control type="text" placeholder="Ajouter un commentaire" className="mt-3" />
      <Commentaire />
      <div className="mt-3 d-flex justify-content-between">
        <Button variant="text">Afficher plus</Button>
        <div>
          <Button variant="text" className="text-primary me-2">Modifier</Button>
          <Button variant="text" className="text-danger">Supprimer</Button>
        </div>
      </div>
    </Card>
    </Container>
  );
};

export default CartePublication;
