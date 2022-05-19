import React from 'react';

class Movies extends React.Component {

  render () {
    return this.props.data.map((movie, idx) => {
      return (
        <article key ={idx}>
          <h4>{idx + 1}. {movie.title}</h4>
          <p>{movie.description}</p>
        </article>
      );
    });
  }
}

export default Movies;