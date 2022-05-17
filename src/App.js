import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      cityName: '',
      error: false
    }
  }

  requestCityInfo = async (e) => {
    e.preventDefault();
    try {
      console.log(this.state.cityName);
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`)
      this.setState({
        error: false,
        cityData: cityData.data[0]
      });
      console.log(cityData.data[0]);
    } catch (error) {
      console.log('Error: ', error);
      console.log('Error Message: ', error.message)
      this.setState({
        error: true,
        errorMessage: error.message
      });
    }
  }

  handleCityInput = e => {
    this.setState({
      cityName: e.target.value
    });
  }

  render() {

    return (
      <>
        <h1>City Explorer</h1>
        <h2>{this.state.cityData.display_name}</h2>
        <ListGroup>
          <ListGroup.Item>Latitude: {this.state.cityData.lat}</ListGroup.Item>
          <ListGroup.Item>Longitude: {this.state.cityData.lon}</ListGroup.Item>
        </ListGroup>
        <br />
        <Form onSubmit={this.requestCityInfo}>
          <Form.Label htmlFor="cityName">City Name</Form.Label>
          <Form.Control type="text" id="cityName" onInput={this.handleCityInput}></Form.Control>
        </Form>
      </>
    );
  }
}

export default App;
