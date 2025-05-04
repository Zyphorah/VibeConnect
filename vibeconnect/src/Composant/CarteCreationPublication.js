import React, { useState, useContext } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { FaBold, FaItalic, FaListUl, FaBell } from 'react-icons/fa';
import './Css/CarteCreationPublication.css'; 
import { PostsApi } from '../Api/PostsApi.js'; 
import { ApiConfigContext } from '../Context/ApiContext.js';
import { enregistrerImage } from '../Api/enregistrerImage.js';
import { CarteCreationPublicationLogic } from './Logic/CarteCreationPublicationLogic.js';
import { useTranslation } from 'react-i18next';

export function CarteCreationPublication({ posts = [], setPosts }) { 
  const { t } = useTranslation();
  const { url, key } = useContext(ApiConfigContext);
  const [contenu, setContenu] = useState('');
  const [imageSelectionnee, setImageSelectionnee] = useState(null);
  const [messageErreur, setMessageErreur] = useState(''); // État pour afficher un message d'erreur
  const api = new PostsApi(key, url); 
  const imageApi = new enregistrerImage();

  const logic = new CarteCreationPublicationLogic(setImageSelectionnee, setPosts, setContenu);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contenu.trim() || !imageSelectionnee) {
      setMessageErreur(t('carteCreationPublication.errorMessage')); 
      return;
    }
    setMessageErreur(''); // Réinitialiser le message d'erreur si tout est valide
    logic.gererSubmit(e, contenu, imageSelectionnee, imageApi, api, posts);
  };

  return (
    <div className="arriere-plan">
      <Card className="carte-formulaire">
        <h5>{t('carteCreationPublication.addPost')}</h5>
        <Form onSubmit={handleSubmit}>
          <div className="zone-texte">
            <Row className="mb-2 barre-outils">
              <Col xs="auto">
                {[FaBold, FaItalic, FaListUl].map((Icon, idx) => (
                  <Button key={idx} variant="link" className="bouton-outil">
                    <Icon />
                  </Button>
                ))}
              </Col>
            </Row>
            <Form.Control 
              as="textarea" 
              rows={4} 
              placeholder={t('carteCreationPublication.textPlaceholder')}
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              className="champ-texte"
            />
          </div>
          <Row className="mt-3">
            <Col xs={6}>
              <Form.Group controlId="formFile" className="mb-3 zone-image">
                <Form.Label className="label-image">
                  {imageSelectionnee ? (
                    <img 
                      src={URL.createObjectURL(imageSelectionnee)} 
                      alt={t('carteCreationPublication.selectedImageAlt')} 
                      className="image-preview" 
                    />
                  ) : (
                    <>
                      <img 
                        src="https://via.placeholder.com/50" 
                        alt={t('carteCreationPublication.placeholderImageAlt')} 
                        className="image-placeholder"
                      />
                      <div>{t('carteCreationPublication.chooseImage')}</div>
                    </>
                  )}
                </Form.Label>
                <Form.Control type="file" className="input-fichier" onChange={(e) => logic.changerImage(e)} />
              </Form.Group>
            </Col>
            <Col xs={6} className="d-flex align-items-end justify-content-end">
              <Button variant="primary" type="submit">
                {t('carteCreationPublication.publish')}
              </Button>
            </Col>
          </Row>
          {messageErreur && ( // Affichage du message d'erreur
            <div className="mt-3 text-danger d-flex align-items-center">
              <FaBell className="me-2" />
              <span>{messageErreur}</span>
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default CarteCreationPublication;