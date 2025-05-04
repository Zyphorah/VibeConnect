import { CartePublication } from '../Composant/CartePublication.js';
import { useAccueilLogic } from './Logic/AccueilLogic.js';
import { useState } from 'react';
import { Button } from 'react-bootstrap'; 
import { useTranslation } from 'react-i18next';

export function ToutesLesPublications() {
    const { t } = useTranslation();
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
                <p>{t('toutesLesPublications.noPublications')}</p>
            )}
            {publications && visiblePosts < publications.length && (
                <div className="d-flex justify-content-center mt-3">
                    <Button variant="primary" onClick={handleLoadMore}>
                        {t('toutesLesPublications.loadMore')}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ToutesLesPublications;