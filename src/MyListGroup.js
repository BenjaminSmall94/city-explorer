import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class MyListGroup extends React {

  render() {
    return (
      <ListGroup>
        <ListGroup.Item><strong>Latitude:</strong> {this.props.lat}</ListGroup.Item>
        <ListGroup.Item><strong>Longitude:</strong> {this.props.lon}</ListGroup.Item>
      </ListGroup>
    )
  }
}

export default MyListGroup;