import React from 'react';
import {ScrollView, StyleSheet, View, Text, Platform, ActivityIndicator} from 'react-native';
import {Button, FormInput, FormLabel} from "react-native-elements";
import firebase from "../../../../firebase";

export default class VNDAddScreen extends React.Component {
  static navigationOptions = {
    title: 'Add VND',
    headerTitleStyle: {
      ...Platform.select({
        ios: {fontFamily: 'Arial',},
        android: {fontFamily: 'Roboto'},
      }),
    },
  };

  state = {
    amount:0,
    loading:false
  };

  addHandler = () => {
    this.setState({loading:true});
    const item = this.props.navigation.state.params.item;
    const user = firebase.auth().currentUser;
    const accountRef = firebase.database().ref('account/' + user.uid);
    const totalAmount = Number(item.amount) + Number(this.state.amount);
    accountRef.child(item.kind).child(item.name).set(totalAmount)
      .then((result) => {
        const acivityRef = firebase.database().ref('activity/' + user.uid);
        acivityRef.push({
          kind: item.kind,
          symbol: item.name,
          action: 'add',
          amount: this.state.amount,
          created: Date.now()
        });
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

    const formFooter = (this.state.loading) ? (
      <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>
    ):(
      <Button icon={{name: 'add'}} title='Add' onPress={this.addHandler} buttonStyle={{marginTop: 30}}/>
    );

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'} >
        <FormLabel>Amount in VND</FormLabel>
        <FormInput onChangeText={(v) => this.setState({amount: v})}
                   containerStyle={{borderColor: '#ccc', borderWidth: 1}}
                   keyboardType="numeric"/>
        {formFooter}
        {/*<Text>*/}
          {/*{JSON.stringify(this.props)}*!/*/}
        {/*</Text>*/}
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
