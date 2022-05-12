import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Row, Card, Col, Button } from 'react-bootstrap';
import { Rating, Avatar } from '@mui/material';

function Cards(props) {
  const navigate = useNavigate();
  const API_URL = "http://localhost:3000/";
  const rows = [];
  props.tutorList.forEach((tutor, id) => {
    rows.push(
      <Col key={id}>
        <Card className="shadow-sm">
          <div className="card-body">
            <div className='row pb-2'>
              <div className='col-3'>
                <div className='square-div'>
                  <Avatar src={API_URL + "profile/" + tutor.profile_url} alt={tutor.first_name} className="img-fluid" variant="rounded"
                    sx={{
                      width: "100%",
                      height: "100%"
                    }}>
                  </Avatar>
                </div>

                {/* <img src={"./images/profile/" + tutor._id + ".jpeg"} className="img-fluid rounded float-left" alt="..." /> */}
              </div>
              <div className='col-9'>
                <h5 className="card-title">{tutor.first_name} {tutor.last_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{tutor.certificate.join(', ')}</h6>
                <Rating size="small" defaultValue={tutor.rating} precision={0.1} readOnly />
              </div>
            </div>
            <p className="card-text text-truncate">{tutor.about}</p>
            <div className="d-flex align-items-end flex-column">
              {/* <Link to={`/tutors/${tutor._id}`} onClick={() => props.focusChange(tutor._id)} > */}
              <Button variant="success" className="ml-auto" onClick={() => navigate(`/tutors/${tutor._id}`)}>Detail</Button>
              {/* </Link> */}

            </div>

          </div>
        </Card>
      </Col>);
  });
  return (
    <Row lg="3" md="2" className="g-4">
      {rows}
    </Row>
  );
}

export default Cards;
