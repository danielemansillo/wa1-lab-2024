import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

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

export default Filters;