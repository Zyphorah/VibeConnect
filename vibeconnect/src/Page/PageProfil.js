import React from 'react';
import { Container, Row, Col, Image, Modal, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './Css/PageProfil.css';
import Markdown from 'react-markdown';
import { CartePublication } from '../Composant/CartePublication.js';
import { useEffect, useState, useContext } from 'react';
import { PostsApi } from '../Api/PostsApi.js'; 
import { ApiConfigContext } from '../Context/ApiContext.js';
import { GestionLocalStorage } from '../LocalStorage/GestionLocalStorage.js';
import { UsersAPI } from '../Api/UsersAPI.js';
import FormulaireProfil from '../Composant/FormulaireProfil.js';
import { handleDeleteAccount, handleSaveChanges } from './Logic/LogiqueProfil.js';
import { enregistrerImage } from '../Api/enregistrerImage.js';
import Swal from 'sweetalert2';

export function PageProfil() {
  const emplacement = useLocation();
  const donneesUtilisateur = emplacement.state?.userData;
  const { url, key } = useContext(ApiConfigContext);
  const postApi = new PostsApi(key, url); 
  const usersApi = new UsersAPI(key, url);
  const gestionLocalStorage = new GestionLocalStorage();
  const userId = gestionLocalStorage.recuperer('id');
  const [posts, setPosts] = useState([]);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    userName: donneesUtilisateur?.userName || null,
    email: donneesUtilisateur?.email || null,
    bio: donneesUtilisateur?.bio || null,
    firstName: donneesUtilisateur?.firstName || null,
    lastName: donneesUtilisateur?.lastName || null,
    password: null,
  });
  const imageUploader = new enregistrerImage();

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      try {
        const imageUrl = await imageUploader.enregistrerImage(files[0]);
        setFormData(prev => ({ ...prev, [name]: imageUrl }));
      } catch (error) {
        Swal.fire('Erreur', `Une erreur est survenue lors de l'upload de l'image (${name}).`, 'error');
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await postApi.recupererTousLesPosts(true);
        const userPosts = result.posts.filter(post => post.owner?.id === donneesUtilisateur.id);
        setPosts(userPosts);
        setIsPostsLoaded(true);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts:", error);
      }
    };
    if (userId && !isPostsLoaded) fetchPosts();
  }, [postApi, userId, donneesUtilisateur, isPostsLoaded]); 

  const handleEditClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!donneesUtilisateur) {
    return <p>Aucune donnée utilisateur disponible.</p>;
  }

  return (
    <>
      <Container className="page-bio my-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row>
          <Col md={4} className="text-center left-section">
            <div className="image-container">
              <Image
                src={donneesUtilisateur.profilePicture || 'Visage.png'}
                roundedCircle
                className="profile-image mb-3"
              />
            </div>
            <h3>{donneesUtilisateur.userName || 'Utilisateur inconnu'}</h3>
            <p><strong>Email :</strong> {donneesUtilisateur.email || 'Non disponible'}</p>
            {userId === donneesUtilisateur.id && (
              <>
                <Button variant="primary" onClick={handleEditClick}>Modifier le profil</Button>
                <Button variant="danger" className="mt-2" onClick={() => handleDeleteAccount(usersApi, gestionLocalStorage)}>
                  Supprimer le compte
                </Button>
              </>
            )}
          </Col>
          <Col md={7}>
            <Image
              src={donneesUtilisateur.bannerPicture || '/default-banner.jpg'}
              className="banner-image mb-3"
              style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }}
            />
            <Markdown>{donneesUtilisateur.bio}</Markdown>
          </Col>
        </Row>
      </Container>
      {posts.length > 0 ? (
        posts.map((post, index) => <CartePublication key={index} post={post} />)
      ) : (
        <p>Aucun post disponible.</p>
      )}
      <Modal show={showModal} onHide={handleCloseModal} autoFocus backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Modifier le profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormulaireProfil
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Annuler</Button>
          <Button variant="primary" onClick={() => handleSaveChanges(usersApi, formData, donneesUtilisateur, setShowModal)}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PageProfil;
