import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export function FormulaireEdition({ editedContent, setEditedContent, editedImageUrl, handleSaveEdit, setIsEditing }) {
  return (
    <>
      <Form.Control
        type="text"
        className="mb-2"
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <Form.Group id="formFile" className="mb-2">
        <Form.Label>Modifier l'image</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      {editedImageUrl && (
        <Card.Img
          variant="top"
          src={editedImageUrl}
          className="image-publication"
        />
      )}
      <Button variant="success" className="me-2" onClick={handleSaveEdit}>
        Sauvegarder
      </Button>
      <Button variant="secondary" onClick={() => setIsEditing(false)}>
        Annuler
      </Button>
    </>
  );
}

export default FormulaireEdition;
