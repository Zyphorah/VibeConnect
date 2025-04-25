import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBBtn
  } from 'mdb-react-ui-kit';
import React from 'react';

export function PiedDePage() {
 
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
             
          </div>
        </MDBFooter>
      );
}