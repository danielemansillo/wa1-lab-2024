import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import * as icons from 'react-bootstrap-icons';

function FilmLibraryNavbar() {
    return (
        <Navbar className="navbar-dark" bg="primary" sticky="top">
            <Container>
                <Navbar.Brand href="#">
                    <icons.Film />
                    Film Library
                </Navbar.Brand>
                <Form inline="true">
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                            />
                        </Col>
                    </Row>
                </Form>
                <Navbar.Brand href="#">
                    <icons.PersonCircle />
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default FilmLibraryNavbar;