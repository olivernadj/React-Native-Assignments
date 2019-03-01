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
    loading:false,
    account: {
      book: {
        SVT: 0
      },
      wallet: {
        VND: 0,
        ETH: 0
      }
    },
  };

  componentDidMount () {
    //  console.log('componentDidMount');
    this.updateAccount();
    this.willFocus = this.props.navigation.addListener('willFocus', () => {
      this.updateAccount();
    });
  }

  componentWillUnmount() {
    this.willFocus.remove();
  }

  updateAccount = () => {
    const user = firebase.auth().currentUser;
    if (user === null) {
      this.props.navigation.navigate('Unauth');
    } else {
      this.setState({loading: true});
      const user = firebase.auth().currentUser;
      firebase.database().ref('account/' + user.uid).once('value', (snapshot) => {
        const res = snapshot.val();
        if (res !== null) {
          const mergedAccount = this.state.account;
          for (let key in this.state.account) {
            if (res[key] !== undefined) {
              mergedAccount[key] = {...mergedAccount[key], ...res[key]}
            }
          }
          this.setState({loading: false, account: mergedAccount});
        } else {
          this.setState({loading: false});
        }
      });
    }
  };

  addHandler = () => {
    const item = this.props.navigation.state.params.item;
    const user = firebase.auth().currentUser;
    if (Number(item.amount) <= 0) {
      alert('Amount must be more than 0');
      return;
    }
    if ((this.state.amount * this.state.price) > this.state.account.wallet.VND) {
      alert('Insufficient found');
      return;
    }
    this.setState({loading:true});
    firebase.database().ref('/queue').push({
      user: user.uid,
      kind: item.kind,
      symbol: item.name,
      action: 'bid',
      price: Number(this.state.price),
      amount: Number(this.state.amount),
      currency: 'VND', // todo: replace with dynamic content
      status: 'pending',
      created: Date.now(),
    }).then((result) => {
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
      <Button
        icon={{name: 'unfold-less'}}
        title='Place a Bid'
        onPress={this.addHandler}
        buttonStyle={{marginTop: 20}}
        disabled={(this.state.amount * this.state.price) <= 0}/>
    );

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'} >
        <Card title="Place a Bid">
          <Text style={{marginBottom: 10, marginLeft: 15, marginRight: 15}}>
            Add a new buying offer into the marketplace.
          </Text>
          <Text style={{marginBottom: 10, marginLeft: 15, marginRight: 15}}>
            {this.state.account.wallet.VND.toFixed(2)} VND available in your wallet.
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
            You will buying {Number(this.state.amount).toFixed(2)} Token
            for {(this.state.amount * this.state.price).toFixed(2)} VND, what will be deposited.
          </Text>
          <Text style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
            You can modify or cancel your buying offer later if not fulfilled. After success buy (either partial or
            total), the Token will be added to your SVT balance.
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
