import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import authservice, {AuthService} from '../services/authservice'
import {Badge} from "react-bootstrap";
import {useEffect, useState} from "react";


const AUTH_API = 'http://localhost:5000';
const ENTITIES_API = 'http://localhost:8000/entities';

export function NavBarTop() {
    const authservice = new AuthService(AUTH_API,ENTITIES_API );
    const perform_logout = () => {

        authservice.logout();
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.location = '/login'
    }
    const hasUser = () => {
        return localStorage.getItem("token") != null;
    }

    const [cartItems, setCartItems] = useState(0);
    const [username1, setUsername] = useState("");

    useEffect(() => {
        // This function will be called whenever the component mounts or
        // when a value in the dependency array (second argument) changes.
        const itemsInCart = "cart" in localStorage ? JSON.parse(localStorage.getItem('cart')).length : 0;
        const username =  "username" in localStorage ? localStorage.getItem("username") : "Username Placeholder" ;
        setUsername(username);


        setCartItems(itemsInCart);
        const handleLoginStatusChange = (event) => {
            console.log(event);
            const itemsInCart = "cart" in localStorage ? JSON.parse(localStorage.getItem('cart')).length : 0;
        const username =  "username" in localStorage ? localStorage.getItem("username") : "Username Placeholder" ;
            setCartItems(itemsInCart);
            setUsername(username);
        };

        // Add an event listener that calls the above function whenever
        // the 'storage' event is triggered.
        window.addEventListener('storage', handleLoginStatusChange);

        // Clean up the event listener when the component unmounts.
        return () => {
            window.removeEventListener('storage', handleLoginStatusChange);
        };
    }, [])

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Mar Ket</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/Products">
                            <Nav.Link>Products</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Ads" id="basic-nav-dropdown">
                            <LinkContainer to="/createAd">
                                <NavDropdown.Item>Create Ad</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/allAds">
                                <NavDropdown.Item>Show Ads</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        
                        {!hasUser() &&
                            <Container className={"d-inline-flex justify-content-end"}>
                                <LinkContainer to="/Login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>

                                <LinkContainer to="/register">
                                    <Nav.Link>Register</Nav.Link>
                                </LinkContainer>
                            </Container>
                        }
                        {hasUser() &&
                            <Container className={"d-inline-flex justify-content-end"}>
                                
                                <LinkContainer to="/Account">
                                    <Nav.Link><i className={"bi bi-person-square"}/>{ username1 }</Nav.Link>
                                </LinkContainer>
                                <Nav.Link onClick={perform_logout}><i className={"bi bi-person-square"}/>Terminar
                                    Sessão</Nav.Link>

                                <LinkContainer to="/Cart">
                                    <Nav.Link><i className={"bi bi-bag"}/><Badge
                                        bg="secondary">{cartItems}</Badge></Nav.Link>
                                </LinkContainer>
                            </Container>
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
