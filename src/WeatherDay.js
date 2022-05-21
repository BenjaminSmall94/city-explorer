import React from 'react';

class WeatherDay extends React.Component {

  render() {
    return (
      <tr>
        <td>{this.props.dailyWeather.time}</td>
        <td>Forecast: {this.props.dailyWeather.forecast}</td>
      </tr>
    );
  }
}

export default WeatherDay;
