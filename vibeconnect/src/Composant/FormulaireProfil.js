import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function FormulaireProfil({ formData, handleInputChange, handleFileChange }) {
  const { t } = useTranslation();

  return (
    <Form>
      <Form.Group controlId="formFirstName">
        <Form.Label>{t('formulaireProfil.firstName')}</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName || ''}
          onChange={handleInputChange}
          autoFocus
        />
      </Form.Group>
      <Form.Group controlId="formLastName">
        <Form.Label>{t('formulaireProfil.lastName')}</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName || ''}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formUserName">
        <Form.Label>{t('formulaireProfil.userName')}</Form.Label>
        <Form.Control
          type="text"
          name="userName"
          value={formData.userName || ''}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>{t('formulaireProfil.email')}</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>{t('formulaireProfil.password')}</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password || ''}
          onChange={handleInputChange}
          placeholder={t('formulaireProfil.passwordPlaceholder')}
        />
      </Form.Group>
      <Form.Group controlId="formBio">
        <Form.Label>{t('formulaireProfil.bio')}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="bio"
          value={formData.bio || ''}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formProfilePicture">
        <Form.Label>{t('formulaireProfil.profilePicture')}</Form.Label>
        <Form.Control
          type="file"
          name="profilePicture"
          onChange={handleFileChange}
        />
      </Form.Group>
      <Form.Group controlId="formBannerPicture">
        <Form.Label>{t('formulaireProfil.bannerPicture')}</Form.Label>
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
