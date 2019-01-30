import React from 'react';
import {ScrollView, StyleSheet, View, Text, Platform} from 'react-native';
import {ButtonGroup, Card} from 'react-native-elements';

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
    selectedIndex: 0
  };

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex});
  };


  renderBids = () => {
    return (
      <Card title="Bids">
        <Text style={{marginBottom: 10}}>
          Selling offers.
        </Text>
      </Card>
    );
  };

  renderAsks = () => {
    return (
      <Card title="Asks">
        <Text style={{marginBottom: 10}}>
          Buying offers.
        </Text>
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
          containerStyle={{}}
          />
        {/*<View>*/}
          {/*<Text>*/}
            {/*{JSON.stringify(this.props)}*!/*/}
          {/*</Text>*/}
        {/*</View>*/}
        {selectedIndex === 0 ? this.renderBids() : this.renderAsks()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
