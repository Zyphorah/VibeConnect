import React from 'react';
import { CartePublication } from '../Composant/CartePublication.js';
import CarteCreationPublication from '../Composant/CarteCreationPublication.js';
import { useSesPublicationLogic } from './Logic/SesPublicationLogic.js';
import { Button } from 'react-bootstrap';

export function SesPublication() {
  const { posts, setPosts, supprimerTousLesPosts } = useSesPublicationLogic();

  return (
    <div>
      <CarteCreationPublication posts={posts} setPosts={setPosts} />
      <Button
        variant="danger"
        onClick={supprimerTousLesPosts}
        className="my-3"
      >
        Supprimer tous mes posts
      </Button>
      {posts.length > 0 ? (
        posts.map((post, index) => <CartePublication key={index} post={post} />)
      ) : (
        <p>Aucun post disponible.</p>
      )}
    </div>
  );
}

export default SesPublication;