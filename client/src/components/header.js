import React, { Component } from 'react';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
// import "./style.module.css";

class Header extends React.Component {

    render() {
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
                                    <Nav.Link href="/appointments">Appointments</Nav.Link>
                                </Nav>
                                <Nav className="d-flex">
                                    <Nav.Link href="/signup">Sign-Up</Nav.Link>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </Nav>

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
}

export default Header;
