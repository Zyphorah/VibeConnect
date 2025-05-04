import React, { useContext } from 'react'; 
import { Button } from 'react-bootstrap';
import { ApiConfigContext } from '../Context/ApiContext.js'; 
import { GestionLocalStorage } from '../LocalStorage/GestionLocalStorage';
import { commentsApi } from '../Api/commentsApi'; 
import { gererSupprimer } from './Logic/gererSupprimer.js';
import { useTranslation } from 'react-i18next';

export function Commentaire({ data, onCommentDeleted, refresh }) {
  const { t } = useTranslation();
  const { url, key } = useContext(ApiConfigContext); 
  const api = new commentsApi(key, url); 
  const currentUserId = new GestionLocalStorage().recuperer('id');

  const handleDelete = () => {
    gererSupprimer(api, data, onCommentDeleted);
    setTimeout(() => refresh(), 500); // Ajout d'un délai pour éviter les rafraîchissements inutiles
  };

  return (
    <div className="boite-commentaire mt-3 p-2">
      <div className="d-flex align-items-center mb-1">
        <img
          src={data.owner.profilePicture || "https://via.placeholder.com/50"}
          alt={data.owner.userName || t('commentaire.unknownUser')}
          className="avatar-commentaire"
        />
        <strong className="ms-2">{data.owner.userName || t('commentaire.unknownUser')}</strong>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span>{data.content || t('commentaire.noContent')}</span>
        {data.owner.id === currentUserId && (
          <Button
            variant="text"
            className="text-danger p-0"
            onClick={() => handleDelete()}
          >
            {t('commentaire.delete')}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Commentaire;