import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './Css/PageProfil.css';
import Markdown from 'react-markdown';
import {CartePublication} from '../Composant/CartePublication.js';

const markdown = `
## Biographie

**Origine :** Ville de Montserein, un petit village paisible entouré de collines verdoyantes

**Caractère :** Curieux, optimiste, loyal, un peu tête en l’air, mais toujours de bonne humeur

**Passions :** Les inventions, les bandes dessinées, les défis logiques, et faire rire ses amis

**Rêve :** Devenir un grand inventeur et créer quelque chose qui changera le monde

**Citation favorite :** "Chaque problème est une aventure déguisée !"

**Famille :** Vit avec sa grande sœur Zoé et leur grand-père bricoleur qui lui a transmis l’amour des gadgets

**Meilleur ami :** Max, un génie de l’informatique un peu timide, mais toujours prêt à suivre Léo dans ses idées farfelues

**Particularité :** Il porte toujours son t-shirt rouge porte-bonheur — c’est celui qu’il portait le jour où il a réparé une radio tout seul à l’âge de 7 ans.
`;

export function PageProfil() 
{
  return (
    <>
      <Container className="page-bio my-4">
        <Row>
          <Col md={4} className="text-center left-section">
              <div className="image-container">
                  <Image 
                  src="Visage.png" 
                  roundedCircle 
                  className="profile-image mb-3"
              />
              </div>
            <h3>Léo Dubois</h3>
            <p><strong>Email :</strong> exemple@gmail.com</p>
          </Col>

          <Col md={8}>
              <Markdown>{markdown}</Markdown>
          </Col>
        </Row>
      </Container>
      <CartePublication/>
    </>
  );
}

export default PageProfil;
