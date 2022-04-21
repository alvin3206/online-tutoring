import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { Container, Spinner, Button, Row, Col, Card } from 'react-bootstrap';

function Appointment() {
    const API_URL = "http://localhost:3000/";
    const params = useParams();
    const [appointment, setAppointment] = useState(null);
    const [tutor, setTutor] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(API_URL + 'appointments/' + params.appointmentId, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data) => {
                setAppointment(data);
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
        
        return (<Container className='col-10 p-4 my-2'>
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
                                    <h6 className="card-subtitle">From</h6>
                                    <p className="card-text">{new Date(Date.parse(appointment.start)).toString()}</p>
                                    <h6 className="card-subtitle">To</h6>
                                    <p className="card-text">{new Date(Date.parse(appointment.end)).toString()}</p>
                                    <hr/>
                                    <div className='col'>
                                        <h4 className='brand-font'>Tutor</h4>
                                        <h6 className="card-subtitle">{tutor.first_name} {tutor.last_name}</h6>
                                        </div>
                                    <div className='col'>
                                    <h4 className='brand-font'>Student</h4>
                                    <h6 className="card-subtitle">{appointment.user_id}</h6>
                                    </div>
                                </Row>
                                <div className="d-flex align-items-end flex-column">
                                    <Link to={'/appointments'} >
                                        <Button variant="success" className="ml-auto">Go Back</Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
        </Container>);
    }

}

export default Appointment;