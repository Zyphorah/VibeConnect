import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Image, Modal, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './Css/PageProfil.css';
import Markdown from 'react-markdown';
import { CartePublication } from '../Composant/CartePublication.js';
import { PostsApi } from '../Api/PostsApi.js';
import { ApiConfigContext } from '../Context/ApiContext.js';
import { GestionLocalStorage } from '../LocalStorage/GestionLocalStorage.js';
import { UsersAPI } from '../Api/UsersAPI.js';
import FormulaireProfil from '../Composant/FormulaireProfil.js';
import { LogiqueProfil } from './Logic/LogiqueProfil.js';
import { enregistrerImage } from '../Api/enregistrerImage.js';
import { useTranslation } from 'react-i18next';
import { useBlockAcces } from '../Acces/GestionnaireAcces.js';

export function PageProfil() {
  useBlockAcces();
  const { t } = useTranslation();
  const emplacement = useLocation();
  const donneesUtilisateur = emplacement.state?.userData;
  const { url, key } = useContext(ApiConfigContext);
  const postApi = new PostsApi(key, url);
  const usersApi = new UsersAPI(key, url);
  const gestionLocalStorage = new GestionLocalStorage();
  const imageUploader = new enregistrerImage();
  const logiqueProfil = new LogiqueProfil(usersApi, postApi, gestionLocalStorage, imageUploader, t);

  const [publications, setPublications] = useState([]);
  const [rafraichir, setRafraichir] = useState(false);
  const [afficherModal, setAfficherModal] = useState(false);
  const [formData, setFormData] = useState({
    userName: donneesUtilisateur?.userName || null,
    email: donneesUtilisateur?.email || null,
    bio: donneesUtilisateur?.bio || null,
    firstName: donneesUtilisateur?.firstName || null,
    lastName: donneesUtilisateur?.lastName || null,
    profilePicture: donneesUtilisateur?.profilePicture || null,
    bannerPicture: donneesUtilisateur?.bannerPicture || null,
    password: null,
  });
  const [userData, setUserData] = useState(donneesUtilisateur);

  useEffect(() => {
    logiqueProfil.recupererPublicationsUtilisateur(donneesUtilisateur.id, setPublications, rafraichir);
  }, [donneesUtilisateur, rafraichir]);

  if (!donneesUtilisateur) {
    return logiqueProfil.afficherAucuneDonneeUtilisateur();
  }

  const idUtilisateurConnecte = gestionLocalStorage.recuperer('userId');

  return (
    <>
      <Container className="page-bio my-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row>
          <Col md={4} className="text-center left-section">
            <div className="image-container">
              <Image
                src={userData.profilePicture || 'Visage.png'}
                roundedCircle
                className="profile-image mb-3"
              />
            </div>
            <h3>{userData.userName || t('pageProfil.unknownUser')}</h3>
            <p>
              <strong>{t('pageProfil.email')}:</strong> {userData.email || t('pageProfil.notAvailable')}
            </p>
            {idUtilisateurConnecte === userData.id && (
              <>
                <Button variant="primary" onClick={() => setAfficherModal(true)}>
                  {t('pageProfil.editProfile')}
                </Button>
                <Button
                  variant="danger"
                  className="mt-2"
                  onClick={() => logiqueProfil.gererSuppressionCompte()}
                >
                  {t('pageProfil.deleteAccount')}
                </Button>
              </>
            )}
          </Col>
          <Col md={7}>
            <Image
              src={userData.bannerPicture || '/default-banner.jpg'}
              className="banner-image mb-3"
              style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }}
            />
            <Markdown>{userData.bio}</Markdown>
          </Col>
        </Row>
      </Container>
      {publications.length > 0 ? (
        publications.map((publication, index) => (
          <CartePublication key={index} post={publication} refresh={() => logiqueProfil.rafraichir(setRafraichir)} />
        ))
      ) : (
        <p>{t('pageProfil.noPosts')}</p>
      )}
      <Modal show={afficherModal} onHide={() => setAfficherModal(false)} autoFocus backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t('pageProfil.editProfile')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormulaireProfil
            formData={formData}
            handleInputChange={(e) => logiqueProfil.gererChangementInput(e, setFormData)}
            handleFileChange={(e) => logiqueProfil.gererChangementFichier(e, setFormData, setUserData)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAfficherModal(false)}>
            {t('pageProfil.cancel')}
          </Button>
          <Button
            variant="primary"
            onClick={() => logiqueProfil.gererEnregistrementModifications(formData, donneesUtilisateur, setAfficherModal, setUserData)}
          >
            {t('pageProfil.saveChanges')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PageProfil;