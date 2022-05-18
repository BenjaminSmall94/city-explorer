import React from 'react';
import Table from 'react-bootstrap/Table';

class Weather extends React.Component {

  
  render () {
    let forecast = this.props.data.map((dailyWeather, idx) => {
      return (
      <tr key={idx}>
        <td>{dailyWeather.date}</td>
        <td>{dailyWeather.description}</td>
      </tr>
      );
    });
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