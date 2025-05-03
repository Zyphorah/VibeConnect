import React, { useState, useContext } from 'react';
import './Css/CartePublication.css';
import { Card, Button, Form, Container, Image } from 'react-bootstrap';
import { GestionLocalStorage } from '../LocalStorage/GestionLocalStorage.js';
import { ApiConfigContext } from '../Context/ApiContext.js';
import Commentaire from './Commentaire.js'; 
import { useNavigate } from 'react-router-dom';
import { PostLogic } from './Logic/PostLogic.js';
import { likesApi } from '../Api/LikesApi.js';
import { commentsApi } from '../Api/commentsApi.js';
import { PostsApi } from '../Api/PostsApi.js';
import { enregistrerImage } from '../Api/enregistrerImage.js';
import FormulaireEdition from './FormulaireEdition';
import { sauvegarderEdition } from './Logic/CarteCreationPublicationLogic.js';


export function CartePublication({ post, onDelete }) {
  const navigate = useNavigate(); 
  const { url, key } = useContext(ApiConfigContext);
  const currentUserId = new GestionLocalStorage().recuperer('id');
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post?.content || "");
  const [editedImageUrl, setEditedImageUrl] = useState(post?.imageUrl || "");
  const [showAllComments, setShowAllComments] = useState(false);
  const postLogic = new PostLogic(new likesApi(key, url), new commentsApi(key, url), new PostsApi(key, url));
  const imageUploader = new enregistrerImage();

  if (!post) return null;

  const { owner: auteur, content, imageUrl, likes = [], comments = [], createdAt, id } = post;
  const nomAuteur = auteur?.userName || "Utilisateur inconnu";
  const photoProfil = auteur?.profilePicture || "https://via.placeholder.com/150";

  return (
    <Container className="d-flex justify-content-center align-items-center vh-10 container-vibe">
      <Card className="m-3 p-4" id="carte-publication">
        <div className="d-flex align-items-center mb-2">
          <img
            onClick={() => navigate("/Profil", { state: { userData: auteur } })} 
            src={photoProfil}
            alt={nomAuteur}
            className="avatar"
          />
          <h5 className="ms-2 mb-0">{nomAuteur}</h5>
        </div>

        {isEditing ? (
          <FormulaireEdition
            editedContent={editedContent}
            setEditedContent={setEditedContent}
            editedImageUrl={editedImageUrl}
            setEditedImageUrl={setEditedImageUrl}
            handleSaveEdit={() => sauvegarderEdition({ id, editedContent, editedImageUrl, setEditedImageUrl, setIsEditing, imageUploader, postLogic })}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <h6 className="mb-3 fw-bold">{content || ""}</h6>
            <Card.Img
              variant="top"
              src={imageUrl || "https://via.placeholder.com/600x300"}
              className="image-publication"
            />
          </>
        )}

        <div className="mt-2">
          <small className="text-muted">Publié le : {createdAt ? new Date(createdAt).toLocaleString() : ""}</small>
        </div>

        <div className="d-flex align-items-center mt-2">
          <Image
            src="like.png"
            alt="Like"
            id="like-icon"
            onClick={() => postLogic.gererToggleLike(likes, currentUserId, id)} 
          />
          <span className="ms-1">{likes.length} J'aime</span>
          <span className="ms-3">{comments.length} commentaire(s)</span>
        </div>

        <Form.Control
          type="text"
          placeholder="Ajouter un commentaire"
          className="mt-3"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => postLogic.gererAjouterCommentaire(e, commentText, setCommentText, id)}
        />

        <div className="mt-3">
          {comments.length > 0 ? (
            (showAllComments ? comments : comments.slice(0, 3)).map((comment, index) => (
              <Commentaire key={index} data={comment} />
            ))
          ) : (
            <p className="text-muted">Aucun commentaire pour l'instant.</p>
          )}
        </div>

        <div className="mt-3 d-flex justify-content-between">
          {comments.length > 10 && (
            <Button variant="text" onClick={() => setShowAllComments(!showAllComments)}>
              {showAllComments ? "Afficher moins" : "Afficher plus"}
            </Button>
          )}
          {auteur?.id === currentUserId && (
            <div>
              <Button variant="text" className="text-primary me-2" onClick={() => setIsEditing(true)}>
                Modifier
              </Button>
              <Button variant="text" className="text-danger" onClick={() => postLogic.gererSupprimer(id, onDelete)}>
                Supprimer
              </Button>
            </div>
          )}
        </div>
      </Card>
    </Container>
  );
}

export default CartePublication;