import React, { useState, useEffect } from 'react';
import { Row, Card, Col, Button, Spinner } from 'react-bootstrap';
import { Rating } from '@mui/material';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "./style.module.css";

const localizer = momentLocalizer(moment)

function Expand(props) {
    const API_URL = "http://localhost:3000/";
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(API_URL + 'appointments/tutor/' + props.id, {
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

    const index = props.tutorList.findIndex(object => {
        return object._id === props.id;
    });

    const tutor = props.tutorList[index];

    appointments.forEach(object => {
        object.title = "Occupied";
        object.start = new Date(object.start);
        object.end = new Date(object.end);
    });

    function onSlotChange(slotInfo) {
        var startDate = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
        var endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
        console.log('startTime', startDate); //shows the start time chosen
        console.log('endTime', endDate); //shows the end time chosen
    }

    function onEventClick(event) {
        console.log(event) //Shows the event details provided while booking
    }

    if (isLoading) {
        return (<div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" className='mx-auto my-5'>
                <span className="visually-hidden">Loading...</span>
            </Spinner></div>);
    } else {
        return (
            <Row className="g-4">
                <Col>
                    <Card className="shadow-sm">
                        <div className="card-body">
                            <Row className='pb-2'>
                                <div className='col-2'><img src={"./images/profile/" + tutor._id + ".jpeg"} className="img-fluid rounded float-left" alt="..." /></div>
                                <div className='col-10'>
                                    <h3 className="card-title">{tutor.first_name} {tutor.last_name}</h3>
                                    <h4 className="card-subtitle mb-2 text-muted">{tutor.certificate.join(', ')}</h4>
                                    <Rating defaultValue={tutor.rating} precision={0.1} readOnly />
                                </div>
                            </Row>
                            <p className="card-text text-truncate">{tutor.about}</p>
                            <div className="d-flex align-items-end flex-column">
                                <Button variant="success" onClick={() => props.focusChange("")} className="ml-auto">Go Back</Button>
                            </div>
                            <hr />
                            <h4 className="card-subtitle my-4">Schedule</h4>
                            <Calendar
                                selectable
                                // onSelectEvent={event => onEventClick(event)}
                                onSelectSlot={(slotInfo) => onSlotChange(slotInfo)}
                                localizer={localizer}
                                timeslots={2}
                                views={[Views.WEEK, Views.AGENDA]}
                                defaultView={Views.WEEK}
                                events={appointments}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 500 }}
                            />
                        </div>


                    </Card>
                </Col>
            </Row>
        );
    }

}

export default Expand;
