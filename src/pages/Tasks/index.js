import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Task from "./taskComponent";

import AuthService from '../../services/AuthService';


const Tasks = props => {

    const Auth = new AuthService('http://localhost:8080/api');

    const [taskList, setTaskList] = useState(null);
    const [newTask, setNewTask] = useState('');

    const handleTaskList = (tl) => {
        setTaskList(tl);
    };

    const handleOnChangeNewTask = (newDescription) => {
        setNewTask(newDescription.target.value);
    };

    const handleSubmitTask = async e => {
        e.preventDefault();
        return await handleCreateNewTask();
    };

    const handleCreateNewTask = async () => {
        return await Auth.fetch('/tasks', {"method": "POST", body: {title: newTask}})
            .then(res => {
                setNewTask('');
                setTaskList(res.tasks.reverse());
            })
            .catch(e => {
                console.log(e);
                setNewTask('');
            });
    };

    const handleDeleteTask = async (index) => {
        return Auth.fetch('/tasks',{"method": "DELETE", body: {index}})
            .then(res => {
                setTaskList(res.tasks.reverse())
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleEditTask = async (index, title) => {
        return Auth.fetch('/tasks',{"method": "PATCH", body: {index, title}})
            .then(res => {
                setTaskList(res.tasks.reverse())
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if(!Auth.loggedIn()){
            props.history.replace('/');
        }
        else if (!taskList) {
            Auth.fetch('/tasks', {"method": "GET"})
                .then(res => {
                handleTaskList(res.tasks.reverse());

            }).catch(e => {
                console.log(e);
            });
        }
    });

    let Tasks = null;
    if (!taskList) {
        Tasks = [1, 2].map(i => <Task key={i} loading/>);
    } else if (taskList.length === 0) {
        Tasks = <Container variant={"success"}><p className={'text-muted'}>You don't have any tasks, create one!</p>
        </Container>;
    }
    else {
        Tasks = taskList.map((t) => <Task key={t._id} task={t} handleDeleteTask = {handleDeleteTask} handleEditTask={handleEditTask}/>);
    }
    return (
        <Container className={"Tasks"}>
            <Row>
                <Col sm={12} md={{span: 6, offset: 3}}>
                    <Form onSubmit={ handleSubmitTask }>
                        <Form.Group>
                            <Form.Label><strong>Create new task</strong></Form.Label>

                            <Form.Control type="text" placeholder="Task description" value={newTask}
                                          onChange={handleOnChangeNewTask}/>
                        </Form.Group>

                        <Button variant="outline-primary" onClick={handleCreateNewTask}>Create task</Button>
                    </Form>
                    <hr/>
                    {Tasks}
                </Col>
            </Row>
        </Container>
    );
};

export default Tasks;
