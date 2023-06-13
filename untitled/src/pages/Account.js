import {Card, Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import './../App.css';

export function Account() {


    const api_url = process.env.REACT_APP_KONGURI;
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [nif, setNif] = useState("");

    useEffect(() => {
        let userId = localStorage.getItem("uId");

        axios.get(`http://${api_url}/entities/entity/${userId}`).then(function (resp) {
            console.log(resp);
            setPhoneNo(resp.data.phoneNo);
            setNif(resp.data.nif);
            setValidated(resp.data.isPartner === "1")
            setName(resp.data.name);

        })
    },)

    return (
        <div className="containerCenter">
			<Card className="text-center">
				<Card.Header>Account</Card.Header>
                <Card.Body>
                    <img src="https://cliply.co/wp-content/uploads/2020/08/442008112_GLANCING_AVATAR_3D_400px.gif"/>
                        <Form className={"justify-content-center"}>
                            <Form.Group as={Row} className="mb-3" controlId="formName">
                                <Form.Label column sm={2}>First Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="Enter name" value={name}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPhoneNumber">
                                <Form.Label column sm={2}>Phone Number</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="Enter phone number" value={phoneNo}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}className="mb-3" controlId="formNIF">
                                <Form.Label column sm={2}>NIF</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="Enter NIF" value={nif}/>
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Check type={"checkbox"} id={`isValidated`}>
                                    <Form.Check.Input type={"checkbox"} defaultChecked={validated} disabled={true}
                                                    aria-disabled={true}
                                                    aria-label={"You cannot assign yourself to be a partner"}/>
                                    <Form.Check.Label>{`Partner`}</Form.Check.Label>
                                </Form.Check>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    <Row className="justify-content-center text-center">
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );

}
