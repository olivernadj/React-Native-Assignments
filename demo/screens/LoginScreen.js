import React from 'react';
import {ScrollView, StyleSheet, Text, Platform, ActivityIndicator} from 'react-native';
import {FormLabel, FormInput, Button} from 'react-native-elements'
import firebase from '../firebase.js';


export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Log in',
    headerTitleStyle: {
      ...Platform.select({
        ios: {fontFamily: 'Arial',},
        android: {fontFamily: 'Roboto'},
      }),
    },
    user: null,
    loading: false
  };

  state = {
    email: '',
    password: '',
    loading: false,
  };

  componentDidMount() {
    console.log('firebase.auth', firebase.auth().currentUser);
    const user = firebase.auth().currentUser;
    if (user !== null) {
      this.setState({user:user})
    }
  }

  loginHandler = () => {
    this.setState({loading:true});
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        const user = firebase.auth().currentUser;
        this.setState({loading:false, user:user});
        console.log('onfulfilled', result);
        console.log('firebase.auth', firebase.auth().currentUser);
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

  signOutHandler = () => {
    this.setState({loading:true});
    firebase.auth().signOut()
      .then((result) => {
        this.setState({user:null, loading:false});
        console.log('onfulfilled', result);
        console.log('firebase.auth', firebase.auth().currentUser);
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

  render() {

    let content = null;

    if (this.state.user === null) {

      const formFooter = (this.state.loading) ? (
          <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>
        ):(
          <Button icon={{name: 'lock'}} title='Log in' onPress={this.loginHandler} buttonStyle={{marginTop: 30}}/>
        );

      return (
        <ScrollView style={styles.container}>
          <FormLabel>Email</FormLabel>
          <FormInput onChangeText={(v) => this.setState({email: v})}
                     containerStyle={{borderColor: '#ccc', borderWidth: 1}}/>
          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={(v) => this.setState({password: v})} secureTextEntry={true}
                     containerStyle={{borderColor: '#ccc', borderWidth: 1}}/>
          {formFooter}
        </ScrollView>
      );
    } else {
      const formFooter = (this.state.loading) ? (
          <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>
        ):(
          <Button icon={{name: 'lock-open'}} title='Sign out' onPress={this.signOutHandler} buttonStyle={{marginTop:30}}/>
        );

      return (
        <ScrollView style={styles.container}>
          <Text>You are signed</Text>
          {formFooter}
        </ScrollView>
      );
    }


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
});
