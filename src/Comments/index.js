import * as React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

import { EVENT_ID } from '../helpers/constants';
import { getKindAndStory } from '../helpers/utils';

import {
  Title, Message, Button, Input, Comment, Container, Preloader, Form,
} from './styled';

class Comments extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: localStorage.getItem('name') || '',
      message: '',
      data: null,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { channel } = this.props;
    channel.on(EVENT_ID, this.onEventHandler);
  }

  onEventHandler = (config) => {
    // eslint-disable-next-line react/prop-types
    const { api } = this.props;

    firebase.initializeApp(config);

    api.onStory(() => this.getFirebaseData());
  };

  onToggleLoader = () => this.setState(prev => ({ isLoading: !prev.isLoading }));

  onChange = ({ currentTarget }) => {
    this.setState({ [currentTarget.name]: currentTarget.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, message } = this.state;
    this.onToggleLoader();
    localStorage.setItem('name', name);

    firebase
      .database()
      .ref(getKindAndStory())
      .push({
        name,
        message,
        createdAt: new Date().toLocaleString(),
      });

    this.setState({ message: '' }, this.getFirebaseData);
  }

  getFirebaseData = () => {
    this.onToggleLoader();

    firebase
      .database()
      .ref(getKindAndStory())
      .once('value')
      .then(snapshot => this.setState({ isLoading: false, data: snapshot.val() }));
  };

  render() {
    const {
      name, message, isLoading, data,
    } = this.state;
    return (
      <Container>
        {isLoading ? (
          <Preloader>loading...</Preloader>
        ) : (
          data && Object.keys(data).map(commentID => (
            <Comment key={commentID}>
              <Title>
                {data[commentID].name}
                &nbsp;
                <span>{data[commentID].createdAt}</span>
              </Title>
              <Message>{data[commentID].message}</Message>
            </Comment>
          ))
        )}

        <Form onSubmit={this.onSubmit}>
          <Input required placeholder="name" onChange={this.onChange} name="name" type="text" value={name} disabled={!!localStorage.getItem('name')} />
          <Input required placeholder="message" onChange={this.onChange} name="message" type="text" value={message} />

          <Button onSubmit={this.onSubmit} type="submit">submit</Button>
        </Form>
      </Container>
    );
  }
}

export default Comments;
