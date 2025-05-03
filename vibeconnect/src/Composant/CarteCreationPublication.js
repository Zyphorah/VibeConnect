import React, { useState, useContext } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { FaBold, FaItalic, FaListUl } from 'react-icons/fa';
import './Css/CarteCreationPublication.css'; 
import { postsApi } from '../Api/PostsApi';
import { ApiConfigContext } from '../Context/ApiContext.js';
import CartePublication from './CartePublication.js';


export function CarteCreationPublication() {

  const { url, key } = useContext(ApiConfigContext);
  const [contenu, setContenu] = useState('');
  const [imageSelectionnee, setImageSelectionnee] = useState(null);
  const api = new postsApi(key, url);
 

  const changerImage = (e) => {
    if (e.target.files.length > 0) {
      const fichier = e.target.files[0];
      setImageSelectionnee(URL.createObjectURL(fichier));
    }
  };

  const changerContenu = (e) => {
    setContenu(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nouveauPost = await api.creerPost(contenu, imageSelectionnee || '');
      console.log('Post créé avec succès:', nouveauPost);
      setContenu('');
      setImageSelectionnee(null);
    } catch (err) {
      console.error("Erreur lors de la création du post", err);
    }
  };

  return (
    <div className="arriere-plan">
      <Card className="carte-formulaire">
        <h5>Ajouter une publication</h5>
        <Form onSubmit={handleSubmit}>
          <div className="zone-texte">
            <Row className="mb-2 barre-outils">
              <Col xs="auto">
                <Button variant="link" className="bouton-outil">
                  <FaBold />
                </Button>
                <Button variant="link" className="bouton-outil">
                  <FaItalic />
                </Button>
                <Button variant="link" className="bouton-outil">
                  <FaListUl />
                </Button>
              </Col>
            </Row>
            <Form.Control 
              as="textarea" 
              rows={4} 
              placeholder=""
              value={contenu}
              onChange={changerContenu}
              className="champ-texte"
            />
          </div>
          <Row className="mt-3">
            <Col xs={6}>
              <div className="zone-image">
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label className="label-image">
                    {imageSelectionnee ? (
                      <img src={imageSelectionnee} alt="Image sélectionnée" className="image-preview" />
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
                  <Form.Control type="file" className="input-fichier" onChange={changerImage} />
                </Form.Group>
              </div>
            </Col>
            <Col xs={6} className="d-flex align-items-end justify-content-end">
              <Button variant="primary" type="submit">
                Publier
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <CartePublication data/>
    </div>
  );
};

export default CarteCreationPublication;