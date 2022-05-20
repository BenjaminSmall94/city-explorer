import React from 'react';

class Movie extends React.Component {

  render () {
    return (
      <>
        <tr>
          <th>{this.props.idx + 1}. {this.props.data.title}</th>
        </tr>
        <tr>
          <td>{this.props.data.description}</td>
        </tr>
      </>  
    );
  }
}

export default Movie;