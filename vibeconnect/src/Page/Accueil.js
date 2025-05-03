import { CartePublication } from '../Composant/CartePublication.js';
import { useAccueilLogic } from './Logic/AccueilLogic.js';

export function Accueil() {
    const { publications } = useAccueilLogic();

    return (
        <div>
            {publications && publications.length > 0 ? (
                publications.map((publication, index) => (
                    <CartePublication key={index} post={publication} />
                ))
            ) : (
                <p>Aucune publication disponible.</p>
            )}
        </div>
    );
}

export default Accueil;