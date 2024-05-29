// HTML imports
import 'bootstrap/dist/css/bootstrap.min.css';

// React imports
import { useState } from 'react';
import { Routes, Route, Outlet, Navigate, useRouteError } from "react-router-dom";
import Row from 'react-bootstrap/esm/Row';

// js imports
import dayjs from "dayjs";

// Components
import FilmLibraryNavbar from "./components/FilmLibraryNavbar";
import Filters from "./components/Filters";
import Films from "./components/Films";
import AddButton from './components/AddButton';
import FilmForm from './components/FilmForm';
import Container from 'react-bootstrap/esm/Container';

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}

function App() {
  const [films, setFilms] = useState([]);

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
