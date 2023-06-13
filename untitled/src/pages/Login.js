import {React, useState} from "react";
import {Button, Card, Form, Row, Col} from "react-bootstrap";
import axios from 'axios';
import Authservice from "../services/authservice";
import './../App.css';

export function Login() {

    const AUTH_API = `http://${process.env.REACT_APP_AUTHAPI}`;
    const ENTITIES_API = `http://${process.env.REACT_APP_KONGURI}/entities`;
    const authservice = new Authservice(AUTH_API, ENTITIES_API);
    const [user_email, setUser_Email] = useState("");
    const [user_password, setUser_Password] = useState("");

    const login_user = (event) => {
        event.preventDefault();
        authservice.login(user_email, user_password, "parse").then(function (uid) {
                if (uid) {
                    window.dispatchEvent(new Event('storage'));
                    window.location = '/products'
                }
            }
        )
    }


    return (
        <div className="containerCenter">
            <Card className="text-center">
				<Card.Header>Sign In</Card.Header>
                <Card.Body>
                <img src="https://cdn.pixabay.com/animation/2022/12/01/17/03/17-03-11-60_512.gif"/>
                    <Form onSubmit={(event) => login_user(event)}>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                            <Form.Label column sm={2}>Email address</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" placeholder="Enter email"
                                            onChange={(event) => setUser_Email(event.target.value)}/>
                            </Col>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm={2}>Password</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="password" placeholder="Password"
                                            onChange={(event) => setUser_Password(event.target.value)}/>
                            </Col>
                        </Form.Group>

                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
