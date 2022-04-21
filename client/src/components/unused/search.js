import React, { Component } from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    // this.handleAvailableChange = this.handleAvailableChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  // handleAvailableChange(e) {
  //   this.props.onAvailableChange(e.target.checked);
  // }

  render() {
    return (
      <div className="row">
        <div className='col-md-3 col-sm-6'>
          <div className='input-group rounded'>
            <input
              type="search"
              className="input form-control"
              placeholder="Filter"
              value={this.props.filterText}
              onChange={this.handleFilterTextChange}
            />
            <span className="input-group-text border-0" id="search-addon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
            {/* <p>
          <input 
            type="checkbox"
            checked={this.props.availableOnly}
            onChange={this.handleAvailableChange}
          />
          Only show available videos
        </p> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
