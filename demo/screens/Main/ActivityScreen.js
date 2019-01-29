import React from 'react';
import {ActivityIndicator, FlatList, Platform, ScrollView, StyleSheet, TouchableHighlight, View} from 'react-native';
import {Card, Divider, List, ListItem, Text} from "react-native-elements";

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
    activity: [],
    loading: false,
  };

  componentDidMount () {
    console.log('componentDidMount');
    this.setState({loading: true});
    const user = firebase.auth().currentUser;
    console.log('user.uid', user.uid);
    firebase.database().ref('activity/' + user.uid).once('value', (snapshot) => {
      const res = snapshot.val();
      console.log(res);
      if (res !== null) {
        const activity = [];
        for (let key in res) {
          activity.push({key:key, ...res[key]});
        }
        this.setState({loading: false, activity:activity});
      } else {
        this.setState({loading: false});
      }
    });

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

  renderRow = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate('ActivityItemDetail', {
          item: item,
        })}
      >
        <ListItem
          containerStyle={{ borderBottomWidth: 0 }}
          title={item.symbol + ' ' + item.action}
          subtitle={parseFloat(item.amount).toFixed(2)}
        />
      </TouchableHighlight>
    )
  };

  render () {
    let activityList = <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>;

    if (this.state.loading === false) {

      // const book = [];
      // for (let key in this.state.account['book']) {
      //   book.push({name: key, amount: this.state.account['book'][key], kind: 'book'});
      // }
      if (this.state.activity.length !== 0) {
        activityList = (
          <FlatList
            data={this.state.activity}
            renderItem={this.renderRow}
            ItemSeparatorComponent={() => (<Divider style={{backgroundColor: '#ccc'}}/>)}
            keyExtractor={item => item.key.toString()}
          />
        );
      } else {
        activityList = (
          <View style={{ margin:50, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
            <Text> You don't have activity yet. </Text>
            <TouchableHighlight onPress={() => {this.props.navigation.navigate('Account')}}>
              <Text style={{fontWeight: 'bold', color:'blue', textDecorationLine: 'underline'}}> Let's make one. </Text>
            </TouchableHighlight>
          </View>
        );
      }
    }

    return (
      <ScrollView style={styles.container}>
        {activityList}
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
});
