import React from 'react';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MyListGroup from './MyListGroup';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Weather from './Weather';
import Movies from './Movies';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      cityName: '',
      error: false,
      displayData: false,
      weatherData: [],
      movieData: []
    }
  }

  requestCityInfo = async (e) => {
    e.preventDefault();
    try {
      let cityData = await Axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`);
      let weatherData = await Axios.get(`${process.env.REACT_APP_SERVER}/weather?latitude=${cityData.data[0].lat}&longitude=${cityData.data[0].lon}`);
      let movieData = await Axios.get(`${process.env.REACT_APP_SERVER}/movies?title=${this.state.cityName}`);
      this.setState({
        error: false,
        displayData: true,
        cityData: cityData.data[0],
        weatherData: weatherData.data,
        movieData: movieData.data,
      });
    } catch (error) {
      console.log('Error: ', error);
      console.log('Error Message: ', error.message)
      this.setState({
        error: true,
        displayData: false,
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
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`;
  
    return (
      <>
        <h1>City Explorer</h1>
        <Form onSubmit={this.requestCityInfo} className="city-search">
          <Form.Control type="text" id="city-name" placeholder ="Choose City" onInput={this.handleCityInput}></Form.Control>
          <Button type="submit">Explore!</Button>
        </Form>
        {this.state.displayData &&
          <>
            <h2>{this.state.cityData.display_name}</h2>
            <Image id="map" src={mapURL} alt={this.state.cityData.display_name} />
            <MyListGroup lat={this.state.cityData.lat} lon={this.state.cityData.lon}></MyListGroup>
            <Weather data={this.state.weatherData}></Weather>
            <Movies data={this.state.movieData}></Movies>
          </>
        }
        {this.state.error &&
          <Alert>
            <Alert.Heading variant='danger'>{this.state.errorCode}</Alert.Heading>
            <p>{this.state.errorMessage}</p>
          </Alert>
        }
      </>
    );
  }
}

export default App;
