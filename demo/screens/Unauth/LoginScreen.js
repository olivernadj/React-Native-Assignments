import React from 'react';
import {ScrollView, StyleSheet, Text, Platform, ActivityIndicator, TouchableHighlight, View, AsyncStorage} from 'react-native';
import {FormLabel, FormInput, Button, Divider} from 'react-native-elements'
import firebase from '../../firebase.js';


export default class LoginScreen extends React.Component {
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

  didFocusSubscription = null;

  componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      payload => {
        // console.log('Login willFocus', payload);
        const user = firebase.auth().currentUser;
        // console.log('Login user', user);
        if (user !== this.state.user) {
          this.setState({user:user});
        }
      }
    );
  }

  componentWillUnmount() {
    if (this.didFocusSubscription !== null) {
      this.didFocusSubscription.remove();
    }
  }

  loginHandler = async () => {
    this.setState({loading:true});
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        const user = firebase.auth().currentUser;
        this.setState({loading:false, user:user});
        if (user !== null) {
          // AsyncStorage.setItem('userToken', 'abc').then(() => {
          //   this.props.navigation.navigate('Main');
          // });
        }
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

  signOutHandler = () => {
    this.setState({loading:true});
    firebase.auth().signOut()
      .then((result) => {
        this.setState({user:null, loading:false});
        // this.props.navigation.navigate('Unauth');
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
    let jsx = null; // finally return jsx;

    if (this.state.user === null) {
      const formFooter = (this.state.loading) ? (
          <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>
        ):(
          <Button icon={{name: 'lock'}} title='Log in' onPress={this.loginHandler} buttonStyle={{marginTop: 30}}/>
        );

      jsx = (
        <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'} >
          <View style={{ marginRight:15, marginBottom:25, marginLeft:15, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
            <Text> New to SunVibe? </Text>
            <TouchableHighlight onPress={this.signUpHandler}>
              <Text style={{fontWeight: 'bold', color:'blue', textDecorationLine: 'underline'}}> Sign up </Text>
            </TouchableHighlight>
          </View>
          <Divider style={{ backgroundColor: '#ccc' }} />
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

      jsx = (
        <ScrollView style={styles.container}>
          <View style={{ marginRight:15, marginBottom:25, marginLeft:15, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
            <Text>You are signed in.</Text>
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
