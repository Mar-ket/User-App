import Container from "react-bootstrap/Container";
import {Button, Card, FloatingLabel, Col, Form, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faS} from "@fortawesome/free-solid-svg-icons";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";


export function Products() {
const api_url = process.env.REACT_APP_KONGURI;
    const [searchQuery, setSearchQuery] = useState("");
    const [offset, setOffset] = useState("");
    const [page, setPage] = useState("");
    const [searchLimit, setSearchLimit] = useState(10);
    const [searchProducts, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});

    const instance = axios.create({
        // set other configuration options as needed
        headers: {
            // remove the Host header
            // note: you may need to also remove other default headers depending on your use case
            common: {
                ...axios.defaults.headers.common,
            }
        }
    });

    useEffect(() => {
        console.log("ola")
        library.add(faS,faCartPlus);
        axios.get(`http://${api_url}/product`, {
            params: {
                'searchQuery': searchQuery,
                'limit': searchLimit,
                'page': page,
                'offset': offset
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).catch(function (error) {
            if(error.response.status == 401)
                window.alert("Login")
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
            return;
        }).then(function (resp) {
            console.log(resp);
            if (resp.status === 200) {
                setProducts(resp.data.products);
                setPagination(resp.data.pagination)
            }
        })
        return () => {library.reset()}
    }, [])

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        //setSearchQuery(event.currentTarget.)
        axios.get(`http://${api_url}/product`, {
            params: {
                'searchName': searchQuery,
                'limit': searchLimit,
                'page': page,
                'offset': offset
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).catch(function (error) {
            if (error.status === 401){
                window.alert("invalid Token");
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
            return;
            console.log(error.config);
        }).then(function (resp) {
            if (resp.status === 200) {
                setProducts(resp.data.products);
                setPagination(resp.data.pagination)
            }
        })
        event.preventDefault();
    };

    const handleSelect = (e) => {
        console.log(e.currentTarget.value);
        setSearchLimit(e.target.value);

    }

    const updateSearchQuery = (event) => {
        console.log(event.target.value);
        setSearchQuery(event.target.value);
    }

    function addToCart(event) {
        event.preventDefault();
        const button = event.target.closest('button');
        const itemId = button.dataset["mkId"];
        const itemName = button.dataset["mkName"];
        const itemPrice = button.dataset["mkPrice"];
      
        let idList = "cart" in localStorage ? JSON.parse(localStorage.getItem("cart")) : [];
      
        const existingItem = idList.find((item) => item.id === itemId);
        if (existingItem) {
          // If the item already exists in the cart, increment the quantity
          existingItem.quantity += 1;
        } else {
          // If the item doesn't exist in the cart, add it as a new item
          idList.push({
            id: itemId,
            quantity: 1,
            name: itemName,
            price: itemPrice
          });
        }
      
        localStorage.setItem("cart", JSON.stringify(idList));
        window.dispatchEvent(new Event('storage'));
        console.log(idList);
      }

    return (
        <Container fluid as={"div"} className="vh-100 mt-5">
            <Card>
                <Card.Header>Search filters</Card.Header>
                <Card.Body>
                    <Card.Title>Please use the filters to find your product</Card.Title>
                    <br/>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className={"mb-2"}>
                        <Row className="g-2">
                            <Col md>
                                <Form.Group className="mb-3" controlId="SearchForm">
                                    <FloatingLabel controlId="SearchForm" label="Search">
                                        <Form.Control type="text" onChange={updateSearchQuery} placeholder="Search"/>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className="mb-3" controlId={"searchlimit"}>
                                    <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Display items"
                                    >
                                        <Form.Select aria-label="Display Items" controlId={"searchlimit"} defaultChecked={searchLimit}
                                                    onChange={handleSelect}>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Button size="lg" variant="outline-primary" type="submit">Search</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <br/>
            <Card>
                <Card.Header>Products</Card.Header>
                <Card.Body>
                    <Row className="h-100">
                        <Col className={"text-center overflow-scroll"} md={9} lg={9}>
                            <Container fluid className={"w-100"}>
                                <Row xs={1} md={2} lg={3} className="g-4">
                                    {searchProducts.length > 0 && searchProducts.map((p, idx) => (
                                        <Col>
                                            <LinkContainer to={`/Products/${p.id}`}>
                                                <Card className={"h-100 "}>
                                                    <Card.Img variant="top" src={p.photos}/>
                                                    <Card.Body>
                                                        <Card.Title>{p.name}</Card.Title>
                                                        <Container className={"d-flex align-items-center justify-content-center m-auto"}>
                                                            <Card.Text className={"m-auto text-center"}>
                                                                {p.price} €  
                                                            </Card.Text>
                                                            <Button variant={"light"} className={"align-self-end"}  onClick={addToCart} data-mk-price={p.price}  data-mk-id={p.id} data-mk-name={p.name}><FontAwesomeIcon icon="fas fa-cart-plus" className={"text-primary"} /></Button>
                                                        </Container>
                                                    </Card.Body>
                                                </Card>
                                            </LinkContainer>
                                        </Col>
                                    )) || <Container> There are no Products to show!</Container>}
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}
