import React from 'react';
import { FlatList, Platform } from 'react-native';
import { List } from "react-native-elements";

import axios from 'axios';

import ActivityListItem from '../../components/ActivityListItem/ActivityListItem';
import firebase from "../../firebase";

const apiKey = 'a07e22bc18f5cb106bfe4cc1f83ad8ed';

export default class ActivityScreen extends React.Component {
  static navigationOptions = {
    title: 'Activity',
    headerTitleStyle: {
      ...Platform.select({
        ios: {fontFamily: 'Arial',},
        android: {fontFamily: 'Roboto'},
      }),
    },
  };

  state = {
    listMovies: [],
    loading: false,
    page:0,
  };

  componentDidMount () {
    console.log('componentDidMount');
    if (this.state.listMovies.length === 0) {
      this.loadMore();
    } else {
      console.log('this.state.listMovies.length', this.state.listMovies.length);
    }
    // Bind the variable to the instance of the class.
    this.authFirebaseListener = firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  componentWillUnmount() {
    // console.log('Unauth componentWillUnmount');
    this.authFirebaseListener && this.authFirebaseListener() // Unlisten it by calling it as a function
  }

  onAuthStateChanged = user => {
    // console.log('Main onAuthStateChanged');
    if (user !== null) {
      // console.log('Main navigate to main');
      // this.props.navigation.navigate('Main');
    } else {
      // console.log('Main navigate to Unauth');
      this.props.navigation.navigate('Unauth');
    }
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
            <ActivityListItem
              poster_path={item.poster_path}
              title={item.title}
              release_date={item.release_date}
              overview={item.overview}
              navigation={this.props.navigation}
            />)}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </List>
    );
  }
}
