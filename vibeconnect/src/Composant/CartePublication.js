import React from 'react';
import './Css/CartePublication.css';
import { Card, Button, Form, Container, Image } from 'react-bootstrap';
import { GestionLocalStorage } from '../LocalStorage/GestionLocalStorage.js';
import { postsApi } from '../Api/PostsApi.js';
import { ApiConfigContext } from '../Context/ApiContext.js';
import Commentaire from './Commentaire.js'; 
import { useNavigate } from 'react-router-dom';

export function CartePublication({ post, utilisateur, onDelete }) {
  const navigate = useNavigate(); 
  const { url, key } = React.useContext(ApiConfigContext);
  const postApi = new postsApi(key, url);

  // Compatibilité : si post n'est pas fourni, utiliser utilisateur
  const donnees = post || utilisateur;
  if (!donnees) {
    return null; // Ensure the component returns null if no data is provided
  }

  // Récupération des infos utilisateur pour l'affichage
  const auteur = donnees.owner || donnees;
  const nomAuteur = auteur.userName || "Utilisateur inconnu";
  const photoProfil = auteur.profilePicture || "https://via.placeholder.com/150";

  const gestionLocalStorage = new GestionLocalStorage();
  const currentUserId = gestionLocalStorage.recuperer('id');

  const contenu = donnees.content || "";
  const imagePublication = donnees.imageUrl || "https://via.placeholder.com/600x300";
  const nombreLikes = Array.isArray(donnees.likes) ? donnees.likes.length : 0;
  const nombreCommentaires = Array.isArray(donnees.comments) ? donnees.comments.length : 0;
  const datePublication = donnees.createdAt ? new Date(donnees.createdAt).toLocaleString() : "";

  return (
    <Container className="d-flex justify-content-center align-items-center vh-10 container-vibe">
      <Card className="m-3 p-4" id="carte-publication">
        {/* Nom de l'utilisateur */}
        <div className="d-flex align-items-center mb-2">
          <img
            onClick={() => navigate("/Profil", { state: { userData: auteur } })} 
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
        <div className="mt-3">
          {Array.isArray(donnees.comments) && donnees.comments.length > 0 ? (
            donnees.comments.map((comment, index) => (
              <Commentaire key={index} data={comment} />
            ))
          ) : (
            <p className="text-muted">Aucun commentaire pour l'instant.</p>
          )}
        </div>

        <div className="mt-3 d-flex justify-content-between">
          <Button variant="text">Afficher plus</Button>
          <div>
            
          {auteur.id === currentUserId && (
            <Button variant="text" className="text-primary me-2">
              Modifier
            </Button>
            )}
            {auteur.id === currentUserId && (
              <Button
                variant="text"
                className="text-danger"
                onClick={() => {
                  if (window.confirm("Voulez-vous supprimer cette publication ?")) {
                    if (onDelete) {
                      onDelete(donnees.id);
                      
                    } else {
                      console.log("Suppression du post", donnees.id);
                      postApi.supprimerPost(donnees.id);
                    }
                  }
                }}
              >
                Supprimer
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default CartePublication;