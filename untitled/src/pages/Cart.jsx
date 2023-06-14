import {React, useState, useEffect} from "react";
import {Button, Col, Container, Form, Row, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {faCheckSquare, faCoffee} from '@fortawesome/free-solid-svg-icons'
import {faPlus, faMinus, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import TableComponent from '../components/TableComponent';
import { useNavigate } from "react-router-dom";

export function Cart() {
    const kong_uri = process.env.REACT_APP_KONGURI;
    library.add(fab, faCheckSquare, faCoffee, faPlus, faMinus, faTrash)
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/products");
    };

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("cart")));
        setProducts(JSON.parse(localStorage.getItem("cart") ?? '[]'));
    }, []);
    
    const checkout = () => {
        let saleId = '';
        setIsLoading(true);
        axios.post(`http://${kong_uri}/sales/`,
            {
            id: 1,
            customer_id: localStorage.getItem("uId"),
            products: products.map(item => ({
                ...item,
                price: parseFloat(item.price)
            })),
            "payment_id": null,
            "amount": products.reduce((accumulator, prod) => accumulator + prod.price * prod.quantity, 0)

            },
            {
                headers: {
                    "Content-type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).catch(function (error) {
            if (error.status === 401) {
                alert("invalid Token");
                return;
            }
            if (error.status === 400) {
                console.log("There probably is a problem with the data body");
            } else console.log(error.response.data)
        }).then(function (resp) {
            if (resp.status === 201) {
                saleId = resp.data.url.split("/sales/")[1].split("/")[0];
                axios.post(`http://${kong_uri}/sales/checkout/${saleId}`, {
                    "successUrl": `${window.location.origin}/SuccessPage`,
                    "cancelUrl": `${window.location.origin}/FailedPage`,
                },{
                headers: {
                    "Content-type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(function (respChecout) {
                    setIsLoading(false);
                    if (respChecout.status === 200) {
                        setInterval(function (payment_link) {
                            window.location.href = payment_link;
                        }, 2000, respChecout.data.payment_link)

                    }
                })
            } else
                console.log(resp)
        })
    }

    return (
        <>
            {isLoading &&
                <div className="spinner"></div>
            }
            {isLoading ||
                <Container className={"justify-content-center mt-5"}>
                    {products.length > 0 && products.map((prod, idx) => (
                        <>
                            <div className="containerCenter">
                                <Card className="text-center">
                                    <Card.Header>Shopping cart</Card.Header>
                                    <Card.Body>
                                        <img width="25%" height="auto" src="https://media.istockphoto.com/id/871717684/pt/vetorial/shopping-cart-circle-icon-with-long-shadow-flat-design-style.jpg?s=612x612&w=0&k=20&c=V9ihaKHzIlqBlyI0kimB3Z04B9R_BfqcLHBN4iEXnz4="/>
                                        <br/>
                                        <TableComponent data={products} />
                                        <br/>
                                        <Button variant="primary" onClick={checkout}>Checkout</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </>
                    )) || 
                    <div className="containerCenter">
                        <Card className="text-center">
                            <Card.Header>Shopping cart</Card.Header>
                            <Card.Body>
                                <img width="25%" height="auto" src="https://media.istockphoto.com/id/871717684/pt/vetorial/shopping-cart-circle-icon-with-long-shadow-flat-design-style.jpg?s=612x612&w=0&k=20&c=V9ihaKHzIlqBlyI0kimB3Z04B9R_BfqcLHBN4iEXnz4="/>
                                <br/>
                                <Card.Title>Your cart is empty. Start browsing our shop to find amazing products!</Card.Title>
                                <br/>
                                <Button variant="primary" onClick={handleClick}>Continue shopping</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    }
                </Container>}
        </>
    )

}

