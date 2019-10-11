import React, {useState} from 'react';
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Fade from 'react-bootstrap/Fade'
import Form from 'react-bootstrap/Form'

const TaskComponent = props => {
    const [editMode, setEditMode] = useState(false);
    const [taskTitle, setTaskTitle] = useState(props.task !== undefined ? props.task.title : '');

    const handleOnEditTask = (e) => {
        setTaskTitle(e.target.value);
    };

    const handleDoneEdit = () => {
        props.handleEditTask(props.task._id, taskTitle).then(r => {
            console.log(r);
        });

    };

    if (props.loading) {
        return (<Fade appear in><Card bg={'light'} text="muted" style={{marginBottom: '1rem'}}>
            <Card.Header>{"..."}</Card.Header><Card.Body/></Card></Fade>)
    }
    if (editMode) {
        return (<Fade appear in key={props.task._id}><Card bg={'light'} style={{marginBottom: '1rem'}}>
                <Card.Header>
                    <Row className="justify-content-between align-items-center">
                        {new Date(props.task.created).toLocaleString()}
                        <ButtonGroup aria-label="Basic example">
                            <Button size={'sm'} variant="success" onClick={handleDoneEdit}>Done</Button>
                            <Button size={'sm'} variant="danger"
                                    onClick={() => {setEditMode(false); setTaskTitle(props.task.title)}}>Cancel</Button>
                        </ButtonGroup>
                    </Row>
                </Card.Header>
                <Card.Body>
                        <Form>
                            <Form.Control type="text" placeholder="Task description" value={taskTitle}
                                          onChange={handleOnEditTask}/>
                        </Form>
                </Card.Body>
            </Card></Fade>
        );
    } else {
        return (
            <Fade appear in key={props.task._id}><Card bg={'light'} style={{marginBottom: '1rem'}}>
                <Card.Header>
                    <Row className="justify-content-between align-items-center">
                        {new Date(props.task.created).toLocaleString()}
                        <ButtonGroup aria-label="Basic example">
                            <Button size={'sm'} variant="outline-primary" onClick={()=>setEditMode(true)}>Edit</Button>
                            <Button size={'sm'} variant="outline-danger"
                                    onClick={() => props.handleDeleteTask(props.task._id)}>Delete</Button>
                        </ButtonGroup>
                    </Row>
                </Card.Header>
                <Card.Body><Card.Text text={'primary'}><strong>{taskTitle}</strong></Card.Text></Card.Body>
            </Card></Fade>);
    }
};

export default TaskComponent;