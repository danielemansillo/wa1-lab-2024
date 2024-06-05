import dayjs from 'dayjs';

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import Film from '../Film';

import { addFilm, updateFilm } from "../api/API"

function FilmForm(props) {
    const navigate = useNavigate();
    const [waiting, setWaiting] = useState(false);

    const films = props.films;
    const { filmId } = useParams();

    const film = films.filter((f) => (f.id == filmId))[0]

    const handleAddFilm = async (film) => {
        const response = await addFilm(film);
        const outcome = await response.json();
        return outcome
    };

    const handleUpdateFilm = async (film) => {
        const response = await updateFilm(film);
        const outcome = await response.json();
        return outcome
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setWaiting(true);

        if (film) {
            handleUpdateFilm(new Film(film.id, title, favorite, watchDate, Number(rating), film.user));
        } else {
            const newFilm = { title: title, isFavorite: favorite, watchDate: watchDate, rating: Number(rating), userId: 1 };
            handleAddFilm(newFilm);
        }

        setWaiting(false);

        navigate(-1);
    }

    const [title, setTitle] = useState(film ? film.title : "");
    const [favorite, setFavorite] = useState(film ? film.isFavorite == 1 : false);
    const [watchDate, setWatchDate] = useState(film ? film.watchDate && film.watchDate.split("T")[0] : "");
    const [rating, setRating] = useState(film ? film.rating : 0);


    return (
        waiting ? <p>waiting</p> : <Container>
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
                                value={rating} onChange={(event) => setRating(event.target.value)} />
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