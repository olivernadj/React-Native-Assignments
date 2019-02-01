import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  ActivityIndicator,
  FlatList, TouchableHighlight
} from 'react-native';
import {ButtonGroup, Card, Divider} from 'react-native-elements';
import firebase from "../../firebase";
import MarketplaceListItem from "../../components/Marketplace/MarketplaceListItem";
import ActivityListItem from "./ActivityScreen";

export default class MarketplaceScreen extends React.Component {
  static navigationOptions = {
    title: 'Marketplace',
    headerTitleStyle: {
      ...Platform.select({
        ios: {fontFamily: 'Arial',},
        android: {fontFamily: 'Roboto'},
      }),
    },
  };

  state = {
    selectedIndex: 0,
    bidsLoading: false,
    bids: [],
    asksLoading: false,
    asks: [],
    accountLoading: false,
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

  componentDidMount() {
    this.updateTabContent();
    this.setState({
      accountLoading: true,
    });
    const user = firebase.auth().currentUser;
    firebase.database().ref('account/' + user.uid).once('value', (snapshot) => {
      const res = snapshot.val();
      if (res !== null) {
        const mergedAccount = this.state.account;
        for (let key in this.state.account) {
          if (res[key] !== undefined)  {
            mergedAccount[key] = {...mergedAccount[key], ...res[key]}
          }
        }
        this.setState({accountLoading: false, account:mergedAccount});
      } else {
        this.setState({accountLoading: false});
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.updateTabContent();
  }

  updateTabContent = () => {
    // console.log(this.state);
    if (this.state.selectedIndex === 0 && this.state.bids.length === 0 && this.state.bidsLoading === false) {
      this.setState({bidsLoading: true});
      firebase.database().ref('bids/' + 'SVT').once('value', (snapshot) => {
        const res = snapshot.val();
        // console.log(res);
        if (res !== null) {
          const bids = [];
          for (let key in res) {
            bids.push({key:key, ...res[key], action:'bid', symbol:'SVT'});
          }
          this.setState({bidsLoading: false, bids:bids});
        } else {
          this.setState({bidsLoading: false});
        }
      });
    }
    if (this.state.selectedIndex === 1 && this.state.asks.length === 0 && this.state.asksLoading === false) {
      this.setState({asksLoading: true});
      firebase.database().ref('asks/' + 'SVT').once('value', (snapshot) => {
        const res = snapshot.val();
        // console.log(res);
        if (res !== null) {
          const asks = [];
          for (let key in res) {
            asks.push({key:key, ...res[key], action:'ask', symbol:'SVT'});
          }
          this.setState({asksLoading: false, asks:asks});
        } else {
          this.setState({asksLoading: false});
        }
      });
    }
  };

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex});
  };


  renderBids = () => {
    let bids = <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>;
    if (this.state.bidsLoading === false) {
      if (this.state.bids.length !== 0) {
        bids = (
          <FlatList
            data={this.state.bids}
            renderItem={({item}) => (<MarketplaceListItem item={item} touched={() => {
              this.props.navigation.navigate(
                this.props.navigation.state.params.detailScreen, {item: item}
              )
            }}/>)}
            ItemSeparatorComponent={() => <Divider style={{backgroundColor: '#ccc'}}/>}
            keyExtractor={item => item.key.toString()}
          />
        );
      } else {
        bids = (
          <View style={{ margin:50, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
            <Text>At the moment there is no any Bids in the marketplace. </Text>
          </View>
        );
      }
    }
    let offerLink = null;

    if (this.state.accountLoading === false && this.state.account.wallet.VND > 0 ) {
      offerLink = (<TouchableHighlight onPress={() => {this.props.navigation.navigate('MarketplaceSVTBuy', {
          item: {name: 'SVT', amount: this.state.account['book']['SVT'], kind: 'book'}
        })}}>
        <Text style={{fontWeight: 'bold', color:'blue', textDecorationLine: 'underline'}}> Let's place a buying offer. </Text>
      </TouchableHighlight>);
    }

    return (
      <Card title="Bids">
        <View style={{ marginBottom: 10, flex: 1, flexDirection: 'column'}}>
          <Text> Buying offers. </Text>
          {offerLink}
        </View>
        {bids}
      </Card>
    );
  };

  renderAsks = () => {
    let asks = <ActivityIndicator size="large" color="#ccc" buttonStyle={{marginTop:30}}/>;
    if (this.state.asksLoading === false) {
      if (this.state.asks.length !== 0) {
        asks = (
          <FlatList
            data={this.state.asks}
            renderItem={({item}) => (<MarketplaceListItem item={item} touched={() => {
              this.props.navigation.navigate(
                this.props.navigation.state.params.detailScreen, {item: item}
              )
            }}/>)}
            ItemSeparatorComponent={() => <Divider style={{backgroundColor: '#ccc'}}/>}
            keyExtractor={item => item.key.toString()}
          />
        );
      } else {
        asks = (
          <View style={{ margin:50, flex: 1, flexDirection: 'row', justifyContent:'center'}}>
            <Text>At the moment there is no any Bids in the marketplace. </Text>
          </View>
        );
      }
    }

    let offerLink = null;

    if (this.state.accountLoading === false && this.state.account.book.SVT > 0 ) {
      offerLink = (<TouchableHighlight onPress={() => {this.props.navigation.navigate('MarketplaceSVTSell', {
          item: {name: 'SVT', amount: this.state.account['book']['SVT'], kind: 'book'}
        })}}>
        <Text style={{fontWeight: 'bold', color:'blue', textDecorationLine: 'underline'}}> Let's place a selling offer. </Text>
      </TouchableHighlight>);
    }

    return (
      <Card title="Asks">
        <View style={{ marginBottom: 10, flex: 1, flexDirection: 'column'}}>
          <Text> Selling offers. </Text>
          {offerLink}
        </View>
        {asks}
      </Card>
    );
  };


  render() {
    const buttons = ['Bids', 'Asks'];
    const { selectedIndex } = this.state;

    return (
      <ScrollView style={styles.container}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height:80}}
          selectedButtonStyle={{backgroundColor:'#fff'}}
          selectedTextStyle={{color:'#000'}}
          buttonStyle={{backgroundColor:'#aaa'}}
          textStyle={{color:'#fff'}}
          />
        {/*<View>*/}
          {/*<Text>*/}
            {/*{JSON.stringify(this.props)}}*/}
          {/*</Text>*/}
        {/*</View>*/}
        {selectedIndex === 0 ? this.renderBids() : this.renderAsks()}
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
