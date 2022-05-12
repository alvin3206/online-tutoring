import React, { useState, useEffect } from 'react';
// import ReactLoading from 'react-loading';
import { Container, Spinner, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Rating } from '@mui/material';
import Cookies from 'js-cookie';

function Appointments() {
    // console.log(Cookies.get('token'));
    const API_URL = "http://localhost:3000/";
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [totalHours, setTotalHours] = useState(null);
    const [ratings, setRatings] = useState(null);
    const [flag, setFlag] = useState(true);
    let cat = Cookies.get("cat");
    useEffect(() => {
        setLoading(true);
        let cat_id = Cookies.get("cat_id");
        let cred_id = Cookies.get("cred_id");
        fetch(API_URL + `hours/${cat}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Access-Token': Cookies.get("token")
            },
            method: "POST",
            body: JSON.stringify({
                id: cat_id
            })
        })
            .then(res => res.json())
            .then((data) => {
                fetch(API_URL + 'tutors/' + cat_id + '/rating', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Access-Token': Cookies.get("token")
                    }
                })
                    .then(res => res.json())
                    .then((data) => {
                        // console.log(data);
                        fetch(API_URL + `infos/all/${cat}/${cat_id}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'X-Access-Token': Cookies.get("token")
                            }
                        })
                            .then(res => res.json())
                            .then((data) => {
                                setTotalHours(data.hours);
                                if (cat === "tutor") setRatings(data.rating);
                                fetch(API_URL + `appointments/${cat}`, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        'X-Access-Token': Cookies.get("token")
                                    },
                                    method: "POST",
                                    body: JSON.stringify({
                                        cred_id: cred_id,
                                    })
                                })
                                    .then(res => res.json())
                                    .then((data) => {
                                        console.log(data);
                                        setAppointments(data);
                                        setLoading(false);
                                    })
                                    .catch((error) => {
                                        console.log(error.message);
                                        setError(error);
                                        setLoading(false);
                                    });
                            })
                            .catch((error) => {
                                console.log(error.message);
                            });
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            })
            .catch((error) => {
                console.log(error.message);
            });

    }, [flag]);

    function handleDelete(item) {
        fetch(API_URL + `appointments/${item._id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Access-Token': Cookies.get("token")
            },
            method: "DELETE"
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setFlag(!flag);
            })
            .catch((error) => {
                console.log(error.message);
            })

    }


    if (isLoading) {
        return (<div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" className='mx-auto my-5'>
                <span className="visually-hidden">Loading...</span>
            </Spinner></div>);
    }
    else {
        return (<Container className='p-4 my-2'>
            <div className='me-auto p-1'>
                <h3 className='brand-font'>Status</h3>
                <div className='p-1'>
                    <h6 className="brand-font">Completed hours: {totalHours}</h6>
                </div>
                {cat === "tutor" &&
                    <div className='p-1'>
                        <h6 className="brand-font">Average ratings:</h6>
                        <Rating size="small" defaultValue={ratings} precision={0.1} readOnly />
                    </div>
                }
            </div>
            <div className='d-flex'>
                <div className='me-auto'>
                    <h3 className='brand-font p-1'>Appointments</h3>
                </div>
            </div>
            <hr />
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Actions</TableCell>
                            {/* <TableCell>Tutor</TableCell> */}
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Duration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell><Link to={`/appointments/${item._id}`}><Button variant='success' size="sm" className="me-3">Detail</Button></Link>{(Date.parse(item.start) - Date.now()) / (1000 * 3600) >= 24.0 ? <Button variant='warning' size="sm" onClick={() => handleDelete(item)}>Cancel</Button> : ""}</TableCell>
                                {/* <TableCell>{item.tutor_id}</TableCell> */}
                                <TableCell>{new Date(Date.parse(item.start)).toString()}</TableCell>
                                <TableCell>{new Date(Date.parse(item.end)).toString()}</TableCell>
                                <TableCell>{item.duration}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>
        </Container>);
    }

}

export default Appointments;