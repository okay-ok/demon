import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';
function Navigation() {
  return (
    <Navbar   expand="lg">
      <Container>
        <Navbar.Brand href="/landing" className='py-0 justify-end'>
          <img src="/VI.svg" alt="VI Logo" />
        </Navbar.Brand>
        <Navbar.Brand href="/" style={{ color: 'red' }}>Inventory</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Zone-Layout</Nav.Link>
            <Nav.Link href="/add-rack">Add-New-Rack</Nav.Link>
            <Nav.Link href="/landing">Suggest-Pallet-Zone</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/delete-rack">Sensor-Status</NavDropdown.Item>
              <NavDropdown.Item href="/dash">
                Site Trends
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">-NA-</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
               -NA-
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;