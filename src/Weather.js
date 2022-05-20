import React from 'react';
import Table from 'react-bootstrap/Table';
import WeatherDay from './WeatherDay'

class Weather extends React.Component {

  
  render () {
    let forecast = this.props.data.map((dailyWeather, idx) => <WeatherDay key={idx} dailyWeather={dailyWeather}></WeatherDay>);
    return (
      <>
        <Table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Weather</th>
            </tr>
          </thead>
          <tbody>
            {forecast}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Weather