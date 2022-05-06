import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
import Cookies from 'js-cookie';
// import "./style.module.css";

function Header() {
    const [login, setLogin] = useState(false);
    function onLogout() {
        setLogin(false);
        Cookies.remove("token");
        Cookies.remove("cred_id");
        Cookies.remove("cat");
    }

    useEffect(() => {
        setLogin(Cookies.get("token") !== undefined);
    }, []);
    return (
        <div className="sticky-top shadow-sm bg-light">
            <Container>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="/" className="brand-font nav-font">
                            <img
                                src="./images/logo-lg.svg"
                                width="72"
                                height="72"
                                className="d-inline-block"
                                alt="Tutowl logo"
                            />
                            <span className="logo-move">TUTOWL</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/tutors">Tutors</Nav.Link>
                                {login && <Nav.Link href="/appointments">Appointments</Nav.Link>}
                            </Nav>
                            {login ?
                                <Nav className="d-flex">
                                    <Nav.Link onClick={() => { onLogout() }}>Logout</Nav.Link>
                                </Nav> :
                                <Nav className="d-flex">
                                    <Nav.Link href="/register">Sign-Up</Nav.Link>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </Nav>}
                            {/* <Nav className="d-flex">
                                    <Nav.Link href="/register">Sign-Up</Nav.Link>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </Nav> */}

                            {/* <Form className="d-flex">
                                    <Form.Control type="search" placeholder="Search" className="me-2" />
                                    <Button variant="outline-success" type="submit">
                                        Search
                                    </Button>
                                </Form> */}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
        </div>
    );
}

export default Header;
