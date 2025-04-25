import {Button} from 'react-bootstrap';

export function Commentaire()
{
    return(
        <div className="boite-commentaire mt-3 p-2">
        <div className="d-flex align-items-center mb-1">
          <img src="https://cdn-icons-png.flaticon.com/512/194/194938.png" alt="Léo Dubois" className="avatar-commentaire" />
          <strong className="ms-2">Léo Dubois</strong>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span>Wow !</span>
          <div className="d-flex align-items-center">
            <i className="bi bi-hand-thumbs-up-fill text-primary"></i>
            <Button variant="text" className="text-danger p-0">Supprimer</Button>
          </div>
        </div>
      </div>
    );
}

export default Commentaire;