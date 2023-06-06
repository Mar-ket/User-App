import { Card } from 'react-bootstrap';
import { CardGroup } from 'react-bootstrap';
import { Container } from "react-bootstrap";

export function Home() {
  return (
    <Container>
      <Card border="light" className="bg-dark text-white">
        <Card.Img src="https://img.freepik.com/premium-vector/marketplace-retail-business-online-shopping-concept-male-female-characters-use-digital-devices-shopping-purchasing-internet-poster-banner-flyer-cartoon-people-vector-illustration_87771-14516.jpg?w=1800" alt="Card image" />
      </Card>
      <br/>
      <CardGroup>
      <Card>
        <Card.Img variant="top" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/free-shipping-logo-design-template-96f52adbef793c11eca83626192b2ecc_screen.jpg?ts=1615783164" />
        <Card.Body>
          <Card.Title>Free shiping</Card.Title>
          <Card.Text>
            Free shiping for purchases above 50€!
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src="https://static.vecteezy.com/system/resources/previews/003/099/769/original/gold-sign-label-template-free-vector.jpg" />
        <Card.Body>
          <Card.Title>Top Quality</Card.Title>
          <Card.Text>
            We ensure that our products have the best quality possible.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src="https://img.freepik.com/premium-vector/100-secure-logo-secure-badge-design-secure-vector-icons-secure-payments_526569-743.jpg?w=2000" />
        <Card.Body>
          <Card.Title>Secure payments</Card.Title>
          <Card.Text>
            You can shop with safety on our online store thanks to a state of the 
            art payment system.
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
      <br/>
      <Card>
      <Card.Header>Customer feedback</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            The prices are great and the service is always fast and reliable!
          </p>
          <footer className="blockquote-footer">
            Jane Doe
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
    <br/>
    <br/>
    </Container>
  );
}