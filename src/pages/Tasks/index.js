import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import AuthService from '../../services/AuthService';


const Tasks = props => {

    const Auth = new AuthService('http://localhost:8080/api');

    const [taskList, setTaskList] = useState([]);

    const handleTaskList = (tasklist) => {
        setTaskList(tasklist);
    };
    useEffect(() => {
        Auth.fetch('http://localhost:8080/api/tasks',{"type": "GET"}).then(response => {
            handleTaskList(response.tasks);
        });
    });

    const TaskS = taskList.map((t, i) => {
        return (
            <Card key={t._id}>
                <p>{t.title}</p>
            </Card>);
    });
    return (
        <Container className={"Tasks"}>
            <Row>
                <Col sm={12} md={{span: 6, offset: 3}}>
                    <Container>{TaskS}</Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Tasks;
