import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList } from 'react-native';
import {
  List,
  ListItem
} from "react-native-elements";
import firedb from './database.js';

export default class App extends React.Component {

  state = {
    nickname: '',
    message: '',
    entered: false,
    loading: false,
    chat: []
  };

  componentDidMount() {
    firedb.ref('messages').limitToLast(20).on('value', (snapshot) => {
      const res = snapshot.val();
      const chat = [];
      for (let key in snapshot.val()) {
        chat.push(
          {...res[key], id: key}
        );
      }
      this.setState({chat: chat});
      // console.log(snapshot.val());
    });

  }

  enterToChatHandler = () => {
    //console.log(this.state.nickname);
    this.setState({entered: true});
  };


  sendMessageHandler = () => {
    console.log('sendMessageHandler');
    console.log(this.state.message);
    firedb.ref('messages').push({
      name: this.state.nickname,
      message: this.state.message,
      timestamp: Date.now()
    });
    this.setState({
      message : ''
    })
  };

  onChangeMessage = (text ) => {
    this.setState(({
      message : text
    }))
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };


  render() {

    let layout = '';

    if (this.state.entered) {
      layout = (
        <View style={styles.container}>
          <View style={styles.inputInfo}>
            <FlatList
              data={this.state.chat}
              refreshing={this.state.loading}
              renderItem={({item}) => (
                <View>
                  <Text>
                    {JSON.stringify(item)}
                  </Text>
                </View>)}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={this.renderSeparator}
              //ListFooterComponent={this.renderFooter}
            />
          </View>
          <View style={styles.inputForm}>
            <View style={styles.inputText}>
              <TextInput
                style={{height: 35, borderColor: 'gray', borderWidth: 1, margin: 5, backgroundColor: '#FFF'}}
                onChangeText={this.onChangeMessage}
                value={this.state.message}
              />
            </View>
            <View style={styles.inputButton}>
              <Button
                onPress={this.sendMessageHandler}
                title="Send"
                accessibilityLabel="Send message"
              />
            </View>
          </View>
        </View>
      );
    } else {
      layout = (
        <View style={styles.container}>
          <View style={styles.inputInfo}>
            <Text>Please input your nickname for chat!</Text>
          </View>
          <View style={styles.inputForm}>
            <View style={styles.inputText}>
              <TextInput
                style={{height: 35, borderColor: 'gray', borderWidth: 1, margin: 5, backgroundColor: '#FFF'}}
                onChangeText={(v) => this.setState({nickname:v})}
                value={this.state.nickname}
              />
            </View>
            <View style={styles.inputButton}>
              <Button
                onPress={this.enterToChatHandler}
                title="OK"
                accessibilityLabel="Enter to chat"
              />
            </View>
          </View>
        </View>
      );
    }

    return layout;
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  inputInfo: {
    margin: 5,
    // borderColor: 'gray',
    // borderWidth: 1,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ccc'
  },
  inputForm: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ccc'
  },
  inputText: {
    flex: 4,
    backgroundColor: '#ccc'
  },
  inputButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 5,
  },
});
