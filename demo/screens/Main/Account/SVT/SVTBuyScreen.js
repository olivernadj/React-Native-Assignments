import React from 'react';
import {ScrollView, StyleSheet, View, Text, Platform, ActivityIndicator} from 'react-native';
import firebase from "../../../../firebase";
import {Button, Card, FormInput, FormLabel} from "react-native-elements";

export default class SVTBuyScreen extends React.Component {
  static navigationOptions = {
    title: 'Buy SVT - SunVibe Token',
    headerTitleStyle: {
      ...Platform.select({
        ios: {fontFamily: 'Arial',},
        android: {fontFamily: 'Roboto'},
      }),
    },
  };


  state = {
    price:0,
    amount:0,
    loading:false
  };


  addHandler = () => {
    this.setState({loading:true});
    const item = this.props.navigation.state.params.item;
    const user = firebase.auth().currentUser;
    firebase.database().ref('bids/' + item.name).push({
      bidder: user.uid,
      price: this.state.price,
      amount: this.state.amount,
      created: Date.now()
    }).then((result) => {
      const acivityRef = firebase.database().ref('activity/' + user.uid);
      acivityRef.push({
        kind: item.kind,
        symbol: item.name,
        action: 'bid',
        price: this.state.price,
        amount: this.state.amount,
        created: Date.now()
      });
      this.setState({loading:false});
      this.props.navigation.navigate('Unauth'); // force navigation route clean up. a bit hack.
    }).catch((error) => {
      this.setState({loading:false});
      // Handle Errors here.
      alert(error.message);
      console.log('onrejected', error);
    });
  };


  render() {

    const formFooter = (this.state.loading) ? (
      <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>
    ):(
      <Button icon={{name: 'unfold-less'}} title='Place a Bid' onPress={this.addHandler} buttonStyle={{marginTop: 30}}/>
    );

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'} >
        <Card title="Place a Bid">
          <Text style={{marginBottom: 10}}>
            Add a new buying offer into the marketplace.
          </Text>
          <FormLabel>Price in VND</FormLabel>
          <FormInput onChangeText={(v) => this.setState({price: v})}
                     containerStyle={{borderColor: '#ccc', borderWidth: 1}}
                     keyboardType="numeric"/>
          <FormLabel>Amount of the token</FormLabel>
          <FormInput onChangeText={(v) => this.setState({amount: v})}
                     containerStyle={{borderColor: '#ccc', borderWidth: 1}}
                     keyboardType="numeric"/>
          {formFooter}
        </Card>
        <Text>
          {JSON.stringify(this.props)}}
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // borderColor: 'green',
    // borderWidth: 1,
    //paddingTop: 30,
    //backgroundColor: '#fff',
  },
});
