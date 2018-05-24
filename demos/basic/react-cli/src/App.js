import React, { Component } from 'react';
import './App.css';

function Album(props) {
  return (
    <div>
      <h2>{props.album.title}</h2>
      <button onClick={props.viewDetails}>View Details</button>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: []
    };
  }

  handleViewDetails = () => {
    alert('View details!');
  }

  componentDidMount() {
    fetch('http://localhost:3000/albums')
      .then(response => response.json())
      .then(data => {
        this.setState({
          albums: data
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.albums.map(album => (
          <Album 
            album={album} 
            viewDetails={this.handleViewDetails} 
            key={album.id} />
        ))}
      </div>
    );
  }
}

export default App;
