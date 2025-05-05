import { CartePublication } from '../Composant/CartePublication.js';
import { useAccueilLogic } from './Logic/AccueilLogic.js';
import { useState } from 'react';
import { Button } from 'react-bootstrap'; 
import { useTranslation } from 'react-i18next';
import { useBlockAcces } from '../Acces/GestionnaireAcces.js';

export function ToutesLesPublications() {
    useBlockAcces();
    const { t } = useTranslation();
    const [refresh, setRefresh] = useState(false);
    const { publications } = useAccueilLogic(refresh, setRefresh);
    const [visiblePosts, setVisiblePosts] = useState(5);

    const handleLoadMore = () => {
        setVisiblePosts((prev) => prev + 5);
    };

    const handleRefresh = () => {
        setRefresh((prev) => !prev);
    };

    return (
        <div>
            {publications && publications.length > 0 ? (
                publications.slice(0, visiblePosts).map((publication, index) => (
                    <CartePublication key={index} post={publication} refresh={handleRefresh} />
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