import React, {PureComponent} from 'react';
import {
  TouchableHighlight
} from 'react-native';
import { ListItem } from "react-native-elements";

class ActivityListItem extends PureComponent {

  render() {
    // console.log({uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + this.props.poster_path});
    return (
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate('Detail', {
          movie: {
            title: this.props.title,
            overview: this.props.overview,
            avatar: { uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + this.props.poster_path },
          },
        })}
      >
        <ListItem
          roundAvatar
          title={this.props.title}
          subtitle={this.props.overview}
          avatar={{ uri: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + this.props.poster_path }}
        />
      </TouchableHighlight>
    );
  }
}

export default ActivityListItem;