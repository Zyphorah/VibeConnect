import { Button, Form } from 'react-bootstrap';

export function Commentaire({ data }) {
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
              <Button variant="text" className="text-danger p-0">Supprimer</Button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Commentaire;