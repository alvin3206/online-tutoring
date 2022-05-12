import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Spinner, Button, Row, Col, Card, Form } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { Rating } from '@mui/material';

function Appointment() {
    const API_URL = "http://localhost:3000/";
    const navigate = useNavigate();
    const params = useParams();
    // const [appointment, setAppointment] = useState(null);
    const [tutor, setTutor] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const cat = Cookies.get("cat");
    const cat_id = Cookies.get("cat_id");
    const [formData, setFormData] = useState({
        rating: null,
        feedback: "",
        start: null,
        end: null
    });

    function setRating(newVal) {
        // setAppointment({
        //     ...appointment, rating: newVal
        // })
        setFormData({ ...formData, rating: newVal })
    }

    const handleSubmit = async (e) => {
        console.log(JSON.stringify(formData));
        e.preventDefault();
        fetch(API_URL + `appointments`, {
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Access-Token': Cookies.get("token")
            },
            method: "PUT",
            body: JSON.stringify({
                appointment_id: params.appointmentId,
                rating: formData.rating,
                feedback: formData.feedback,
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
        fetch(API_URL + 'appointments/' + params.appointmentId, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Access-Token': Cookies.get("token")
            }
        })
            .then(res => res.json())
            .then((data) => {
                setFormData(data);
                fetch(API_URL + 'tutors/' + data.tutor_id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data);
                        setTutor(data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error.message);
                        setError(error);
                        setLoading(false);
                    })
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
                <div className='d-flex'>
                    <div className='me-auto'>
                        <h3 className='brand-font p-1'>Appointment</h3>
                    </div>
                </div>
                <hr />
                <Row className="g-4">
                    <Col>
                        <Card className="shadow-sm">
                            <div className="card-body">
                                <Row className='pb-2'>
                                    <h4 className="card-title brand-font">Time</h4>
                                    <h6 className="card-subtitle brand-font">From</h6>
                                    <p className="">{new Date(Date.parse(formData.start)).toString()}</p>
                                    <h6 className="card-subtitle brand-font">To</h6>
                                    <p className="">{new Date(Date.parse(formData.end)).toString()}</p>
                                    {/* <div className='col'>
                                        <h4 className='brand-font'>Student</h4>
                                        <h6 className="card-subtitle">{appointment.user_id}</h6>
                                    </div> */}
                                </Row>
                                <hr />
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <h4 className='brand-font'>Detail</h4>
                                        <h6 className="card-subtitle brand-font">Tutor</h6>
                                        <p className="">{tutor.first_name} {tutor.last_name}</p>
                                        <Form.Group className="my-2" controlId="formRating">
                                            <h6 className="card-subtitle brand-font">Rating</h6>
                                            {cat === "user" ?
                                                <Rating
                                                    name="simple-controlled"
                                                    className='m-2'
                                                    value={formData.rating}
                                                    onChange={(event, newValue) => {
                                                        setRating(newValue);
                                                    }}
                                                />
                                                : formData.rating ?
                                                    <Rating
                                                        name="simple-controlled"
                                                        className='m-2'
                                                        value={formData.rating}
                                                        readOnly
                                                    />
                                                    : <div className=''><p className="">Not available</p></div>

                                            }
                                        </Form.Group>
                                        <Form.Group className="my-2" controlId="formFeedback">

                                            <h6 className="card-subtitle brand-font">Feedback</h6>
                                            {cat === "user" ?
                                                <Form.Control as="textarea" rows={3} className='my-2' value={formData.feedback} onChange={(e) => setFormData({ ...formData, feedback: e.target.value })} />
                                                : formData.feedback !== "" ? <p className="">{formData.feedback}</p> : <p className="">Not available</p>

                                            }
                                        </Form.Group>
                                    </Row>
                                    <div className="d-flex align-items-end">
                                        {cat === "user" && <Button variant="warning" type="submit" className="ml-auto me-3">Update</Button>}
                                        <Link to={'/appointments'} >
                                            <Button variant="success" className="ml-auto" onClick={() => navigate("/appointments")}>Go Back</Button>
                                        </Link>
                                    </div>
                                </Form>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default Appointment;