import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  ActivityIndicator,
  FlatList
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
    bids: [],
    bidsLoading: false,
    asks: [],
    asksLoading: false,
  };

  componentDidMount() {
    this.updateTabContent();
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
            bids.push({key:key, ...res[key], action:'bid'});
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
            asks.push({key:key, ...res[key], action:'ask'});
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
    return (
      <Card title="Bids">
        <Text style={{marginBottom: 10}}>
          Buying offers.
        </Text>
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
    return (
      <Card title="Asks">
        <Text style={{marginBottom: 10}}>
          Selling offers.
        </Text>
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
