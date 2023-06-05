import {React, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import axios from 'axios';
import Authservice from "../services/authservice";

const AUTH_API = 'http://localhost:5000';
const ENTITIES_API = 'http://localhost:8000/entities';

export function Login() {
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


    return (<Container>
        <Form onSubmit={(event) => login_user(event)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter email"
                              onChange={(event) => setUser_Email(event.target.value)}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                              onChange={(event) => setUser_Password(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Keep me logged in"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </Container>);
}
