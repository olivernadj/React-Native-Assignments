import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';

const Item = (props) => {
  // console.log('Item.js props', props);
  return (
    <div>
      <Card>
        <CardImg top width="100%" src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + props.poster_path}
                 alt="Card image cap"/>
        <CardBody>
          <CardTitle>{props.title}</CardTitle>
          <CardSubtitle>{props.release_date}</CardSubtitle>
          <CardText>{props.overview}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Item;