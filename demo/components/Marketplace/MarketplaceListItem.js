import React, {PureComponent} from 'react';
import {
  TouchableHighlight
} from 'react-native';
import {Icon, ListItem} from "react-native-elements";

class MarketplaceListItem extends PureComponent {

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
          title={parseFloat(item.price) + ' VND'}
          subtitle={parseFloat(item.amount).toFixed(2) + ' SVT'}
          leftIcon={{
            name:actionIcons[item.action],
            color:'#ccc',
          }}
        />
      </TouchableHighlight>
    )
  }
}

export default MarketplaceListItem;


const actionIcons = {
  bid: 'unfold-less',
  ask: 'unfold-more',
};
