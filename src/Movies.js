import React from 'react';
import Table from 'react-bootstrap/Table';
import Movie from './Movie';

class Movies extends React.Component {

  render () {

    return (
      <Table>
        <tbody>
          {this.props.data.map((movie, idx) => {
            return (
              <Movie key={idx} idx={idx} data={movie}></Movie>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default Movies;