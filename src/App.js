import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import './App.css';

class App extends React.Component {

  render() {

    return (
      <>
        <h1>City Explorer</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label htmlFor="city-name">City Name</Form.Label>
          <Form.Control type="text" id="city-name" onInput="this.handleCityInput"></Form.Control>
        </Form>
      </>
    );
  }
}

export default App;
