
import { Container, Navbar, Nav } from 'react-bootstrap';
import { ModalPacintes } from './ModalPacientes';
import React from 'react';

type HeaderNavbarProps = {
  page?: string
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({page}) =>{
    
    return (
        <Navbar bg="primary" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/home">Teste Covid</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>    
          </Nav>
          {page === 'home' && (
             <Nav><ModalPacintes/></Nav>
            )}
         
        </Container>
      </Navbar>

    );
}