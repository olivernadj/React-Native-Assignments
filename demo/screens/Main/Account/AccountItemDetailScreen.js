import React from 'react';
import {ScrollView, StyleSheet, View, Text, Platform} from 'react-native';

export default class AccountItemDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Account Item Detail',
    headerTitleStyle: {
      ...Platform.select({
        ios: {fontFamily: 'Arial',},
        android: {fontFamily: 'Roboto'},
      }),
    },
  };


  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text>
            {JSON.stringify(this.props)}
          </Text>
        </View>
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
