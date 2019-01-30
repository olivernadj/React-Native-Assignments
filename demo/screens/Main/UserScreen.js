import React from 'react';
import {ScrollView, StyleSheet, Text, Platform, ActivityIndicator, TouchableHighlight, View, AsyncStorage} from 'react-native';
import {FormLabel, FormInput, Button, Divider} from 'react-native-elements'
import firebase from '../../firebase.js';


export default class UserScreen extends React.Component {
  static navigationOptions = {
    title: 'Log in',
    headerTitleStyle: {
      ...Platform.select({
        ios: {fontFamily: 'Arial',},
        android: {fontFamily: 'Roboto'},
      }),
    },
  };

  state = {
    email: '',
    nickname: '',
    password: '',
    user: null,
    loading: false
  };



  signOutHandler = () => {
    this.setState({loading:true});
    firebase.auth().signOut()
      .then((result) => {
        this.setState({user:null, loading:false});
        this.props.navigation.navigate('Unauth');
        // console.log('onfulfilled', result);
        // console.log('firebase.auth', firebase.auth().currentUser);
      })
      .catch((error) => {
        this.setState({loading:false});
        // Handle Errors here.
        if (error.code === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(error.message);
        }
        console.log('onrejected', error);
      });
  };

  signUpHandler = () => {
    console.log('signUpHandler');
    this.props.navigation.navigate('SignUp');
  };

  render() {
    const formFooter = (this.state.loading) ? (
        <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>
      ):(
        <Button icon={{name: 'lock-open'}} title='Sign out' onPress={this.signOutHandler} buttonStyle={{marginTop:30}}/>
      );

    return (
      <ScrollView style={styles.container}>
        <View style={{ marginRight:15, marginBottom:25, marginLeft:15, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
          <Text>You are signed in.</Text>
        </View>
        {formFooter}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
});
