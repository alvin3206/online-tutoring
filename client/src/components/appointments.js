import React, { useState, useEffect } from 'react';
// import ReactLoading from 'react-loading';
import { Container, Spinner } from 'react-bootstrap';
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
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>
        </Container>);
    }

}

export default Appointments;