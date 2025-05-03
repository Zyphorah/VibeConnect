import React, { useState, useContext } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { FaBold, FaItalic, FaListUl } from 'react-icons/fa';
import './Css/CarteCreationPublication.css'; 
import { PostsApi } from '../Api/PostsApi.js'; 
import { ApiConfigContext } from '../Context/ApiContext.js';
import { enregistrerImage } from '../Api/enregistrerImage.js';
import { CarteCreationPublicationLogic } from './Logic/CarteCreationPublicationLogic.js';

export function CarteCreationPublication({ posts = [], setPosts }) { 
  const { url, key } = useContext(ApiConfigContext);
  const [contenu, setContenu] = useState('');
  const [imageSelectionnee, setImageSelectionnee] = useState(null);
  const api = new PostsApi(key, url); 
  const imageApi = new enregistrerImage();

  const logic = new CarteCreationPublicationLogic(setImageSelectionnee, setPosts, setContenu);

  return (
    <div className="arriere-plan">
      <Card className="carte-formulaire">
        <h5>Ajouter une publication</h5>
        <Form onSubmit={(e) => logic.gererSubmit(e, contenu, imageSelectionnee, imageApi, api, posts)}>
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
              placeholder="Entrez votre texte ici..."
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
                      alt="Image sélectionnée" 
                      className="image-preview" 
                    />
                  ) : (
                    <>
                      <img 
                        src="https://via.placeholder.com/50" 
                        alt="placeholder" 
                        className="image-placeholder"
                      />
                      <div>Choisir une image</div>
                    </>
                  )}
                </Form.Label>
                <Form.Control type="file" className="input-fichier" onChange={(e) => logic.changerImage(e)} />
              </Form.Group>
            </Col>
            <Col xs={6} className="d-flex align-items-end justify-content-end">
              <Button variant="primary" type="submit">
                Publier
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default CarteCreationPublication;