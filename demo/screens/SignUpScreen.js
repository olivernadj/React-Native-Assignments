import React from 'react';
import {ScrollView, StyleSheet, Text, Platform, ActivityIndicator, TouchableHighlight, View} from 'react-native';
import {FormLabel, FormInput, Button, Divider} from 'react-native-elements'
import firebase from '../firebase.js';


export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign up',
    headerTitleStyle: {
      ...Platform.select({
        ios: {fontFamily: 'Arial',},
        android: {fontFamily: 'Roboto'},
      }),
    },
  };

  state = {
    email: '',
    password: '',
    user: null,
    loading: false
  };

  componentDidMount() {
    //console.log('firebase.auth', firebase.auth().currentUser);
    const user = firebase.auth().currentUser;
    if (user !== null) {
      this.setState({user:user})
    }
  }

  registerHandler = () => {
    this.setState({loading:true});
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        const user = firebase.auth().currentUser;
        console.log('onfulfilled', result);
        console.log('firebase.auth', firebase.auth().currentUser);
        this.setState({user:user, loading:false});
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

    let jsx = null; // finally return jsx;

    if (this.state.user === null) {
      const formFooter = (this.state.loading) ? (
        <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>
      ):(
        <Button icon={{name: 'lock-open'}} title='Register' onPress={this.registerHandler} buttonStyle={{marginTop:30}}/>
      );

      jsx = (
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
        <Button icon={{name: 'lock'}} title="Back" onPress={() => this.props.navigation.goBack()} buttonStyle={{marginTop: 30}}/>
      );

      jsx = (
        <ScrollView style={styles.container}>
          <View style={{ marginRight:15, marginBottom:25, marginLeft:15, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
            <Text> You signed up successfully. </Text>
          </View>
          {formFooter}
        </ScrollView>
      );
    }
    return jsx;

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
});
