import { CartePublication } from '../Composant/CartePublication.js';
import { useAccueilLogic } from './Logic/AccueilLogic.js';
import { useState } from 'react';
import { Button } from 'react-bootstrap'; 

export function ToutesLesPublications() {
    const { publications } = useAccueilLogic();
    const [visiblePosts, setVisiblePosts] = useState(5);

    const handleLoadMore = () => {
        setVisiblePosts((prev) => prev + 5);
    };

    return (
        <div>
            {publications && publications.length > 0 ? (
                publications.slice(0, visiblePosts).map((publication, index) => (
                    <CartePublication key={index} post={publication} />
                ))
            ) : (
                <p>Aucune publication disponible.</p>
            )}
            {publications && visiblePosts < publications.length && (
                <div className="d-flex justify-content-center mt-3">
                    <Button variant="primary" onClick={handleLoadMore}>
                        Suivant
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ToutesLesPublications;