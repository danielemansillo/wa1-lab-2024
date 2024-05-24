import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import * as icons from 'react-bootstrap-icons';

import { useNavigate, useParams } from 'react-router-dom';

import dayjs from "dayjs";

import InvalidUrl from './InvalidUrl';

import Film from './Film';

function Films(props) {
    const navigate = useNavigate();

    let allFilms = props.films;
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

    let films;

    switch (filterId) {
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
        default:
            return <InvalidUrl />
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
                                    <input type="checkbox" className="form-check-input" checked={film.favourite} onClick={() => handleSwitchFavorite(film.id, film.favourite)} />
                                </div></td>
                                <td>{film.watchDate && film.watchDate.format("MMMM DD, YYYY")}</td>
                                <td>
                                    {Array.from({ length: 5 }, (_, index) => (
                                        index < film.score
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