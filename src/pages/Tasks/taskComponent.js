import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Fade from 'react-bootstrap/Fade'

const TaskComponent = props => {
    return (
        <Fade appear in key={props.task._id}><Card bg={'light'} style={{marginBottom: '1rem'}}>
            <Card.Header>
                <Row className="justify-content-between align-items-center">
                    {new Date(props.task.created).toLocaleString()}
                    <ButtonGroup aria-label="Basic example">
                        <Button size={'sm'} variant="outline-primary">Edit</Button>
                        <Button size={'sm'} variant="outline-danger"
                                onClick={() => props.handleDeleteTask(props.task._id)}>Delete</Button>
                    </ButtonGroup>
                </Row>
            </Card.Header>
            <Card.Body><Card.Text text={'primary'}><strong>{props.task.title}</strong></Card.Text></Card.Body>
        </Card></Fade>);
};

export default TaskComponent;