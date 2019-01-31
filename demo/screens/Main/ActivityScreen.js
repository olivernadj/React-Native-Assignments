import React from 'react';
import {ActivityIndicator, FlatList, Platform, ScrollView, StyleSheet, TouchableHighlight, View} from 'react-native';
import {Divider, Text} from "react-native-elements";
import ActivityListItem from '../../components/ActivityListItem/ActivityListItem';
import firebase from "../../firebase";

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
    //  console.log('componentDidMount');
    this.setState({loading: true});
    const user = firebase.auth().currentUser;
    // console.log('user.uid', user.uid);
    firebase.database().ref('activity/' + user.uid).once('value', (snapshot) => {
      const res = snapshot.val();
      //  console.log(res);
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
  }

  render () {
    let activityList = <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>;
    if (this.state.loading === false) {
      if (this.state.activity.length !== 0) {
        activityList = (
          <FlatList
            data={this.state.activity}
            renderItem={({item}) => (<ActivityListItem item={item} touched={() => {
              this.props.navigation.navigate(
                this.props.navigation.state.params.detailScreen, {item: item}
              )
            }}/>)}
            ItemSeparatorComponent={() => <Divider style={{backgroundColor: '#ccc'}}/>}
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
