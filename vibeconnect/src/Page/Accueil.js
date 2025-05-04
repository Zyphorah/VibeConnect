import { useContext, useEffect, useState } from "react";
import { GestionLocalStorage } from "../LocalStorage/GestionLocalStorage";
import ApiContext from "../Context/ApiContext";
import { CartePublication } from "../Composant/CartePublication";
import { PostsApi } from "../Api/PostsApi";

function Accueil() {
  const { url, key } = useContext(ApiContext);
  const [dataPosts, setDataUsers] = useState({});
  const gestionLocalStorage = new GestionLocalStorage();
  const id = gestionLocalStorage.recuperer("id");
  const postsApi = new PostsApi(key, url);

  useEffect(() => {
    if (id) {
      postsApi.recupererPostsDesAbonnements(id)
        .then((data) => {
          console.log(data);
          setDataUsers(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des posts des abonnements:", error);
        });
    } else {
      console.log("Aucun utilisateur connecté.");
    }
  }, [id, key, url]);

  return (
    <div>
      {dataPosts.posts && Array.isArray(dataPosts.posts) && dataPosts.posts.length > 0 ? (
        dataPosts.posts.map((publication, index) => (
          <CartePublication key={index} post={publication} />
        ))
      ) : (
        <div>Aucun post à afficher.</div>
      )}
    </div>
  );
}

export default Accueil;