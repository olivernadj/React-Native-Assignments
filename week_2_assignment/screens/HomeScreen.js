import React from 'react';
import {
  ActivityIndicator,
  View,
  FlatList,
} from 'react-native';
import {
  List,
  SearchBar
} from "react-native-elements";

import axios from 'axios';

import MovieListItem from '../components/MovieListItem/MovieListItem';

const apiKey = 'a07e22bc18f5cb106bfe4cc1f83ad8ed';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Now in cinemas....',
  };

  state = {
    listMovies: [],
    loading: false,
    page:0,
  };

  fetchNowPlaying = () => {
    this.setState({
      loading: true,
    });
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${this.state.page}`, {
      timeout: 2000
    }).then((response) => {
      console.log('response.status', response.status);
      this.setState( (prevState) => {
        return {
          listMovies: [...prevState.listMovies, ...response.data.results],
          loading: false,
        }
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  };

  loadMore = () => {
    console.log('loadMore', this.state.page);
    this.setState( (prevState) => {
      return {
        page: prevState.page + 1
      }
    }, () => this.fetchNowPlaying());
  };

  loadAgain = () => {
    console.log('loadAgain', this.state.page);
    this.setState( (prevState) => {
      return {
        page: 1,
        listMovies: []
      }
    }, () => this.fetchNowPlaying());
  };

  componentDidMount () {
    console.log('componentDidMount');
    if (this.state.listMovies.length === 0) {
      this.loadMore();
    } else {
      console.log('this.state.listMovies.length', this.state.listMovies.length);
    }
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  render() {
    // console.log("HomeScreen.js render() this.state.listMovies", this.state.listMovies);
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.listMovies}
          refreshing={this.state.loading}
          onRefresh={this.loadAgain}
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMore}
          renderItem={({item}) => (
            <MovieListItem
              poster_path={item.poster_path}
              title={item.title}
              release_date={item.release_date}
              overview={item.overview}
              navigation={this.props.navigation}
            />)}
          keyExtractor={(item, index) => item.id.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </List>
    );
  }
}
