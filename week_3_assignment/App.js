import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import firedb from './database.js';

export default class App extends React.Component {

  componentDidMount() {
    firedb.ref('/messages').on('value', (snapshot) => {
      console.log(snapshot.val());
    });

    firedb.ref('/messages').push({
      name: "Pushmethod",
      message: "I am not sure will it work.",
      timestamp: Date.now()
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
