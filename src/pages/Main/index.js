import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './index.scss'


const Main = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = emailText => setEmail(emailText.target.value);
    const handlePasswordChange = passwordText => setPassword(passwordText.target.value);
    const handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        // Handle login
    };
    return (
        <Container className={"Main container"}>
            <Row>
                <Col sm={12} md={{ span: 6, offset: 3 }}>
                    <h2>Check your tasks</h2>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={handleEmailChange} type="email" placeholder="Enter email" value={email}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={handlePasswordChange} type="password" placeholder="Password" value={password}/>
                        </Form.Group>
                        <Button variant="primary btn-block btn-lg" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Main
