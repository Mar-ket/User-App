import {React, useState} from "react";
import {Container, Form, Row, Card, Button, Col} from "react-bootstrap";
import axios from "axios";
import './../App.css';

export function Signup() {

    const auth_api = process.env.REACT_APP_AUTHAPI;
    const kong_url = process.env.REACT_APP_KONGURI;
    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [nif, setNif] = useState("");
    const [user_email, setUser_Email] = useState("");
    const [user_password, setUser_Password] = useState("");

    const handleSubmit = (event) => {
        console.log("ola")
        const form = event.currentTarget;
        console.log(form.checkValidity())

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        setValidated(true);

        // create auth user

        let userId = "";
        axios.post(
            `http://${auth_api}/api/v1/signup`,
            {
                username: username,
                email: user_email,
                password: user_password,

                provider: "parse",
            },
            {
                headers: {
                    "Content-type": "application/json",
                }

            }
        ).catch(function (error) {
            if (error.status === 401){
                alert("invalid Token");
                return;
            }
            if (error.status === 400) {
                console.log("There probably is a problem with the data body");
            } else {
                console.log(error.response.data)
            }
        }).then(function (resp) {
            if (resp.status === 200) {
                localStorage.setItem("user", JSON.stringify(resp.data));
                localStorage.setItem("refresh_token", resp.data.refresh_token);
                localStorage.setItem("token", resp.data.token);
                userId = resp.data.id;
                axios.post(`http://${kong_url}/entities/entity`, {
                    "isPartner": 0,
                    "name": firstName + lastName,
                    "address": "",
                    "description": "",
                    "homePage": "",
                    "phoneNo": phoneNo,
                    "nif": nif,
                    "sku_list": '[]',
                    "externalID": resp.data.id
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                }
                ).catch(function (error) {
                    console.log("ERROR in entities")
                    if (error.status === 400) {
                        console.log("There probably is a problem with the data body");
                    } else
                        console.log(error.response.data)
                }).then(function (resp) {
                    axios.get(`http://${kong_url}/entities/entity/external/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                }).then(
                        function (respE) {
                            localStorage.setItem("username", respE.data.name);
                            window.location='/products'
                        }
                    )

                });
            }
        });
        if (userId === "") {

            event.preventDefault();
            event.stopPropagation();
            return;
        }
        // create entity user
        console.log("userId" + userId)

        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div className="containerCenter">
			<Card className="text-center">
				<Card.Header>Sign Up</Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="First Name">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={(event) => setFirstName(event.target.value)}
                                    placeholder="First name"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="LastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={(event) => setLastName(event.target.value)}
                                    placeholder="First name"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="Nif">
                                <Form.Label>NIF</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={(event) => setNif(event.target.value)}
                                    placeholder="123456789"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={(event) => setPhoneNo(event.target.value)}
                                    placeholder="96161616"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="Username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={(event) => setUsername(event.target.value)}
                                    placeholder="First name"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" placeholder="Enter email"
                                            onChange={(event) => setUser_Email(event.target.value)}/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                            onChange={(event) => setUser_Password(event.target.value)}/>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                                feedbackType="invalid"
                            />
                        </Form.Group>
                        <Button md={"2"} type="submit">Submit form</Button>
                    </Form>
                </Card.Body>
			</Card>
		</div>
    )
}
