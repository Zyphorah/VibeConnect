import { Button } from 'react-bootstrap';
import { GestionLocalStorage } from '../LocalStorage/GestionLocalStorage';

export function Commentaire({ data }) {
  const gestionLocalStorage = new GestionLocalStorage();
  const currentUserId = gestionLocalStorage.recuperer('id');
    return (
      <div>
        <div className="boite-commentaire mt-3 p-2">
          <div className="d-flex align-items-center mb-1">
            <img
              src={data.owner.profilePicture || "https://via.placeholder.com/50"}
              alt={data.owner.userName  || "Utilisateur"}
              className="avatar-commentaire"
            />
            <strong className="ms-2">{data.owner.userName || "Utilisateur inconnu"}</strong>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span>{data.content || "Aucun contenu disponible"}</span>
            <div className="d-flex align-items-center">
              <i className="bi bi-hand-thumbs-up-fill text-primary"></i>
              {}
              {data.owner.id === currentUserId && (
              <Button variant="text" className="text-danger p-0">Supprimer</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Commentaire;