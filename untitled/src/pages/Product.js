import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Form, Container, Carousel, Row, Col, Modal} from "react-bootstrap";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCartPlus, faEdit} from '@fortawesome/free-solid-svg-icons'
import {faS} from "@fortawesome/free-solid-svg-icons";
import {LinkContainer} from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";


export function Product() {
    const {id} = useParams();
    const [newLink, setNewLink] = useState("");
    const [product, setProduct] = useState({})
    const [show, setShow] = useState(false);
    library.add(faS, faEdit, faCartPlus);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNewLink = (event) => {
        setNewLink(event.currentTarget.value);
    }
    const [isAdmin, setIsAdmin] = useState(false);

    const handleAddLink = (event) => {
        product.photos.push(newLink);
        setShow(false);
        event.preventDefault();
    }


    useEffect(() => {
        console.log("ola")
        setIsAdmin(true); // make call to entities service
        axios.get(`http://localhost:8000/products/product/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(function (resp) {
            if (404 === resp)
                console.log("Not Found");
            if (resp.status === 200) {
                setProduct(resp.data)
            }

        }).catch(function (error) {

            if (error.status === 401){
                alert("invalid Token");
                return;
            }
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
    }, [id])

    const updatePrice = (event) => {
        setProduct({...product, price: event.target.value});
    }

    const updateQuantity = (event) => {
        setProduct({...product, quantity: event.target.value});
    }
    const updateName = (event) => {
        setProduct({...product, name: event.target.value});
        console.log(event.target.value)
    }

    const addProduct = (event) => {
        event.stopPropagation();
        event.preventDefault()
        const button = event.target.closest('button');
        let idList = "cart" in localStorage ? JSON.parse(localStorage.getItem("cart")) : [];

        idList.map((p) => p.id).includes(button.dataset["mkId"]) === false ? idList.push({
            id: button.dataset["mkId"],
            quantity: 1,
            name: button.dataset["mkName"]
        }) : console.log();

        localStorage.setItem("cart", JSON.stringify(idList))
        window.dispatchEvent(new Event('storage'));
        console.log(idList)
    };

    return (
        <>
            <Container fluid className={"justify-content-center p-3"}>
                <Row>
                    <Col>Product Details Page</Col>
                    {isAdmin &&
                            <Col className={"text-end"}>
                                <LinkContainer to={`/productadmin/${id}`}>
                                    <FontAwesomeIcon size={"2x"} icon="fas fa-edit"/>
                                </LinkContainer>
                            </Col>
                    }
                </Row>

                <Row className={"justify-content-center align-items-center"} >
                    <Col lg={3} md={3}>
                    </Col>
                    <Col sm={12} lg={6} md={6}>
                        <Carousel>
                            {product.photos && product.photos.map((photo, idx) => (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={photo.replaceAll("\"","")}
                                        alt={"Photo " + idx}/>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                    <Col lg={3} md={3}>
                    </Col>
                </Row>

                <Form className={"justify-content-center"}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter ID" value={product.id} readOnly={true}/>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" value={product.name}
                                      onChange={updateName} readOnly={true}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" value={product.quantity} readOnly={true}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" value={product.price} readOnly={true}/>
                    </Form.Group>

                    <Container className={"p-1 m-auto"}>
                        <Row xl={6} sm={2} lg={6}
                             className={"justify-content-center align-items-center text-center g-4"}>
                            <Col lg={1} sm={5} md={3} className={"p-2 m-1 overflow-hidden"}>
                            </Col>
                        </Row>
                    </Container>

                    <Row className={"justify-content-center align-items-center text-center  g-4"}>
                        <Col>
                            <Button variant="primary" data-mk-id={id} onClick={addProduct}>
                                <FontAwesomeIcon icon="fas fa-cart-plus" className={"text-light"}/> Buy
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    )
        ;

}
