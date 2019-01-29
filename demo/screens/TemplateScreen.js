import React from 'react';
import {ScrollView, StyleSheet, View, Text, Platform} from 'react-native';

export default class TemplateScreen extends React.Component {
  static navigationOptions = {
    title: 'Rename me',
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
        {/* this screens is not implemented. it works only as template */}
        <View>
          <Text>
            {JSON.stringify(this.props)}*/}
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
