import React from 'react';
import { CartePublication } from '../Composant/CartePublication.js';
import CarteCreationPublication from '../Composant/CarteCreationPublication.js';
import { useSesPublicationLogic } from './Logic/SesPublicationLogic.js';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function SesPublication() {
  const { t } = useTranslation();
  const { posts, setPosts, supprimerTousLesPosts } = useSesPublicationLogic();

  return (
    <div>
      <CarteCreationPublication posts={posts} setPosts={setPosts} />

      <div className="d-flex justify-content-center my-3">
        <Button
          variant="danger"
          onClick={supprimerTousLesPosts}
        >
          {t('mesPublications.deleteAllPosts')}
        </Button>
      </div>
      
      {posts.length > 0 ? (
        posts.map((post, index) => <CartePublication key={index} post={post} />)
      ) : (
        <p>{t('mesPublications.noPosts')}</p>
      )}
    </div>
  );
}

export default SesPublication;
