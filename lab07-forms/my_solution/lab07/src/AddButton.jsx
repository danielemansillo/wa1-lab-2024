import Button from 'react-bootstrap/Button';

function AddButton(props) {
    const mode = props.mode;
    const handleModeUpdate = props.handleModeUpdate;

    const visibility = mode === "default" ? "visible" : "invisible"
    const classes = "btn btn-primary rounded-circle btn-lg " + visibility

    return (
        <Button className={classes}
            data-toggle="tooltip" data-placement="left" title="Add a movie"
            onClick={() => handleModeUpdate("add")}
            style={{ position: 'fixed', bottom: '10px', right: '10px' }}>+</Button>
    );
}

export default AddButton;