import React from 'react';
import {ScrollView, StyleSheet, View, Text, Platform, ActivityIndicator} from 'react-native';
import {Button, Card, FormInput, FormLabel} from "react-native-elements";
import firebase from "../../../firebase";

export default class MarketplaceItemDetailScreens extends React.Component {
  static navigationOptions = {
    title: 'Marketplace Item',
    headerTitleStyle: {
      ...Platform.select({
        ios: {fontFamily: 'Arial',},
        android: {fontFamily: 'Roboto'},
      }),
    },
  };

  state = {
    price: 0,
    amount: 0,
    loading :false,
    name: '',
  };

  componentDidMount() {
    const item = this.props.navigation.state.params.item;
    this.setState({
      price: item.price,
      amount: item.amount,
      name: item.action.charAt(0).toUpperCase() + item.action.slice(1),
    });
  }

  acceptHandler = () => {
    this.setState({loading:true});
    const item = this.props.navigation.state.params.item;
    const user = firebase.auth().currentUser;
    const activityRef = firebase.database().ref('/queue');
    activityRef.push({
      ref: item.key,
      user: user.uid,
      kind: 'book',
      symbol: item.symbol,
      action: 'fok' + this.state.name,
      price: Number(this.state.price),
      amount: Number(this.state.amount),
      currency: item.name,
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
    const item = this.props.navigation.state.params.item;

    const formFooter = (this.state.loading) ? (
      <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>
    ):(
      <Button icon={{name: 'gavel'}} title={"Accept the " + this.state.name} onPress={this.acceptHandler} buttonStyle={{marginTop: 30}}/>
    );

    return (
      <ScrollView style={styles.container}>
        <Card title={"Accept " + this.state.name}>
          <Text style={{marginBottom: 10}}>
            Would you like to accept the following {(item.action === 'bid')?'buying':'selling'} offer?
          </Text>
          <FormLabel>Price in VND</FormLabel>
          <FormInput onChangeText={(v) => this.setState({price: v})}
                     containerStyle={{borderColor: '#ccc', borderWidth: 1}}
                     value={String(this.state.price)}
                     editable={false}/>
          <FormLabel>Amount of the token</FormLabel>
          <FormInput onChangeText={(v) => this.setState({amount: v})}
                     containerStyle={{borderColor: '#ccc', borderWidth: 1}}
                     value={String(this.state.amount)}
                     editable={false}/>
          {formFooter}
        </Card>
        <View>
          <Text>
            {JSON.stringify(this.props)}}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 15,
    // backgroundColor: '#fff',
  },
});
