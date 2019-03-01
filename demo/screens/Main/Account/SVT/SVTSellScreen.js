import React from 'react';
import {ScrollView, StyleSheet, View, Text, Platform, ActivityIndicator} from 'react-native';
import firebase from "../../../../firebase";
import {Button, Card, FormInput, FormLabel} from "react-native-elements";

export default class SVTBuyScreen extends React.Component {
  static navigationOptions = {
    title: 'Sell SVT - SunVibe Token',
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
    const item = this.props.navigation.state.params.item;
    const user = firebase.auth().currentUser;
    if (Number(item.amount) <= 0) {
      alert('Amount must be more than 0');
      return;
    }
    if (Number(item.amount) < Number(this.state.amount)) {
      alert('Insufficient found');
      return;
    }
    this.setState({loading:true});
    firebase.database().ref('/queue').push({
      user: user.uid,
      kind: item.kind,
      symbol: item.name,
      action: 'ask',
      price: Number(this.state.price),
      amount: Number(this.state.amount),
      currency: 'VND', // todo: replace with dynamic content
      status: 'pending',
      created: Date.now(),
    }).then((result) => {
      this.setState({loading:false});
      this.props.navigation.navigate('Unauth'); // force navigation route clean up. a bit hack.
    })
    .catch((error) => {
      this.setState({loading:false});
      // Handle Errors here.
      alert(error.message);
      console.log('onrejected', error);
    });
  };


  render() {

    const item = this.props.navigation.state.params.item;


    const formFooter = (this.state.loading) ? (
      <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>
    ):(
      <Button
        icon={{name: 'unfold-more'}}
        title='Place an Ask'
        onPress={this.addHandler}
        buttonStyle={{marginTop: 20}}
        disabled={(this.state.amount * this.state.price) <= 0}/>
    );

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'} >
        <Card title="Place an Ask">
          <Text style={{marginBottom: 10, marginLeft: 15, marginRight: 15}}>
            Add a new selling offer into the marketplace.
          </Text>
          <Text style={{marginBottom: 10, marginLeft: 15, marginRight: 15}}>
            {item.amount.toFixed(2) + " " + item.name} Available for sell.
          </Text>
          <FormLabel>Price in VND</FormLabel>
          <FormInput onChangeText={(v) => this.setState({price: v})}
                     containerStyle={{borderColor: '#ccc', borderWidth: 1}}
                     keyboardType="numeric"/>
          <FormLabel>Amount of the token</FormLabel>
          <FormInput onChangeText={(v) => this.setState({amount: v})}
                     containerStyle={{borderColor: '#ccc', borderWidth: 1}}
                     keyboardType="numeric"/>
          <Text style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
            You will asking {(this.state.amount * this.state.price).toFixed(2)}
            VND for {Number(this.state.amount).toFixed(2)} Token.
          </Text>
          <Text style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
            You can modify or cancel your asking offer later if not fulfilled. After success sell (either partial or total),
            the VND will be debited to your VND account.
          </Text>
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
