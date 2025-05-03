import {CarteCreationPublication} from '../Composant/CarteCreationPublication';
import {gestionLocalStorage} from '../LocalStorage/GestionLocalStorage';
import { useEffect, useState } from 'react';


export function SesPublications()
{
     const gestionLocalStorage = new GestionLocalStorage();
    
      useEffect(() => {
        const fetchData = async () => 
        {
          try {
            const result = await api.recupererTousLesPosts();
            console.log("Posts dans fetch:", result);
            return result.posts || [];
          } catch (error) {
            console.error("Erreur lors de la récupération des posts:", error);
          }
        };
        fetchData();
      }, []);

      return (
        <div className="arriere-plan">
          <h1>Mes publications</h1>
          <CarteCreationPublication />
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <CartePublication key={index} post={post} />
            ))
          ) : (
            <p>Aucun post disponible.</p>
          )}
        </div>
      );
}
