import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      cityName: '',
      error: false,
      displayImage: false
    }
  }

  requestCityInfo = async (e) => {
    e.preventDefault();
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`);
      this.setState({
        error: false,
        displayImage: true,
        cityData: cityData.data[0],
      });
      console.log(cityData.data[0]);
    } catch (error) {
      console.log('Error: ', error);
      console.log('Error Message: ', error.message)
      this.setState({
        error: true,
        displayImage: false,
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
          <ListGroup.Item><strong>Latitude:</strong> {this.state.cityData.lat}</ListGroup.Item>
          <ListGroup.Item><strong>Longitude:</strong> {this.state.cityData.lon}</ListGroup.Item>
        </ListGroup>
        <fieldset>
          <legend>Choose City</legend>
          <Form onSubmit={this.requestCityInfo}>
            <Form.Label htmlFor="cityName">City </Form.Label>
            <Form.Control type="text" id="cityName" onInput={this.handleCityInput}></Form.Control>
            <Button type="submit">Explore!</Button>
          </Form>
        </fieldset>
        {this.state.displayImage && 
          <Image id="map" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`} alt={this.state.cityData.display_name} />
        }
      </>
    );
  }
}

export default App;
