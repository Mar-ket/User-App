import {Badge, Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";

export function Account() {


    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [nif, setNif] = useState("");

    useEffect(() => {
        let userId = localStorage.getItem("uId");

        axios.get(`http://localhost:8000/entities/entity/${userId}`).then(function (resp) {
            console.log(resp);
            setPhoneNo(resp.data.phoneNo);
            setNif(resp.data.nif);
            setValidated(resp.data.isPartner === "1")
            setName(resp.data.name);

        })
    },)


    return (
        <Container fluid className={"justify-content-center p-3"}>
            <Row>
                <Form className={"justify-content-center"}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" value={name}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" value={"ola"}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>NIF</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" value={nif}/>
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
            </Row>
            <Row className="justify-content-center text-center">
                <Col></Col>
                <Col></Col>
            </Row>
        </Container>
    );

}