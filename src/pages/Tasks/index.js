import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Fade from 'react-bootstrap/Fade'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import AuthService from '../../services/AuthService';


const Tasks = props => {

    const Auth = new AuthService('http://localhost:8080/api');

    const [taskList, setTaskList] = useState();
    const [newTask, setNewTask] = useState('');

    const handleTaskList = (tasklist) => {
        setTaskList(tasklist);
    };

    const handleOnChangeNewTask = (newDescription) => {
        setNewTask(newDescription.target.value);
    };

    const handleCreateNewTask = async () => {
        return Auth.fetch('/tasks', {"method": "POST", body: {title: newTask}})
            .then(res => {
                console.log(res);
                setNewTask('');
                setTaskList(res.tasks.reverse())
            })
            .catch(e => {
                console.log(e);
            });
    };


    useEffect(() => {
        if (!taskList) {
            Auth.fetch('/tasks', {"method": "GET"}).then(response => {
                handleTaskList(response.tasks.reverse());
            });
        }
    });

    let Tasks;
    if (!taskList) {
        Tasks = [1, 2].map(i => <Fade appear in key={i}><Card bg={'light'} text="muted" style={{marginBottom: '1rem'}}>
            <Card.Header>{"..."}</Card.Header><Card.Body></Card.Body></Card></Fade>);
    } else if (taskList.length === 0)
        Tasks = <Container variant={"success"}><p>You don't have any tasks, create one!</p></Container>;
    else {
        Tasks = taskList.map((t, i) => {
            return (
                <Fade appear in key={t._id}><Card bg={'light'} style={{marginBottom: '1rem'}}>
                    <Card.Header>
                        <Row className="justify-content-between align-items-center">
                            {new Date(t.created).toLocaleString()}
                            <ButtonGroup aria-label="Basic example">
                                <Button size={'sm'} variant="outline-primary">Edit</Button>
                                <Button size={'sm'} variant="outline-danger">Delete</Button>
                            </ButtonGroup>
                        </Row>
                    </Card.Header>
                    <Card.Body><Card.Text text={'primary'}><strong>{t.title}</strong></Card.Text></Card.Body>
                </Card></Fade>);
        });
    }
    return (
        <Container className={"Tasks"}>
            <Row>
                <Col sm={12} md={{span: 6, offset: 3}}>

                    {Tasks}
                    <hr/>
                    <Form>
                        <Form.Group>
                            <Form.Label>Create new task</Form.Label>

                            <Form.Control type="text" placeholder="Task description" value={newTask}
                                          onChange={handleOnChangeNewTask}/>

                        </Form.Group>

                        <Button variant="outline-primary" onClick={handleCreateNewTask}>Create task</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Tasks;
