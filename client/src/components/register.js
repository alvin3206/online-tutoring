import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
// import Cookies from 'universal-cookie';
import Cookies from 'js-cookie';

export default function Register(props) {
    // const cookies = new Cookies();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        catBool: false
    });
    const [emailWarn, setEmailWarn] = useState("");
    const [message, setMessage] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    // const [formSubmit, setFormSubmit] = useState(false);
    const API_URL = "http://localhost:3000/";
    const fetchEmail = () => {
        fetch(API_URL + `existed/${formData.email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data.existed);
                if (data.existed) {
                    setEmailWarn("This email already used!");
                    setButtonDisabled(true);
                } else {
                    setEmailWarn("");
                    setButtonDisabled(false);
                }
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    const handleSubmit = async (e) => {
        let cat = formData.catBool ? 'tutor' : 'user';
        let flag = false;
        console.log(JSON.stringify(formData));
        e.preventDefault();
        fetch(API_URL + `register/${cat}`, {
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password
            })

        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                Cookies.set('token', data.token, { path: '/' });
                Cookies.set('cred_id', data.insertedId.toString(), { path: '/' });
                Cookies.set('cat', cat, { path: '/' });
                // if (formData.catBool) {
                    fetch(API_URL + `${cat}s/new`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'X-Access-Token': Cookies.get("token")
                        },
                        method: "POST",
                        body: JSON.stringify({
                            first_name: formData.first_name,
                            last_name: formData.last_name,
                            cred_id: data.insertedId
                        })

                    })
                        .then(res => res.json())
                        .then((data1) => {
                            // console.log(data1);
                            Cookies.set('cat_id', data1.insertedId, { path: '/' });
                            setMessage("Success");
                            // props.setNote(`Successfully registered as ${cat}`)
                            // if (cat === "tutor") props.setNote("Please complete your profile!");
                            // sessionStorage.setItem("note", [`Successfully registered as ${cat}`]);
                            // setFormSubmit(true);
                            navigate("/appointments");
                            window.location.reload(false);
                        })
                        .catch((error) => {
                            console.log(error.message);
                            setMessage("Some errors occured");
                        });
                // }
            })
            .catch((error) => {
                console.log(error.message);
                setMessage("Some errors occured");
            });
        // try {
        //     let res = await fetch(API_URL + `register/${cat}`, {
        //         method: "POST",
        //         body: JSON.stringify({
        //             first_name: formData.first_name,
        //             last_name: formData.last_name,
        //             email: formData.email,
        //             password: formData.password
        //         })
        //     });
        //     // let resJson = await res.json();
        //     if (res.status === 200) {
        //         setFormData({
        //             ...formData,
        //             email: "",
        //             password: ""
        //         });
        //         if (formData.catBool) {
        //             let response = await fetch(API_URL + `tutors/new`, {
        //                 method: "POST",
        //                 body: JSON.stringify({
        //                     first_name: formData.first_name,
        //                     last_name: formData.last_name
        //                 })
        //             });
        //             // let responseJson = await res.json();
        //             if (response.status === 200) {
        //                 setFormData({
        //                     ...formData,
        //                     first_name: "",
        //                     last_name: ""
        //                 });
        //                 flag = !flag;
        //             } else {
        //                 setMessage("Some error occured");
        //             }
        //         }
        //         if (flag) setMessage("User created successfully");
        //     } else {
        //         setMessage("Some error occured");
        //     }
        // } catch (err) {
        //     console.log(err);
        // }

    }

    return (
        <Container className='p-4 my-2'>
            <Row className="justify-content-md-center">
                <Col md={8} lg={6} xl={4}>
                    <div className='p-5 rounded-3 bg-white'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} value={formData.first_name} required type="text" placeholder="First name" />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="formBasicLastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} value={formData.last_name} required type="text" placeholder="Last name" />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} required type="email" placeholder="Enter email"
                                    onBlur={(e) => {
                                        fetchEmail();
                                    }} />
                                <Form.Text className="text-muted">{emailWarn}</Form.Text>
                            </Form.Group>
                            <Form.Group className="my-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} required type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="formBasicCheckbox">
                                <Form.Check onChange={(e) => setFormData({ ...formData, catBool: e.target.checked })} checked={formData.catBool} type="checkbox" label="Register as Tutor" />
                            </Form.Group>
                            <div className="d-grid">
                                <Button variant="success" type="submit" disabled={buttonDisabled}>
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