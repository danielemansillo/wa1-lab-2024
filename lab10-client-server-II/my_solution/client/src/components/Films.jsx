import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import * as icons from 'react-bootstrap-icons';

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import dayjs from "dayjs";

import InvalidUrl from './InvalidUrl';

import Film from '../Film';

import { getAllFilms, getFavoriteFilms, getBestFilms, getLastMonthFilms, getUnseenFilms } from "../api/API"

function Films(props) {
    const navigate = useNavigate();

    const films = props.films;
    const setFilms = props.setFilms;
    const { filterId } = useParams();

    const handleDeleteFilm = (id) => {
        setFilms((oldFilms) => oldFilms.filter((f) => f.id !== id));
    };
    const handleSwitchFavorite = (id, oldFavorite) => {
        setFilms((oldFilms) => oldFilms.map((f) =>
            f.id !== id ? f : new Film(f.id, f.title, !oldFavorite, f.watchDate, f.score, f.user)
        ));
    };
    const handleChangeScore = (id, newScore) => {
        setFilms((oldFilms) => oldFilms.map((f) =>
            f.id !== id ? f : new Film(f.id, f.title, f.favourite, f.watchDate, newScore, f.user)
        ));
    };

    useEffect(() => {
        const fetchFilms = async () => {
            let my_films = [];
            switch (filterId) {
                case "all":
                    my_films = await getAllFilms();
                    break;
                case "favorite":
                    my_films = await getFavoriteFilms();
                    break;
                case "best_rated":
                    my_films = await getBestFilms();
                    break;
                case "seen_last_month":
                    my_films = await getLastMonthFilms();
                    break;
                case "unseen":
                    my_films = await getUnseenFilms();
                    break;
                default:
                    return <InvalidUrl />
            }
            setFilms(my_films);
        };
        fetchFilms();
    }, [filterId])

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
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        films.map(film =>
                            <tr key={film.id}>
                                <th scope="row">{film.id}</th>
                                <td>{film.title}</td>
                                <td><div className="form-check form-check-inline">
                                    <input type="checkbox" className="form-check-input" checked={film.isFavourite == 1} onChange={() => handleSwitchFavorite(film.id, film.favourite)} />
                                </div></td>
                                <td>{film.watchDate && film.watchDate.split("T")[0]}</td>
                                <td>
                                    {Array.from({ length: 5 }, (_, index) => (
                                        index < film.rating
                                            ? <icons.StarFill key={index} onClick={() => handleChangeScore(film.id, index + 1)} />
                                            : <icons.Star key={index} onClick={() => handleChangeScore(film.id, index + 1)} />
                                    ))}
                                </td>
                                <td>
                                    <button type="button" className="btn btn-success me-1" data-toggle="tooltip" data-placement="bottom" title="Modify"
                                        onClick={() => navigate("/edit/" + film.id)}><icons.PencilSquare /></button>
                                    <button type="button" className="btn btn-danger" data-toggle="tooltip" data-placement="bottom" title="Delete"
                                        onClick={() => handleDeleteFilm(film.id)}><icons.Trash /></button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </Col >
    );
}

export default Films;