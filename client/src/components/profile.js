import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Spinner, Button, Row, Col, Card, Form } from 'react-bootstrap';
import Cookies from 'js-cookie';

function Profile(props) {
    const API_URL = "http://localhost:3000/";
    const navigate = useNavigate();
    // const params = useParams();
    // const [appointment, setAppointment] = useState(null);
    // const [tutor, setTutor] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const cat = Cookies.get("cat");
    const cat_id = Cookies.get("cat_id");
    const cred_id = Cookies.get("cred_id");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        certificate: "",
        certificate_submit: [],
        rating: null,
        city: "",
        country: "",
        about: "",
        hours: 0,
        complete: false,
        cred_id: cred_id,
        work_hours: "",
        work_hours_submit: []
    });

    function setRating(newVal) {
        setFormData({ ...formData, rating: newVal })
    }

    const handleSubmit = async (e) => {
        console.log(formData);
        console.log(formData.certificate_submit);
        console.log(formData.certificate);
        e.preventDefault();
        fetch(API_URL + `tutors/${cat_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Access-Token': Cookies.get("token")
            },
            method: "PUT",
            body: JSON.stringify({
                first_name: formData.first_name,
                last_name: formData.last_name,
                certificate_submit: formData.certificate_submit,
                city: formData.city,
                country: formData.country,
                about: formData.about,
                work_hours_submit: formData.work_hours_submit
            })

        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error.message);
            });
        window.location.reload(false);
    }

    useEffect(() => {
        setLoading(true);
        fetch(API_URL + 'tutors/' + cat_id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data.certificate);
                if (data.complete) setButtonDisabled(false);
                data.certificate = data.certificate.join(", ");
                data.work_hours = data.work_hours.join(", ");
                setFormData({ ...formData, certificate_submit: data.certificate });
                setFormData({ ...formData, work_hours_submit: data.work_hours });
                setFormData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setError(error);
                setLoading(false);
            })
    }, []);


    if (isLoading) {
        return (<div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" className='mx-auto my-5'>
                <span className="visually-hidden">Loading...</span>
            </Spinner></div>);
    }
    else if (error) {
        return (
            <div>Error: {error.message}</div>
        );
    }
    else {

        return (
            <Container className='p-4 my-2'>
                <Row className="justify-content-md-center">
                    <Col md={8} lg={6} xl={4}>
                        <div className='p-5 rounded-3 bg-white'>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicPhoto">
                                    <Form.Label>Profile photo</Form.Label>
                                    <Form.Control type="file" onChange={(e) => {
                                        // console.log(e.target.files);
                                        const fd = new FormData();
                                        fd.append('mypic', e.target.files[0]);

                                        fetch(API_URL + 'image/' + cat_id, {
                                            headers: {
                                                // 'Content-Type': 'multipart/form-data',
                                                // 'Accept': 'application/json',
                                                'X-Access-Token': Cookies.get("token")
                                            },
                                            method: "POST",
                                            body: fd,
                                            enctype: "multipart/form-data"
                                        })
                                            .then(res => res.json())
                                            .then((data) => {
                                                console.log(data);
                                                props.setNote("Successfully uploaded!");
                                            })
                                            .catch((error) => {
                                                console.log(error.message);
                                            });
                                    }}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicFirstName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} value={formData.first_name} required type="text" placeholder="First name" />
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formBasicLastName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} value={formData.last_name} required type="text" placeholder="Last name" />
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formBasicCertificate">
                                    <Form.Label>Certificates</Form.Label>
                                    <Form.Control onChange={(e) => {
                                        let temp = formData;
                                        temp.certificate_submit = e.target.value.split(",").map(element => {
                                            return element.trim();
                                        });
                                        setFormData(temp);
                                        setFormData({ ...formData, certificate: e.target.value });
                                    }} value={formData.certificate} required as="textarea" rows={2} placeholder="Certificates" />
                                    <Form.Text>Seperate them by commas</Form.Text>
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formBasicCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control onChange={(e) => setFormData({ ...formData, city: e.target.value })} value={formData.city} required type="text" placeholder="City" />
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formBasicCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control onChange={(e) => setFormData({ ...formData, country: e.target.value })} value={formData.country} required type="text" placeholder="Country" />
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formBasicAbout">
                                    <Form.Label>About</Form.Label>
                                    <Form.Control onChange={(e) => setFormData({ ...formData, about: e.target.value })} value={formData.about} required as="textarea" rows={6} placeholder="About" />
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formBasicCountry">
                                    <Form.Label>Working hours</Form.Label>
                                    <Form.Control onChange={(e) => {
                                        setButtonDisabled(true);
                                        let allMatch = true;
                                        let matchArray = [];
                                        e.target.value.split(",").forEach((substr) => {
                                            let matchResult = substr.trim().match(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s(?:[2][0-4]|[0-1][0-9])-(?:[2][0-4]|[0-1][0-9])$/);
                                            if (!matchResult) {
                                                allMatch = false;
                                                setButtonDisabled(true);
                                                matchArray = [];
                                            } else {
                                                matchArray.push(substr.trim());
                                            }
                                        });
                                        if (allMatch) {
                                            // console.log(matchArray);
                                            setButtonDisabled(false);
                                            let temp = formData;
                                            temp.work_hours_submit = matchArray;
                                            setFormData(temp);
                                        }
                                        setFormData({ ...formData, work_hours: e.target.value });
                                    }} value={formData.work_hours} required as="textarea" row={3} placeholder="Working hours" />
                                    <Form.Text>List all working hours by day, seperate them by commas. Example: Fri 01-14, Sun 00-24
                                    </Form.Text>
                                </Form.Group>
                                <div className="d-grid">
                                    <Button variant="success" type="submit" disabled={buttonDisabled}>
                                        Submit
                                    </Button>
                                </div>
                                <Form.Text className="">{ }</Form.Text>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container >
        );
    }

}

export default Profile;