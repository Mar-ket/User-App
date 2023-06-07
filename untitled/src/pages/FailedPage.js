
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import './../App.css';

export function  FailedPage () {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/cart");
    };
    
    return (
        <div className="containerCenter">
            <Card className="text-center">
                <Card.Header>Payment failed</Card.Header>
                <Card.Body>
                    <Card.Title>We were unable to process your payment.</Card.Title>
                    <img src="https://img.freepik.com/free-icon/credit-card_318-571079.jpg"/>
                    <Card.Text>
                    Contact your payment provider for further details, check the card details or enter another card.
                    If the problem persists, please try again later.
                    </Card.Text>
                    <Button variant="primary" onClick={handleClick}>Try again</Button>
                </Card.Body>
            </Card>
        </div>
    );
}
