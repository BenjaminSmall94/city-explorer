import React from 'react';

class WeatherDay extends React.Component {

  render() {
    return (
      <tr>
        <td>{this.props.dailyWeather.date}</td>
        <td>{this.props.dailyWeather.description}</td>
      </tr>
    );
  }
}

export default WeatherDay;
