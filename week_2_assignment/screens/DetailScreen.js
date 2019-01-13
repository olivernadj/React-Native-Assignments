import React from 'react';
import {
  Text,
  View,
  Button,
  Image, ScrollView, StyleSheet
} from 'react-native';

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Detail....',
  };

  componentDidMount () {
    console.log('DetailScreen.js componentDidMount');
  }

  render() {
    const { navigation } = this.props;
    const movie = navigation.getParam('movie', {
      title:'Movie Title',
      overview:'Overview',
      avatar:{
        uri:'http://simpleicon.com/wp-content/uploads/movie-1.png'
      },
    });
    return (
      <ScrollView style={styles.container}>
        <View style={{padding: 30, alignItems: 'center'}}>
          <Text>{movie.title}</Text>
        </View>
        <View style={{padding: 30}}>
          <Image
            source={movie.avatar}
            style={{width:300, height:300}}/>
          <Text>{movie.overview}</Text>
        </View>
        <View style={{padding: 30}}>
          <Button
            title="Back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

