import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Weather from './Weather';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      cityName: '',
      error: false,
      displayMap: false,
      weatherData: []
    }
  }

  requestCityInfo = async (e) => {
    e.preventDefault();
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`);
      let weatherData = await axios.get(`http://localhost:3001/weather?cityName=${this.state.cityName}`)
      console.log('City Data ', cityData);
      console.log('Weather Data ', weatherData.data);
      this.setState({
        error: false,
        displayMap: true,
        cityData: cityData.data[0],
        weatherData: weatherData.data,
      });
    } catch (error) {
      console.log('Error: ', error);
      console.log('Error Message: ', error.message)
      this.setState({
        error: true,
        displayMap: false,
        errorCode: error.code,
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
        {this.state.displayMap &&
          <>
            <Image id="map" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`} alt={this.state.cityData.display_name} />
            {this.state.weatherData !== 'No Weather' ?
              <Weather data={this.state.weatherData}></Weather> :
              <p>Weather not found for this location</p>}
          </>
        }
        {this.state.error &&
          <Alert>
            <Alert.Heading variant='primary'>{this.state.errorCode}</Alert.Heading>
            <p>{this.state.errorMessage}</p>
          </Alert>
        }
      </>
    );
  }
}

export default App;
