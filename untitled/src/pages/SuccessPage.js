import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import './../App.css';

export function  SuccessPage () {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/products");
    };

    const clearCart = () => {
        localStorage.removeItem("cart");
    };

    clearCart();

    return (
        <div className="containerCenter">
            <Card className="text-center">
                <Card.Header>Payment completed</Card.Header>
                <Card.Body>
                    <Card.Title>Your request has been processed successfully!</Card.Title>
                    <img src="https://img.freepik.com/premium-vector/success-payment-hand-illustration-flat-style-approved-money-vector-illustration-isolated-background-successful-pay-sign-business-concept_157943-6857.jpg?w=200"/>
                    <Card.Text>
                    Thanks for shopping with us! Feel free to continue browsing our store for additional products that catch your eye.
                    </Card.Text>
                    <Button variant="primary" onClick={handleClick}>Continue shopping</Button>
                </Card.Body>
            </Card>
        </div>
    );
}
