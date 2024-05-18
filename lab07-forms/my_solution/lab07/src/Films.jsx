import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import * as icons from 'react-bootstrap-icons';

function Films(props) {
    const films = props.films;
    const handleModeUpdate = props.handleModeUpdate;

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
                                    <input type="checkbox" className="form-check-input" checked={film.favourite} readOnly />
                                </div></td>
                                <td>{film.watchDate && film.watchDate.format("MMMM DD, YYYY")}</td>
                                <td>
                                    {Array.from({ length: 5 }, (_, index) => (
                                        index < film.score ? <icons.StarFill key={index} /> : <icons.Star key={index} />
                                    ))}
                                </td>
                                <td>
                                    {/* <button type="button" class="btn btn-primary"><icons.Eye /></button> */}
                                    <button type="button" className="btn btn-success me-1" data-toggle="tooltip" data-placement="bottom" title="Modify"><icons.PencilSquare
                                        onClick={() => handleModeUpdate("update")} /></button>
                                    <button type="button" className="btn btn-danger" data-toggle="tooltip" data-placement="bottom" title="Delete"><icons.Trash /></button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </Col >
    );
}

export default Films;