import React from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-center text-black w-100' style={{ backgroundColor: '#caf0f8'}}>
      <MDBContainer className='p-2'>
      <div className='text-center py-1 pt-4' style={{ backgroundColor: 'rgba(#00468B)',fontWeight: '500', letterSpacing: '1px' }}>
        <p>© 2023 Copyright <strong>FloodSafe Hub</strong>. All Rights Reserved</p>
    
      </div>

      </MDBContainer>

     
    </MDBFooter>
  );
}