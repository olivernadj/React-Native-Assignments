import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import Item from "./components/Item/Item";

class App extends Component {

  state = {
    listMovies: []
  }

  async componentDidMount () {
    const response = await  fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed');
    const movieData = await response.json();
    this.setState({listMovies: movieData.results})
  }


  render() {
    return (
      <Container>
        <Row>
          <Col>Header</Col>
        </Row>
        <Row>
          {this.state.listMovies.map((m) => {
            return (
              <Col xs="6">
                <Item
                  poster_path={m.poster_path}
                  title={m.title}
                  release_date={m.release_date}
                  overview={m.overview}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default App;
