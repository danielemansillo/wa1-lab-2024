import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

function AddButton() {
    const navigate = useNavigate()

    return (
        <Button className="btn btn-primary rounded-circle btn-lg"
            data-toggle="tooltip" data-placement="left" title="Add a movie"
            onClick={() => navigate("/add")}
            style={{ position: "fixed", bottom: "10px", right: "10px" }}>+</Button>
    );
}

export default AddButton;