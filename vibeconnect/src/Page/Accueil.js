import { useContext, useEffect, useState } from "react";
import { GestionLocalStorage } from "../LocalStorage/GestionLocalStorage";
import ApiContext from "../Context/ApiContext";
import { CartePublication } from "../Composant/CartePublication";
import { PostsApi } from "../Api/PostsApi";
import { useTranslation } from "react-i18next";

function Accueil() {
  const { t } = useTranslation();
  const { url, key } = useContext(ApiContext);
  const [dataPosts, setDataUsers] = useState({});
  const [refresh, setRefresh] = useState(false);
  const gestionLocalStorage = new GestionLocalStorage();
  const id = gestionLocalStorage.recuperer("id");
  const postsApi = new PostsApi(key, url);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    if (id) {
      postsApi.recupererPostsDesAbonnements(id)
        .then((data) => {
          console.log(data);
          setDataUsers(data);
        })
        .catch((error) => {
          console.error(t('accueil.errorFetchingPosts'), error);
        });
    } else {
      console.log(t('accueil.noUserConnected'));
    }
  }, [id, key, url, t, refresh]);

  return (
    <div id="fileActualite">
      <h1 style={{ textAlign: "center" }}>{t('accueil.title')}</h1>
      
      {dataPosts && dataPosts.posts && Array.isArray(dataPosts.posts) && dataPosts.posts.length > 0 ? (
      dataPosts.posts.map((publication, index) => (
        <CartePublication key={index} post={publication} refresh={handleRefresh} />
      ))
    ) : (
      <div>{t('accueil.noPosts')}</div>
    )}
     
    </div>
  );
}

export default Accueil;