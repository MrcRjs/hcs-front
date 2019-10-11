import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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

    const handleCreateNewTask = async() => {
        return Auth.fetch('/tasks', {"method": "POST", "body": {title: newTask}})
            .then(res => {
                console.log(res);
                setNewTask('');
            })
            .catch(e => {
                console.log(e);
            });
    };


    useEffect(() => {
        if (!taskList) {
            Auth.fetch('/tasks', {"method": "GET"}).then(response => {
                handleTaskList(response.tasks);
            });
        }
    });

    const Tasks = !taskList || taskList.length === 0 ?
        <Container variant={"success"}><p>You don't have any tasks, create one!</p></Container> : taskList.map((t, i) => {
            return (
                <Card key={t._id}>
                    <p>{t.title}</p>
                </Card>);
        });
    return (
        <Container className={"Tasks"}>
            <Row>
                <Col sm={12} md={{span: 6, offset: 3}}>
                    <Container>{Tasks}</Container>
                    <Form.Group>
                        <Form.Label>Create new task</Form.Label>
                        <Form.Control type="text" placeholder="Task description" value={newTask} onChange={handleOnChangeNewTask} />
                    </Form.Group>
                    <Button onClick={handleCreateNewTask}>Create task</Button>
                </Col>
            </Row>
        </Container>
);
};

export default Tasks;
