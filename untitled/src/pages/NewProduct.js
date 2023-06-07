import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function NewProduct() {
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	const [imageURL, setImageURL] = useState("");
	const [manufacturer, setManufacturer] = useState("");
	const [releaseDate, setReleaseDate] = useState("");
	const [validated, setValidated] = useState(false);

	const navigate = useNavigate();

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

	const handleSubmit = (event) => {
        axios.post("http://localhost:8000/products/products", [{
            name: productName,
			price: price,
			quantity: quantity,
			photos: imageURL,
			manufacturer: manufacturer,
			releaseDate: releaseDate
		}], {
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
        }).then(function (resp) {
            if (resp.status === 200) {
                console.log("Product created");
		        navigate("/products");
            }
        })
        event.preventDefault();
    };

	const updateProductName = (event) => {
        setProductName(event.target.value);
    }

	const updatePrice = (event) => {
        setPrice(event.target.value);
    }

	const updateQuantity = (event) => {
        setQuantity(event.target.value);
    }

	const updateImageURL = (event) => {
        setImageURL(event.target.value);
    }

	const updateManufacturer = (event) => {
		console.log(event.target.value);
        setManufacturer(event.target.value);
    }

	const updateReleaseDate = (event) => {
		console.log(event.target.value);
        setReleaseDate(event.target.value);
    }

  	return (
		<Container fluid as={"div"} className="vh-100 mt-5">
			<Card>
				<Card.Header>New product</Card.Header>
				<Card.Body>
					<Card.Title>Please fill the details of the new product</Card.Title>
					<br/>
					<Form noValidate validated={validated} onSubmit={handleSubmit}>
						<Row className="mb-3">
							<Form.Group as={Col} md="4" controlId="validationCustom01">
								<Form.Label>Product name</Form.Label>
								<Form.Control
									required
									type="text"
									placeholder="Name"
									defaultValue=""
									onChange={updateProductName}
								/>
								<Form.Control.Feedback type="invalid">Please input a valid name</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="4" controlId="validationCustom02">
								<Form.Label>Price</Form.Label>
								<Form.Control
									required
									type="text"
									placeholder="Price"
									defaultValue=""
									onChange={updatePrice}
								/>
								<Form.Control.Feedback type="invalid">Please input a valid price</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="4" controlId="validationCustomUsername">
								<Form.Label>Quantity</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										type="text"
										placeholder="Quantity"
										aria-describedby="inputGroupPrepend"
										required
										onChange={updateQuantity}
									/>
									<Form.Control.Feedback type="invalid">
									Please input a valid quantity
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Row>
						<Row className="mb-3">
							<Form.Group as={Col} md="6" controlId="validationCustom03">
								<Form.Label>Image URL</Form.Label>
								<Form.Control type="text" placeholder="URL" required onChange={updateImageURL}/>
								<Form.Control.Feedback type="invalid">
									Please provide a valid image URL
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="4" controlId="validationCustom04">
								<Form.Label>Manufacturer</Form.Label>
								<Form.Control type="text" placeholder="Manufacturer" required onChange={updateManufacturer}/>
								<Form.Control.Feedback type="invalid">
									Please provide a valid manufacturer
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="2" controlId="validationCustom05">
								<Form.Label>Release date</Form.Label>
								<Form.Control type="date" placeholder="Date" required onChange={updateReleaseDate}/>
								<Form.Control.Feedback type="invalid">
									Please provide a valid release date
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<br/>
						<Button size="md" variant="outline-primary" type="submit">Add new product</Button>
						</Form>
				</Card.Body>
			</Card>
		</Container>
	);
}