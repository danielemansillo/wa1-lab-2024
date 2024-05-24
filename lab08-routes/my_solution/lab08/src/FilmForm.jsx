import dayjs from 'dayjs';

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import Film from './Film';

function FilmForm(props) {
    const navigate = useNavigate();
    const films = props.films;
    const setFilms = props.setFilms;
    const { filmId } = useParams();

    const film = films.filter((f) => (f.id == filmId))[0]

    const handleAddFilm = (film) => {
        setFilms((oldFilms) => {
            const newId = Math.max(...oldFilms.map(f => f.id)) + 1;
            const newFilm = new Film(newId, film.title, film.favourite, dayjs(film.watchDate), film.score, 1);
            return [...oldFilms, newFilm];
        });
    };

    const handleUpdateFilm = (film) => {
        setFilms(oldFilms => {
            return oldFilms.map((f) => {
                if (f.id === film.id) {
                    return new Film(film.id, film.title, film.favourite, dayjs(film.watchDate), film.score, film.user);
                }
                else
                    return f;
            });
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (film) {
            handleUpdateFilm(new Film(film.id, title, favorite, watchDate, score, film.user));
        } else {
            const newFilm = { title: title, favorite: favorite, watchDate: dayjs(watchDate), score: score };
            handleAddFilm(newFilm);
        }
        navigate(-1);
    }

    const [title, setTitle] = useState(film ? film.title : "");
    const [favorite, setFavorite] = useState(film ? film.favourite : false);
    const [watchDate, setWatchDate] = useState(film ? film.watchDate.format("YYYY-MM-DD") : "");
    const [score, setScore] = useState(film ? film.score : 0);


    return (
        <Container>
            <Row />
            <Form>
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
                            <Form.Control type="number" min="0" max="5" placeholder="Enter movie score from 0 to 5"
                                value={score} onChange={(event) => setScore(event.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>

                <Container className="text-center">
                    <Button type="submit" className="btn btn-primary me-1" onClick={(event) => handleSubmit(event)} >Submit</Button>
                    <Button type="reset" className="btn btn-danger" onClick={() => navigate(-1)}>Cancel</Button>
                </Container>
            </Form >
        </Container>
    );
}

export default FilmForm;