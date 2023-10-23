
import { Container, Navbar, Nav } from 'react-bootstrap';
import { ModalPacintes } from './ModalPacientes';


export const HeaderNavbar = () =>{
    
    return (
        <Navbar bg="primary" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Teste Covid</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>    
          </Nav>
          <Nav><ModalPacintes/></Nav>
        </Container>
      </Navbar>

    );
}