import { act, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Film as FilmIcon, PersonCircle, Star, StarFill } from 'react-bootstrap-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import dayjs from 'dayjs';
import FilmLibrary from './FilmLibrary'
import Film from './Film'

const FILM_LIBRARY = new FilmLibrary();

FILM_LIBRARY.addNewFilm(new Film(1, "Pulp Fiction", true, dayjs("2024-03-10"), 5, 1));
FILM_LIBRARY.addNewFilm(new Film(2, "21 Grams", true, dayjs("2024-03-17"), 4, 1));
FILM_LIBRARY.addNewFilm(new Film(3, "Star Wars", false, null, 0, 1));
FILM_LIBRARY.addNewFilm(new Film(4, "Matrix", false, null, 0, 1));
FILM_LIBRARY.addNewFilm(new Film(5, "Shrek", false, dayjs("2024-04-21"), 3, 1));


function FilmLibraryNavbar() {
  return (
    <Navbar className="navbar-dark" bg="primary" sticky="top">
      <Container>
        <Navbar.Brand href="#">
          <FilmIcon />
          Film Library
        </Navbar.Brand>
        <Form inline>
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
          <PersonCircle />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

function Filters(props) {
  const handleFilterClick = props.handleFilterClick

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="all">
      <Col xs="4">
        <h3>Filters</h3>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link eventKey="all" onClick={() => handleFilterClick("all")} >All</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="favorite" onClick={() => handleFilterClick("favorite")} >Favorite</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="best_rated" onClick={() => handleFilterClick("best_rated")} >Best rated</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="seen_last_month" onClick={() => handleFilterClick("seen_last_month")} >Seen last month</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="unseen" onClick={() => handleFilterClick("unseen")} >Unseen</Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
    </Tab.Container>
  );
}

function Films(props) {
  const allFilms = props.films;
  const activeFilter = props.activeFilter;
  let films;

  switch (activeFilter) {
    case "all":
      films = allFilms;
      break;
    case "favorite":
      films = allFilms.filter(film => film.favourite);
      break;
    case "best_rated":
      films = allFilms.filter(film => film.score == 5)
      break;
    case "seen_last_month":
      films = allFilms.filter(film => {
        const differenceInDays = dayjs().diff(film.watchDate, "day");
        return differenceInDays >= 0 && differenceInDays <= 30;
      });
      break;
    case "unseen":
      films = allFilms.filter(film => film.watchDate == null);
      break;
  }

  return (
    <Col xs="8">
      <h2>All Movies</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Favorite</th>
            <th scope="col">Watch Date</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {
            films.map(film =>
              <tr key={film.id}>
                <th scope="row">{film.id}</th>
                <td>{film.title}</td>
                <td><div className="form-check form-check-inline">
                  <input type="checkbox" className="form-check-input" checked={film.favourite} readOnly />
                </div></td>
                <td>{film.watchDate && film.watchDate.format("MMMM DD, YYYY")}</td>
                <td>
                  {Array.from({ length: 5 }, (_, index) => (
                    index < film.score ? <StarFill key={index} /> : <Star key={index} />
                  ))}
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </Col>
  );
}


function AddButton() {
  return (
    <Button className="btn btn-primary rounded-circle btn-lg"
      style={{ position: 'fixed', bottom: '10px', right: '10px' }}>+</Button>
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (newFilter) => { setActiveFilter(newFilter) };

  return (
    <>
      <FilmLibraryNavbar />
      <Container>
        <Row>
          <Filters handleFilterClick={handleFilterClick} />
          <Films films={FILM_LIBRARY.films} activeFilter={activeFilter} />
        </Row>
      </Container>
      <AddButton />
    </>
  );
}

export default App
