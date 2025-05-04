import React, { useState, useContext, useEffect } from 'react';
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
import { FaBell } from 'react-icons/fa';
import { FollowersApi } from '../Api/FollowersApi.js';
import { useTranslation } from 'react-i18next';

export function CartePublication({ post, onDelete, refresh }) {
  const { t } = useTranslation();
  const navigate = useNavigate(); 
  const { url, key } = useContext(ApiConfigContext);
  const currentUserId = new GestionLocalStorage().recuperer('id');
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post?.content || "");
  const [editedImageUrl, setEditedImageUrl] = useState(post?.imageUrl || "");
  const [showAllComments, setShowAllComments] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const postLogic = new PostLogic(new likesApi(key, url), new commentsApi(key, url), new PostsApi(key, url));
  const imageUploader = new enregistrerImage();
  const followersApi = new FollowersApi(key, url);

  const { owner: auteur, content, imageUrl, likes = [], comments = [], createdAt, id } = post || {};
  const nomAuteur = auteur?.userName || t('cartePublication.unknownUser');
  const photoProfil = auteur?.profilePicture || "https://via.placeholder.com/150";

  useEffect(() => {
    if (auteur?.id && currentUserId !== auteur.id) {
      // Récupérer le nombre de followers de l'auteur
      followersApi.recupererFollowersParUtilisateur(auteur.id)
        .then(data => {
          setFollowerCount(data?.length || 0);
        })
        .catch(err => {
          if (err.status === 404) {
            setFollowerCount(0);
          } else {
            console.error(err);
          }
        });
      // Vérifier si l'utilisateur courant suit l'auteur
      followersApi.recupererSuivisParUtilisateur(currentUserId)
        .then(data => {
          const found = data?.some(user => user.id === auteur.id);
          setIsFollowing(found);
        })
        .catch(err => console.error(err));
    }
  }, [auteur?.id, currentUserId]);

  if (!post || !auteur) return null; 

  // currentUserId (followerId, provenant du local storage) et auteur.id (followedId, de l'utilisateur suivi)
  const toggleFollow = async () => {
    if (!auteur.id) return;
    try {
      if (!isFollowing) {
        // Ajouter un follow : followerId = currentUserId, followedId = auteur.id
        await followersApi.ajouterSuivi(currentUserId, auteur.id);
        console.log(currentUserId," et ", auteur.id);
        setIsFollowing(true);
        setFollowerCount(prev => prev + 1);
      } else {
        // Supprimer un follow : followerId = currentUserId, followedId = auteur.id
        await followersApi.supprimerSuivi(currentUserId, auteur.id);
        setIsFollowing(false);
        setFollowerCount(prev => (prev > 0 ? prev - 1 : 0));
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          {currentUserId !== auteur.id && (
            <>
              <FaBell
                onClick={toggleFollow}
                style={{ cursor: 'pointer', color: isFollowing ? 'green' : 'grey', marginLeft: '10px' }}
              />
              <span className="ms-1">{followerCount} {t('cartePublication.follows')}</span>
            </>
          )}
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
          <small className="text-muted">{t('cartePublication.publishedOn')} : {createdAt ? new Date(createdAt).toLocaleString() : ""}</small>
        </div>

        <div className="d-flex align-items-center mt-2">
          <Image
            src="like.png"
            alt="Like"
            id="like-icon"
            onClick={() => postLogic.gererToggleLike(likes, currentUserId, id,refresh)} 
          />
          <span className="ms-1">{likes.length} {t('cartePublication.likes')}</span>
          <span className="ms-3">{comments.length} {t('cartePublication.comments')}</span>
        </div>

        <Form.Control
          type="text"
          placeholder={t('cartePublication.addComment')}
          className="mt-3"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => postLogic.gererAjouterCommentaire(e, commentText, setCommentText, id, refresh)}
        />

        <div className="mt-3">
          {comments.length > 0 ? (
            (showAllComments ? comments : comments.slice(0, 3)).map((comment, index) => (
              <Commentaire key={index} data={comment} refresh={refresh} />
            ))
          ) : (
            <p className="text-muted">{t('cartePublication.noComments')}</p>
          )}
        </div>

        <div className="mt-3 d-flex justify-content-between">
          {comments.length > 10 && (
            <Button variant="text" onClick={() => setShowAllComments(!showAllComments)}>
              {showAllComments ? t('cartePublication.showLess') : t('cartePublication.showMore')}
            </Button>
          )}
          {auteur?.id === currentUserId && (
            <div>
              <Button variant="text" className="text-primary me-2" onClick={() => setIsEditing(true)}>
                {t('cartePublication.edit')}
              </Button>
              <Button variant="text" className="text-danger" onClick={() => postLogic.gererSupprimer(id, onDelete,refresh)}>
                {t('cartePublication.delete')}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </Container>
  );
}

export default CartePublication;