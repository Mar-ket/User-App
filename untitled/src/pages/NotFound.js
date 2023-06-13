import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './../App.css';

export function NotFound() {
  return (
    <div className="containerCenter">
        <Card className="text-center">
            <Card.Header>Page not found</Card.Header>
            <Card.Body>
                <Card.Title>Oopsie Woopsie! 404 Error!</Card.Title>
                <img src="https://i.pinimg.com/originals/dc/66/12/dc66127855a21ffdec5acd6f2193d3f0.gif"/>
                <Card.Text>
                  Looks like you've stumbled into the void of the interwebs. The page you seek has taken an impromptu vacation to a parallel universe.
                  In the meantime, why not enjoy a cup of virtual tea and contemplate the mysteries of the digital realm?
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
  );
}