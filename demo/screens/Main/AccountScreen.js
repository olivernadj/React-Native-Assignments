import React from 'react';
import {FlatList, Platform, ScrollView, StyleSheet, TouchableHighlight, View, ActivityIndicator} from 'react-native';
import {List, ListItem, Text, Card, Divider} from 'react-native-elements';
import firebase from "../../firebase";

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'My Account',
    headerTitleStyle: {
      ...Platform.select({
        ios: {fontFamily: 'Arial',},
        android: {fontFamily: 'Roboto'},
      }),
    },
  };

  state = {
    loading: false,
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
    this.willFocus = this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.updateAccount();
      }
    );
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

  renderRow = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate('AccountItemDetail', {
          item: item,
        })}
      >
        <ListItem
          containerStyle={{ borderBottomWidth: 0 }}
          title={item.name}
          subtitle={parseFloat(item.amount).toFixed(2)}
        />
      </TouchableHighlight>
    )
  };

  renderWalletList = () => {
    let walletList = null;
    if (this.state.loading === true) {
      walletList = <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop: 30}}/>;
    } else {
      const wallet = [];
      for (let key in this.state.account['wallet']) {
        wallet.push({name: key, amount: this.state.account['wallet'][key], kind: 'wallet'});
      }
      walletList = (
        <FlatList
          data={wallet}
          renderItem={this.renderRow}
          ItemSeparatorComponent={() => (<Divider style={{ backgroundColor: '#ccc' }} />)}
          keyExtractor={item => item.name}
        />
      );
    }
    return walletList;
  };

  renderBookList = () => {
    let bookList = null;
    if (this.state.loading === true) {
      bookList = <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>;
    } else {
      const book = [];
      for (let key in this.state.account['book']) {
        book.push({name: key, amount: this.state.account['book'][key], kind: 'book'});
      }
      bookList = (
        <FlatList
          data={book}
          renderItem={this.renderRow}
          ItemSeparatorComponent={() => (<Divider style={{ backgroundColor: '#ccc' }} />)}
          keyExtractor={item => item.name}
        />
      );

    }
    return bookList;
  };

  render () {
    return (
      <ScrollView style={styles.container}>
        <Card title="My Wallet">
          <Text style={{marginBottom: 10}}>
            Accessible money.
          </Text>
          {this.renderWalletList()}
        </Card>
        <Card title="My Book">
          <Text style={{marginBottom: 10}}>
            Owned tokens.
          </Text>
          {this.renderBookList()}
        </Card>
        <View style={{ margin:50, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
          <Text> Have a question? </Text>
          <TouchableHighlight onPress={() => {alert("Error: Not implemented yet.");}}>
            <Text style={{fontWeight: 'bold', color:'blue', textDecorationLine: 'underline'}}> View our FAQs </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
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
