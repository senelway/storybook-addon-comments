import * as React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { Grid, Row, Col } from 'reflexer';

import { EVENT_ID } from '../../constants';

import {
  Title, Message, Button, Input, Comment,
} from './styled';

class Comments extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: localStorage.getItem('name', ''),
      message: '',
      data: {},
    };
  }

  componentDidMount() {
    // eslint-disable-next-line
    const { channel } = this.props;
    channel.on(EVENT_ID, this.onEventHandler);
  }

  onEventHandler = (config) => {
    firebase.initializeApp(config);
    this.getData();
  };

  onToggleLoader = () => this.setState(prev => ({ isLoading: !prev.isLoading }));

  onChange = ({ currentTarget }) => {
    this.setState({ [currentTarget.name]: currentTarget.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, message } = this.state;
    // eslint-disable-next-line
    this.props.api.onStory((kind, story) => {
      localStorage.setItem('name', name);
      firebase.database().ref(`${kind}/${story}`).push({
        name,
        message,
        createdAt: new Date().toLocaleString(),
      });
      this.getData();
    });
  }

  getData = () => {
    this.onToggleLoader();
    // eslint-disable-next-line
    this.props.api.onStory((kind, story) => (
      firebase
        .database()
        .ref(`${kind}/${story}`)
        .once('value')
        .then(snapshot => this.setState({ isLoading: false, data: snapshot.val() || {} }))
    ));
  };

  render() {
    const {
      name, message, isLoading, data,
    } = this.state;

    return (
      <Grid fluid>

        {isLoading && <div>loading...</div>}
        <Row>
          <Col basis={{ xs: 12, md: 8 }}>
            {data && Object.keys(data).map(commentID => (
              <Comment key={commentID}>
                <Title>
                  {data[commentID].name}
                  &nbsp;
                  <span>{data[commentID].createdAt}</span>
                </Title>
                <Message>{data[commentID].message}</Message>
              </Comment>
            ))}
          </Col>

          <Col as="form" basis={{ xs: 12, md: 4 }} onSubmit={this.onSubmit}>
            <Input required onChange={this.onChange} name="name" type="text" value={name} disabled={!!localStorage.getItem('name')} />
            <Input required placeholder="message" onChange={this.onChange} name="message" type="text" value={message} />

            <Button onSubmit={this.onSubmit} type="submit">submit</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Comments;
