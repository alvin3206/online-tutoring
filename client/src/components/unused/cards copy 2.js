import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Card, Col } from 'react-bootstrap';

class Cards extends React.Component {

  render() {

    const rows = [];
    this.props.tutorList.forEach((tutor, id) => {
      rows.push(
        <Col key={id}>
          <Card className="shadow-sm">
            <div className="card-body">
              <div className='row pb-2'>
                <div className='col-3'><img src={"./images/profile/" + id + ".jpeg"} className="img-fluid rounded float-left" alt="..." /></div>
                <div className='col-9'><h5 className="card-title">{tutor.first_name} {tutor.last_name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{tutor.certificate.join(', ')}</h6></div>
              </div>



              <p className="card-text text-truncate">{tutor.about}</p>
              <div className="d-flex align-items-end flex-column">
                <a href="#" onClick={this.handlFocusCardChange} className="ml-auto btn btn-success" id={"btn-" + id}>Detail</a>
              </div>

            </div>
          </Card>
        </Col>);
    });

    return (
      <div>
        <hr className='my-4'/>
        <Container><Row lg="3" md="2" className="g-4">
          {rows}
        </Row></Container>
      </div>
    );
  }
}

export default Cards;
