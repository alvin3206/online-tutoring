import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
// import Cookies from 'universal-cookie';
import Cookies from 'js-cookie';

export default function Login() {
    // const cookies = new Cookies();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    // const [formSubmit, setFormSubmit] = useState(false);
    const API_URL = "http://localhost:3000/";

    const handleSubmit = async (e) => {
        console.log(JSON.stringify(formData));
        e.preventDefault();
        fetch(API_URL + 'login', {
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Access-Token': Cookies.get("token")
            },
            method: "POST",
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })

        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                Cookies.set('token', data.token, { path: '/' });
                Cookies.set('cred_id', data._id.toString(), { path: '/' });
                Cookies.set('cat', data.cat, { path: '/' });
                fetch(API_URL + 'infos/login', {
                    // credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Access-Token': Cookies.get("token")
                    },
                    method: "POST",
                    body: JSON.stringify({
                        cred_id: data._id.toString(),
                        cat: data.cat
                    })

                })
                    .then(res => res.json())
                    .then((data1) => {
                        console.log(data1);
                        Cookies.set('cat_id', data1._id.toString(), { path: '/' });
                        setMessage("Success");
                        navigate("/appointments");
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });

            })
            .catch((error) => {
                console.log(error.message);
                setMessage("Some errors occured");
            });
    }

    return (
        <Container className='p-4 my-2'>
            <Row className="justify-content-md-center">
                <Col md={8} lg={6} xl={4}>
                    <div className='p-5 rounded-3 bg-white'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="my-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} required type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} required type="password" placeholder="Password" />
                            </Form.Group>
                            <div className="d-grid">
                                <Button variant="success" type="submit">
                                    Submit
                                </Button>
                            </div>
                            <Form.Text className="">{message}</Form.Text>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container >
    )
}