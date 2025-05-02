import React from 'react';
import './Css/CartePublication.css';
import { Card, Button, Form, Container, Image } from 'react-bootstrap';

export function CartePublication({ post, utilisateur }) {
  // Compatibilité : si post n'est pas fourni, utiliser utilisateur
  const donnees = post || utilisateur;
  if (!donnees) {
    return <p>Publication non disponible.</p>;
  }

  // Récupération des infos utilisateur pour l'affichage
  const auteur = donnees.owner || donnees;
  const nomAuteur = auteur.userName || "Utilisateur inconnu";
  const photoProfil = auteur.profilePicture || "https://via.placeholder.com/150";

  const contenu = donnees.content || "";
  const imagePublication = donnees.imageUrl || "https://via.placeholder.com/600x300";
  const nombreLikes = Array.isArray(donnees.likes) ? donnees.likes.length : 0;
  const nombreCommentaires = Array.isArray(donnees.comments) ? donnees.comments.length : 0;
  const datePublication = donnees.createdAt ? new Date(donnees.createdAt).toLocaleString() : "";

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 container-vibe">
      <Card className="m-3 p-4" id="carte-publication">
        {/* Nom de l'utilisateur */}
        <div className="d-flex align-items-center mb-2">
          <img
            src={photoProfil}
            alt={nomAuteur}
            className="avatar"
          />
          <h5 className="ms-2 mb-0">{nomAuteur}</h5>
        </div>

        <h6 className="mb-3 fw-bold">{contenu}</h6>

        <Card.Img
          variant="top"
          src={imagePublication}
          className="image-publication"
        />

        <div className="mt-2">
          <small className="text-muted">Publié le : {datePublication}</small>
        </div>

        <div className="d-flex align-items-center mt-2">
          <i className="bi bi-hand-thumbs-up-fill text-primary"></i>
          <Image src="like.png" alt="Like" id="like-icon" />
          <span className="ms-1">{nombreLikes} J'aime</span>
          <span className="ms-3">{nombreCommentaires} commentaire(s)</span>
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