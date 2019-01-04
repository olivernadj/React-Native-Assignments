import React, { Component } from 'react';
import ReactLoading from "react-loading";
import { Container, Row, Col, Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,InputGroup, InputGroupAddon, Input } from 'reactstrap';
import './App.css';
import Item from "./components/Item/Item";

class App extends Component {

  state = {
    listMovies: [],
    search: ''
  };

  async componentDidMount () {
    console.log('componentDidMount');
    const response = await  fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed');
    const movieData = await response.json();
    this.setState({listMovies: movieData.results});
  }

  handleChange(event) {
    this.setState({search: event.target.value});
  }

  async handleSearch(event) {
    console.log('A name was submitted:', this.state.search);
    event.preventDefault();
    this.setState({listMovies: []});
    const response = await fetch('https://api.themoviedb.org/3/search/company?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&query=' + this.state.search);
    const list = await response.json();

    list.results.forEach(async (m) => {
      const r = await fetch('https://api.themoviedb.org/3/movie/' + m.id + '?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed');
      if (r.ok) {
        const movie = await r.json();
        const listMovies = [...this.state.listMovies];
        listMovies.push({
          id: m.id,
          poster_path: movie.poster_path,
          title: movie.name,
          release_date: movie.release_date,
          overview: movie.overview
        });
        this.setState({listMovies: listMovies});
      }
    });
  }


  render() {
    let listMovies = null;

    if (this.state.listMovies.length === 0) {
      listMovies = (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <ReactLoading type="bubbles" color="#ooo" />
        </Col>
      );
    } else {
      listMovies = this.state.listMovies.map((m) => {
        return (
          <Col xs="6" key={m.id}>
            <Item
              poster_path={m.poster_path}
              title={m.title}
              release_date={m.release_date}
              overview={m.overview}
            />
          </Col>
        );
      });
    }


    return (
      <Container>
        <Row>
          <Col>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/"> week_1_assignment </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <form onSubmit={this.handleSearch.bind(this)}>
                      <InputGroup>
                        <Input value={this.state.search} onChange={this.handleChange.bind(this)} />
                        <InputGroupAddon addonType="append"><Button>Search</Button></InputGroupAddon>
                      </InputGroup>
                    </form>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
        <Row>
          {listMovies}
        </Row>
      </Container>
    );
  }
}

export default App;
