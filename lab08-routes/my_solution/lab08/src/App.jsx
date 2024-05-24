// HTML imports
import 'bootstrap/dist/css/bootstrap.min.css';

// React imports
import { useState } from 'react';
import { Routes, Route, Outlet, Navigate, useRouteError } from "react-router-dom";
import Row from 'react-bootstrap/esm/Row';

// js imports
import dayjs from "dayjs";

// Components
import FilmLibraryNavbar from "./FilmLibraryNavbar";
import Filters from "./Filters";
import Films from "./Films";
import AddButton from './AddButton';
import FilmForm from './FilmForm';

// js Objects
import Film from './Film';
import FilmLibrary from './FilmLibrary';
import Container from 'react-bootstrap/esm/Container';

const FILM_LIBRARY = new FilmLibrary();

FILM_LIBRARY.addNewFilm(new Film(1, "Pulp Fiction", true, dayjs("2024-03-10"), 5, 1));
FILM_LIBRARY.addNewFilm(new Film(2, "21 Grams", true, dayjs("2024-03-17"), 4, 1));
FILM_LIBRARY.addNewFilm(new Film(3, "Star Wars", false, null, 0, 1));
FILM_LIBRARY.addNewFilm(new Film(4, "Matrix", false, null, 0, 1));
FILM_LIBRARY.addNewFilm(new Film(5, "Shrek", false, dayjs("2024-04-21"), 3, 1));

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}

function App() {
  const [films, setFilms] = useState(FILM_LIBRARY.films);

  return (
    <>
      <FilmLibraryNavbar />
      <Routes>
        <Route path='/' element={<Outlet />}>
          <Route index element={<Navigate to="/all" />} />
          <Route path=':filterId' element={
            <>
              <Container>
                <Row>
                  <Filters />
                  <Films films={films} setFilms={setFilms} />
                </Row>
              </Container>
              <AddButton />
            </>
          } />
          <Route path='add' element={<FilmForm films={films} setFilms={setFilms} />} />
          <Route path='edit/:filmId' element={<FilmForm films={films} setFilms={setFilms} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
