import React from 'react';
import { Form } from 'react-bootstrap';

export function FormulaireProfil({ formData, handleInputChange, handleFileChange }) {
  return (
    <Form>
      <Form.Group controlId="formFirstName">
        <Form.Label>Prénom</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName || ''}
          onChange={handleInputChange}
          autoFocus
        />
      </Form.Group>
      <Form.Group controlId="formLastName">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName || ''}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formUserName">
        <Form.Label>Nom d'utilisateur</Form.Label>
        <Form.Control
          type="text"
          name="userName"
          value={formData.userName || ''}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password || ''}
          onChange={handleInputChange}
          placeholder="Laissez vide pour ne pas changer"
        />
      </Form.Group>
      <Form.Group controlId="formBio">
        <Form.Label>Biographie</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="bio"
          value={formData.bio || ''}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formProfilePicture">
        <Form.Label>Photo de profil</Form.Label>
        <Form.Control
          type="file"
          name="profilePicture"
          onChange={handleFileChange}
        />
      </Form.Group>
      <Form.Group controlId="formBannerPicture">
        <Form.Label>Bannière</Form.Label>
        <Form.Control
          type="file"
          name="bannerPicture"
          onChange={handleFileChange}
        />
      </Form.Group>
    </Form>
  );
}

export default FormulaireProfil;
