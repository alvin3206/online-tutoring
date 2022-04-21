import React, { useState, useEffect } from 'react';
// import ReactLoading from 'react-loading';
import { Container, Spinner, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function Appointments() {
    const API_URL = "http://localhost:3000/";
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        console.log(API_URL + 'appointments');
        fetch(API_URL + 'appointments', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
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
            })
    }, []);


    if (isLoading) {
        return (<div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" className='mx-auto my-5'>
                <span className="visually-hidden">Loading...</span>
            </Spinner></div>);
    }
    else {
        return (<Container className='col-10 p-4 my-2'>
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
                            <TableCell><Link to={`/appointments/${item._id}`}><Button variant='success' size="sm" className="me-3">Detail</Button></Link>{(Date.parse(item.start) - Date.now())/(1000 * 3600) >=  24.0 ? <Link to={"/appointments"}><Button variant='warning' size="sm">Cancel</Button></Link> : ""}</TableCell>
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