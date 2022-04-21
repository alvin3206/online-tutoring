import React, { Component } from 'react';
import Header from '../header';
import Cards from '../cards';
import Search from '../search';
import Footer from '../footer';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      availableOnly: false,
      tutors: [],
      focusView: false,
      focusCardId: 0
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handlFocusCardChange = this.handlFocusCardChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handlFocusCardChange(key) {
    this.setState({
      focusView: !this.state.focusView,
      focusCardId: parseInt(key[key.length - 1])
    })
  }

  componentDidMount() {
    fetch('./tutors.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({ tutors: data })
      })
      .catch(console.log)
  }

  render() {
    const isFocusView = this.state.focusView;
    let block;
    if (isFocusView) {
      block = (<div className="container col-10 p-4 mt-4">
      <Cards
        tutorList={this.state.tutors}
        filterText={this.state.filterText}
        availableOnly={this.state.availableOnly}
        onFocusCardChange={this.handlFocusCardChange}
        focusView={this.state.focusView}
        focusCardId={this.state.focusCardId}
      />
    </div>);
    } else {
      block = (<div className="container col-10 p-4 mt-4">
      <Search
        filterText={this.state.filterText}
        availableOnly={this.state.availableOnly}
        onFilterTextChange={this.handleFilterTextChange}
        onAvailableChange={this.handleAvailableChange}
        focusView={this.state.focusView}
      />
      <Cards
        tutorList={this.state.tutors}
        filterText={this.state.filterText}
        availableOnly={this.state.availableOnly}
        onFocusCardChange={this.handlFocusCardChange}
        focusView={this.state.focusView}
        focusCardId={this.state.focusCardId}
      />
    </div>);
    }
    return (
      <div>
        <Header />
          {block}

        <Footer />
      </div>

    );

  }
}

export default App;