import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Card, Col, Button, Spinner } from 'react-bootstrap';
import { Rating } from '@mui/material';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { Avatar } from '@mui/material';
import Cookies from 'js-cookie';
import moment from 'moment';
// import { ToastContainer, toast } from 'react-toastify';
import "react-big-calendar/lib/css/react-big-calendar.css";
// import 'react-toastify/dist/ReactToastify.css';
// import "./style.module.css";

const localizer = momentLocalizer(moment)

function Tutor(props) {
    const API_URL = "http://localhost:3000/";
    const params = useParams();
    const navigate = useNavigate();
    // console.log(typeof(params.tutorId));
    const [tutor, setTutor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [flag, setFlag] = useState(true);
    const [isLoading, setLoading] = useState(true);
    // const [message, setMessage] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(API_URL + 'tutors/' + params.tutorId + '/rating', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Access-Token': Cookies.get("token")
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error.message);
            });
        fetch(API_URL + 'tutors/' + params.tutorId, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setTutor(data);
                fetch(API_URL + 'appointments/tutor/' + params.tutorId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Access-Token': Cookies.get("token")
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
            })
            .catch((error) => {
                console.log(error.message);
                setError(error);
                setLoading(false);
            });
    }, [flag]);

    function handleEventPropGetter(eventInfo) {
        console.log(eventInfo);

        if (eventInfo.user_id === Cookies.get("cat_id")) {
            var backgroundColor = '#408458';
            var style = {
                backgroundColor: backgroundColor,
                color: 'white'
            };
            return {
                style: style
            };
        }
        return;

    }



    function handleSelectSlot(slotInfo) {
        // var startDate = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
        // var endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
        var startDate = moment(slotInfo.start.toLocaleString()).toDate();
        var endDate = moment(slotInfo.end.toLocaleString()).toDate();
        var conflict = false;
        appointments.forEach(element => {
            if (!((element.start - endDate >= 0 || element.end - startDate <= 0))) conflict = true;
            if (startDate < new Date()) conflict = true;
        });
        if (conflict) {
            props.setNote("Invalid date & time!");
        } else {
            fetch(API_URL + 'appointments/new', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Access-Token': Cookies.get("token")
                },
                method: "POST",
                body: JSON.stringify({
                    tutor_id: params.tutorId,
                    user_id: Cookies.get("cat_id"),
                    start: startDate,
                    end: endDate
                })
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    // setMessage("You made an appointment!");
                    setFlag(!flag);
                    props.setNote("You made an appointment!");
                })
                .catch((error) => {
                    console.log(error.message);
                })
            // setAppointments((prev) => [...prev, { start: startDate, end: endDate, title: "title" }]);
        }
    }

    function handleSelectEvent(eventInfo) {
        if (eventInfo.user_id === Cookies.get("cat_id")) {
            navigate("/appointments/" + eventInfo._id);
        }

    }

    if (isLoading) {
        return (<div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" className='mx-auto my-5'>
                <span className="visually-hidden">Loading...</span>
            </Spinner></div>);
    } else if (error) {
        return (
            <div>Error: {error.message}</div>
        );
    } else {
        appointments.forEach(object => {
            object.title = "Occupied";
            if (object.user_id === Cookies.get("cat_id")) {
                object.title = "Your Appointment";
            }
            // console.log(typeof(object.start))
            object.start = new Date(object.start);
            object.end = new Date(object.end);
        });
        return (
            <Container className='p-4 my-2'>
                <div className='d-flex'>
                    <div className='me-auto'>
                        <h3 className='brand-font p-1'>Tutor</h3>
                    </div>
                </div>
                <hr />
                <Row className="g-4">
                    <Col>
                        <Card className="shadow-sm">
                            <div className="card-body">
                                <Row className='pb-2'>
                                    <div className='col-2'>
                                        {/* <img src={API_URL + "profile/" + tutor.profile_url} className="img-fluid rounded float-left" alt="..." /> */}
                                        <div className='square-div'>
                                            <Avatar src={API_URL + "profile/" + tutor.profile_url} alt={tutor.first_name} className="img-fluid" variant="rounded"
                                                sx={{
                                                    width: "100%",
                                                    height: "100%"
                                                }}>
                                            </Avatar>
                                        </div>
                                    </div>
                                    <div className='col-10'>
                                        <h3 className="card-title">{tutor.first_name} {tutor.last_name}</h3>
                                        <h4 className="card-subtitle mb-2 text-muted">{tutor.certificate.join(", ")}</h4>
                                        <Rating defaultValue={tutor.rating} precision={0.1} readOnly />
                                    </div>
                                </Row>
                                <p className="card-text text-truncate">{tutor.about}</p>
                                <div className="d-flex align-items-end flex-column">
                                    {/* <Link to={`/tutors`} onClick={() => props.focusChange("") } > */}
                                    <Button variant="success" className="ml-auto" onClick={() => navigate("/tutors")}>Go Back</Button>
                                    {/* </Link> */}

                                </div>
                                <hr />
                                <h4 className="card-subtitle my-4">Schedule</h4>
                                <Calendar
                                    selectable
                                    // onSelectEvent={event => onEventClick(event)}
                                    onSelectSlot={(slotInfo) => handleSelectSlot(slotInfo)}
                                    onSelectEvent={(eventInfo) => handleSelectEvent(eventInfo)}
                                    localizer={localizer}
                                    timeslots={2}
                                    views={[Views.WEEK, Views.AGENDA]}
                                    defaultView={Views.WEEK}
                                    events={appointments}
                                    startAccessor="start"
                                    endAccessor="end"
                                    eventPropGetter={(eventInfo) => handleEventPropGetter(eventInfo)}
                                    style={{ height: 500 }}
                                />
                            </div>


                        </Card>
                    </Col>
                </Row>
                {/* <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover></ToastContainer> */}
            </Container>
        );
    }

}

export default Tutor;
