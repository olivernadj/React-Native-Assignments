import React from 'react';
import {ScrollView, StyleSheet, View, Text, Platform} from 'react-native';
import {Card, Button, Icon} from "react-native-elements";

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


  state = {
    actions: {
      VND: [
        {
          label: 'Add',
          icon: 'add',
        },
        {
          label: 'Send',
          icon: 'send',
        },
        {
          label: 'Convert',
          icon: 'swap-horiz',
        },
        {
          label: 'Activity',
          icon: 'list',
        }
      ],
      ETH: [
        {
          label: 'Add',
          icon: 'add',
        },
        {
          label: 'Send',
          icon: 'send',
        },
        {
          label: 'Convert',
          icon: 'swap-horiz',
        },
        {
          label: 'Activity',
          icon: 'list',
        }
      ],
      SVT: [
        {
          label: 'Buy',
          icon: 'unfold-less',
        },
        {
          label: 'Sell',
          icon: 'unfold-more',
        },
        {
          label: 'Activity',
          icon: 'list',
        }
      ]
    }
  };


  actionHandler = (label) => {
    const item = this.props.navigation.state.params.item;
    const expression = item.name + label;
    //console.log(expression);
    switch(expression) {
      case 'VNDAdd':
        this.props.navigation.navigate('AccountItemVNDAdd', {
          item: item
        });
        break;
      case 'VNDActivity':
      case 'ETHActivity':
      case 'SVTActivity':
        this.props.navigation.navigate('AccountItem' + expression, {
          item: item
        });
        break;
      default:
        alert("Error: Not implemented yet.");
    }
  };

  render() {
    const item = this.props.navigation.state.params.item;

    let actionIcons = null;

    if (this.state.actions[item.name] !== undefined) {
      actionIcons = this.state.actions[item.name].map( (a) => {
        // console.log(a);
        return (
          <View key={a.label} style={styles.actionContainer}>
            <Icon
              containerStyle={{margin:2}}
              raised
              reverse
              color="#aaa"
              name={a.icon}
              title={a.label}
              onPress={() => this.actionHandler(a.label)}
            />
            <Text>
              {a.label}
            </Text>
          </View>
        );
      });
    }

    return (
      <ScrollView style={styles.container}>
        <View>
          {/*<Text>*/}
            {/*{JSON.stringify(this.props)}*/}
          {/*</Text>*/}
          <Card title={item.amount.toFixed(2) + " " + item.name}>
            <Text style={{marginBottom: 10}}>
              Owned tokens.
            </Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
              {actionIcons}
            </View>
          </Card>
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
  actionContainer: {
    width: 50,
    margin:5,
    // borderColor: 'green',
    // borderWidth: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems:'center'
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  }
});
