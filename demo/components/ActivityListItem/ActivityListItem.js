import React, {PureComponent} from 'react';
import {
  TouchableHighlight
} from 'react-native';
import { ListItem } from "react-native-elements";

class ActivityListItem extends PureComponent {

  render() {
    const item = this.props.item;
    const itemCreated = new Date(item.created);
    return (
      <TouchableHighlight
        onPress={this.props.touched}
      >
        <ListItem
          rightTitle={itemCreated.toISOString()}
          containerStyle={{ borderBottomWidth: 0 }}
          title={item.symbol + ' ' + item.action}
          subtitle={parseFloat(item.amount).toFixed(2)}
        />
      </TouchableHighlight>
    )
  }
}

export default ActivityListItem;
