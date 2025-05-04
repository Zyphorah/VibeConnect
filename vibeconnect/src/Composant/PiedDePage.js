import 'bootstrap/dist/css/bootstrap.min.css';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBBtn
} from 'mdb-react-ui-kit';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GestionLocalStorage } from '../LocalStorage/GestionLocalStorage';

export function PiedDePage() {
    const { t, i18n } = useTranslation();
    const gestionLocalStorage = new GestionLocalStorage();

    useEffect(() => {
        const savedLangue = gestionLocalStorage.recuperer("langue");
        if (savedLangue) {
            i18n.changeLanguage(savedLangue);
        }
    }, [i18n]);

    const changerLangue = (event) => {
        let nouvelleLangue = event.target.value;
        i18n.changeLanguage(nouvelleLangue);
        gestionLocalStorage.sauvegarder("langue", nouvelleLangue);
    };

    return (
        <MDBFooter className='bg-dark text-center text-white'>
            <MDBContainer className='p-4 pb-0'>
                <section className='mb-4'>
                    <MDBBtn outline color="light" floating className='m-1' href='https://facebook.com' role='button'>
                        <MDBIcon fab icon='facebook-f' />
                    </MDBBtn>
                    <MDBBtn outline color="light" floating className='m-1' href='https://twitter.com' role='button'>
                        <MDBIcon fab icon='twitter' />
                    </MDBBtn>
                    <MDBBtn outline color="light" floating className='m-1' href='https://google.com' role='button'>
                        <MDBIcon fab icon='google' />
                    </MDBBtn>
                    <MDBBtn outline color="light" floating className='m-1' href='https://instagram.com' role='button'>
                        <MDBIcon fab icon='instagram' />
                    </MDBBtn>
                    <MDBBtn outline color="light" floating className='m-1' href='https://linkedin.com' role='button'>
                        <MDBIcon fab icon='linkedin-in' />
                    </MDBBtn>
                    <MDBBtn outline color="light" floating className='m-1' href='https://github.com/zyphorah' role='button'>
                        <MDBIcon fab icon='github' />
                    </MDBBtn>
                </section>
            </MDBContainer>
            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2025 Copyright: Raphael Arseneault
            </div>
            <div className="p-3">
                <select
                    className="form-select w-auto mx-auto"
                    style={{ display: 'inline-block', backgroundColor: '#343a40', color: 'white', border: '1px solid white' }}
                    onChange={changerLangue}
                    defaultValue={i18n.language}
                >
                    <option value="fr">{t('languageFrench')}</option>
                    <option value="en">{t('languageEnglish')}</option>
                    <option value="es">{t('languageSpanish')}</option>
                </select>
            </div>
        </MDBFooter>
    );
}