import React, { useState, useEffect } from 'react';
import Cards from './cards';
// import ReactLoading from 'react-loading';
import { Container, Form, Spinner } from 'react-bootstrap';

function Tutors() {
    const API_URL = "http://localhost:3000/";
    const [tutors, setTutors] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    // const [focusView, setFocusView] = useState(false);
    // const [focusCardId, setFocusCardId] = useState('');

    useEffect(() => {
        setLoading(true);
        console.log(API_URL + 'tutors');
        fetch(API_URL + 'tutors', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data);
                data = data.filter((item) => {
                    return item.complete === true;
                });
                console.log(data);
                setTutors(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setError(error);
                setLoading(false);
            })
    }, []);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = tutors.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(tutors)
        }
    }
    // function focusChange(id) {
    //     if (id !== '') {
    //         setFocusView(true);
    //         setFocusCardId(id);
    //     } else {
    //         setFocusView(false);
    //         setFocusCardId('');
    //     }
    // }

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
                <div className='d-flex my-4'>
                    <div className='me-auto'>
                        <h3 className='brand-font p-1'>Tutors</h3>
                    </div>
                    <div>
                        <Form className="d-flex">
                            <Form.Control type="search" placeholder="Search" className="me-2" onChange={(e) => searchItems(e.target.value)} />
                        </Form>
                    </div>
                </div>
                <hr />
                {searchInput.length > 1 ? <Cards tutorList={filteredResults} /> : <Cards tutorList={tutors} />}
                {/* {focusView ? searchInput.length > 1 ? <Expand tutorList={filteredResults} id={focusCardId} focusChange={focusChange}></Expand> : <Expand tutorList={tutors} id={focusCardId} focusChange={focusChange}></Expand> : searchInput.length > 1 ? <Cards tutorList={filteredResults} focusChange={focusChange} /> : <Cards tutorList={tutors} focusChange={focusChange} />} */}
            </Container>
        );
    }

}

export default Tutors;