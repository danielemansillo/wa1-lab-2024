import { act, useState } from 'react'
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import dayjs from 'dayjs';

import FilmLibrary from './FilmLibrary'
import Film from './Film'

import FilmLibraryNavbar from './FilmLibraryNavbar';
import Filters from "./Filters";
import Films from "./Films";
import AddButton from "./AddButton";

const FILM_LIBRARY = new FilmLibrary();

FILM_LIBRARY.addNewFilm(new Film(1, "Pulp Fiction", true, dayjs("2024-03-10"), 5, 1));
FILM_LIBRARY.addNewFilm(new Film(2, "21 Grams", true, dayjs("2024-03-17"), 4, 1));
FILM_LIBRARY.addNewFilm(new Film(3, "Star Wars", false, null, 0, 1));
FILM_LIBRARY.addNewFilm(new Film(4, "Matrix", false, null, 0, 1));
FILM_LIBRARY.addNewFilm(new Film(5, "Shrek", false, dayjs("2024-04-21"), 3, 1));

function MovieForm(props) {
  const mode = props.mode;
  const handleModeUpdate = props.handleModeUpdate;
  const handleAddFilm = props.handleAddFilm;
  const handleUpdateFilm = props.handleUpdateFilm;

  const [title, setTitle] = useState(props.film ? props.film.title : "");
  const [favorite, setFavorite] = useState(props.film ? props.film.favorite : false);
  const [watchDate, setWatchDate] = useState(props.film ? props.film.watchDate : "");
  const [score, setScore] = useState(props.film ? props.film.score : 0);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (props.film) {
      handleUpdateFilm(new Film(props.film.id, title, favorite, watchDate, score, props.film.user));
    } else {
      const newFilm = { title: title, favorite: favorite, watchDate: dayjs(watchDate), score: score };
      handleAddFilm(newFilm);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Row>
          <Col xs="12" sm="2"><Form.Label>Title</Form.Label></Col>
          <Col xs="12" sm="10">
            <Form.Control type="text" placeholder="Enter title" required
              value={title} onChange={(event) => setTitle(event.target.value)} />
          </Col>
        </Row>
      </Form.Group>
      <h1>{favorite}</h1>
      <Form.Group className="mb-3" controlId="formFavorite">
        <Row>
          <Col xs="12" sm="2"><Form.Label>Favorite</Form.Label></Col>
          <Col xs="12" sm="10">
            <Form.Check type="checkbox" label="Check if the movie is among the favorites"
              checked={favorite} onChange={(event) => setFavorite(event.target.checked)} />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formWatchDate">
        <Row>
          <Col xs="12" sm="2"><Form.Label>Watch Date</Form.Label></Col>
          <Col xs="12" sm="10">
            <Form.Control type="date" placeholder="Enter Watch Date"
              value={watchDate} onChange={(event) => setWatchDate(event.target.value)} />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formScore">
        <Row>
          <Col xs="12" sm="2"><Form.Label>Score</Form.Label></Col>
          <Col xs="12" sm="10">
            <Form.Control type="number" min="0" max="5" defaultValue={0} placeholder="Enter movie score from 0 to 5"
              value={score} onChange={(event) => setScore(event.target.value)} />
          </Col>
        </Row>
      </Form.Group>

      <Container className="text-center">
        {mode === "add" && <Button type="submit" className="btn btn-primary me-1">Add</Button>}
        {mode === "update" && <Button type="submit" className="btn btn-primary me-1">Update</Button>}
        <Button type="reset" className="btn btn-danger" onClick={() => handleModeUpdate("default")}>Cancel</Button>
      </Container>
    </Form >
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [allFilms, setAllFilms] = useState(FILM_LIBRARY.films);
  const [mode, setMode] = useState("default"); // Can be "default", "add", "update"

  const handleFilterClick = (newFilter) => { setActiveFilter(newFilter) };

  const handleAddFilm = (film) => {
    setAllFilms((oldFilms) => {
      const newId = Math.max(...oldFilms.map(f => f.id)) + 1;
      const newFilm = new Film(newId, film.title, film.favourite, film.watchDate, film.score, 1);
      return [...oldFilms, newFilm];
    })
  };
  const handleUpdateFilm = (film) => {
    setAllFilms(oldFilms => {
      return oldFilms.map((f) => {
        // f.id === film.id ? new Film(film.id, film.title, film.favourite, film.watchDate, film.score, film.user) : f
        if (f.id === film.id) {
          return new Film(film.id, film.title, film.favourite, film.watchDate, film.score, film.user);
        }
        else
          return f;
      });
    });
  }

  const handleModeUpdate = (newMode) => { setMode(newMode) };

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
    <>
      <FilmLibraryNavbar />
      <Container>
        <Row>
          <Filters handleFilterClick={handleFilterClick} />
          <Films films={films} handleModeUpdate={handleModeUpdate} />
        </Row>
        {mode === "add" && <MovieForm mode={mode} handleModeUpdate={handleModeUpdate} handleAddFilm={handleAddFilm} />}
        {mode === "update" && <MovieForm mode={mode} handleModeUpdate={handleModeUpdate} handleUpdateFilm={handleUpdateFilm} />}
      </Container>
      {mode === "default" && <AddButton mode={mode} handleModeUpdate={handleModeUpdate} />}
    </>
  );
}

export default App
