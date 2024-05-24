import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import { useNavigate, useParams } from 'react-router-dom';

import InvalidUrl from './InvalidUrl';

function Filters() {
    const navigate = useNavigate();

    const { filterId } = useParams();

    const filters_text = [
        // [filter Id, filter Text]
        ["all", "All"],
        ["favorite", "Favorite"],
        ["best_rated", "Best rated"],
        ["seen_last_month", "Seen last month"],
        ["unseen", "Unseen"],
    ]

    if (!filters_text.map(([key, value]) => key).includes(filterId)) {
        return <InvalidUrl />
    }

    return (
        <Tab.Container id="left-tabs-example" activeKey={filterId}>
            <Col xs="4">
                <h3>Filters</h3>
                <Nav variant="pills" className="flex-column">
                    {
                        filters_text.map(([key, value]) =>
                            <Nav.Item key={key}>
                                <Nav.Link eventKey={key} onClick={() => navigate("/" + key)} >{value}</Nav.Link>
                            </Nav.Item>
                        )
                    }
                </Nav>
            </Col>
        </Tab.Container>
    );
}

export default Filters;