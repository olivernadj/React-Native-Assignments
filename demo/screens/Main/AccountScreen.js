import React from 'react';
import {FlatList, Platform, ScrollView, StyleSheet, TouchableHighlight, View, ActivityIndicator} from 'react-native';
import {List, ListItem, Text, Card, Divider} from 'react-native-elements';
import firebase from "../../firebase";

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Account',
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
        USD: 0
      }
    },
  };

  list = [
    {
      name: 'VND',
      amount: 0
    },
    {
      name: 'SVT',
      amount: 0
    }
  ];

  componentDidMount() {
    this.setState({
      loading: true,
    });
    firebase.database().ref('account/ze78h9SH9lg32swj7VZwh0GuGIl1').once('value', (snapshot) => {
      const res = snapshot.val();
      if (res !== null) {
        const mergedAccount = this.state.account;
        for (let key in this.state.account) {
          if (res[key] !== undefined)  {
            mergedAccount[key] = {...mergedAccount[key], ...res[key]}
          }
        }
        this.setState({loading: false, account:mergedAccount});
      } else {
        this.setState({loading: false});
      }
    });
  }

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
          subtitle={item.amount.toFixed(2)}
        />
      </TouchableHighlight>
    )
  };

  render () {
    let walletList = <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>;
    let bookList = <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>;

    if (this.state.loading === false) {

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

    return (
      <ScrollView style={styles.container}>
        <Card title="My Wallet">
          <Text style={{marginBottom: 10}}>
            Accessible money.
          </Text>
          {walletList}
        </Card>
        <Card title="My Book">
          <Text style={{marginBottom: 10}}>
            Owned tokens.
          </Text>
          {bookList}
        </Card>
        <View style={{ margin:50, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
          <Text> Have a question? </Text>
          <TouchableHighlight onPress={this.signUpHandler}>
            <Text style={{fontWeight: 'bold', color:'blue', textDecorationLine: 'underline'}}> View our FAQs </Text>
          </TouchableHighlight>
        </View>
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
