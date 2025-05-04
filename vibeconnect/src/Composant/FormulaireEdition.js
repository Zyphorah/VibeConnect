import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function FormulaireEdition({ editedContent, setEditedContent, editedImageUrl, handleSaveEdit, setIsEditing }) {
  const { t } = useTranslation();

  return (
    <>
      <Form.Control
        type="text"
        className="mb-2"
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <Form.Group id="formFile" className="mb-2">
        <Form.Label>{t('formulaireEdition.editImage')}</Form.Label>
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
        {t('formulaireEdition.save')}
      </Button>
      <Button variant="secondary" onClick={() => setIsEditing(false)}>
        {t('formulaireEdition.cancel')}
      </Button>
    </>
  );
}

export default FormulaireEdition;
