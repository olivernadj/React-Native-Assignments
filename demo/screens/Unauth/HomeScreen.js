import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Tile} from "react-native-elements";
import firebase from "../../firebase";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };


  componentDidMount() {
    // console.log('Unauth componentDidMount');
    // Bind the variable to the instance of the class.
    this.authFirebaseListener = firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  componentWillUnmount() {
    // console.log('Unauth componentWillUnmount');
    this.authFirebaseListener && this.authFirebaseListener() // Unlisten it by calling it as a function
  }

  onAuthStateChanged = user => {
    // console.log('Unauth onAuthStateChanged');
    if (user !== null) {
      // console.log('Unauth navigate to main');
      this.props.navigation.navigate('Main');
    } else {
      // console.log('Unauth navigate to Unauth');
      // this.props.navigation.navigate('Unauth');
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Tile
          height={1000}
          imageSrc={require('../../assets/images/district4-bw.jpg')}
          title="SunVibe.city is a Solar Energy Platform where small investors - crowd founders - together finance solar panel installation on the roof of other people’s - roof lenders - house."
          featured
          caption="Take the opportunity and invest in renewable energy today"
        />
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
