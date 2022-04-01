import React, { Component } from 'react';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.handlFocusCardChange = this.handlFocusCardChange.bind(this);
  }

  handlFocusCardChange(e) {
    console.log(e.target.id[e.target.id.length - 1]);
    this.props.onFocusCardChange(e.target.id);
  }

  render() {
    const filterText = this.props.filterText;
    const availableOnly = this.props.availableOnly;
    const focusView = this.props.focusView;
    const focusCardId = this.props.focusCardId;
    var rows = [];
    var row = [];
    var rowCount = 0;

    if (!focusView) {
      console.log(this.props.tutorList);
      this.props.tutorList.forEach((tutor, id) => {
        if (tutor.first_name.indexOf(filterText) === -1 && tutor.last_name.indexOf(filterText) === -1) {
          var noMatchSubject = true;
          tutor.certificate.forEach((subject, sid) => {
            if (subject.indexOf(filterText) !== -1) noMatchSubject = false;
          });
          if (noMatchSubject) return;
        }

        if (availableOnly && !tutor.available) {
          return;
        }
        row.push(<div className="col-4" key={id}>
          <div className="card shadow-sm">
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
          </div>
        </div>);
        if (id % 3 === 2) {
          rows.push(<div className="row py-2" key={rowCount}>{row}</div>);
          rowCount += 1;
          row = [];
        }
      });
      if (row.length !== 0) {
        rows.push(<div className="row py-2" key={rowCount}>{row}</div>);
        rowCount += 1;
      }
    } else {
      rows = (<div className="col-12">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className='row pb-4'>
              <div className='col-2'><img src={"./images/profile/" + focusCardId + ".jpeg"} className="img-fluid rounded float-left" alt="..." /></div>
              <div className='col-10'>
                <h3 className="card-title mb-4">{this.props.tutorList[focusCardId].first_name} {this.props.tutorList[focusCardId].last_name}</h3>
                <h6 className="card-subtitle">Subject of certificates:</h6>
                <p className="card-text">{this.props.tutorList[focusCardId].certificate.join(', ')}</p>
                <h6 className="card-subtitle">Ratings:</h6>
                <p className="card-text">{this.props.tutorList[focusCardId].rating} / 5</p>
              </div>
            </div>


            <h5 className="card-title">About Me</h5>
            <p className="card-text">{this.props.tutorList[focusCardId].about}</p>
            <div className="d-flex align-items-end flex-column">
              <a href="#" onClick={this.handlFocusCardChange} className="ml-auto btn btn-success" id={"btn-" + focusCardId}>Back</a>
            </div>

          </div>
        </div>
      </div>);
    }



    return (
      <div className='my-4'>
        {rows}
      </div>
    );
  }
}

export default Cards;