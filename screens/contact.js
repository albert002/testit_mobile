import React from 'react';
import { Text, BackHandler, KeyboardAvoidingView, View, TouchableWithoutFeedback } from 'react-native';
import { GiftedChat, Send, Composer } from 'react-native-gifted-chat';
import { Icon } from "native-base";
import * as DocumentPicker from "expo-document-picker";

//redux
import { POST, GET, ActionCreator } from '../store/actioncreators';
import {ADD_MESSAGE, GET_MESSAGES, ADD_NEW_MESSAGE} from "../store/actiontypes";
import {connect} from "react-redux";
import { get_messages } from '../store/endpoints';

import { send_message } from '../store/endpoints';


class Contact extends React.Component{
  state = {
    messages: [],
  }

  componentWillMount = () => {
    BackHandler.addEventListener("hardwareBackPress",() => {this.props.history.goBack(); return true} )
  }

  requestFile = async mime => {
    const file = await DocumentPicker.getDocumentAsync({
      type: mime === "image" ? "image/*" : mime === "video" ? "video/*" : "file/*"
    });
    if (file.type !== "cancel")
      mime === "image"
        ? await this.setState({image: [...this.state.image, {file}]})
        : await this.setState({video: [...this.state.video, {file}]});
    else return false;
  };

  renderComposer = props => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Composer {...props} />
      <View style={{marginRight: 15, marginVertical: 5}}>
      <TouchableWithoutFeedback onPress={() => this.requestFile("image")} >
        <Icon type="FontAwesome" name="image" />
      </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

  renderSend = props => {
    return(
      <Text>send</Text>
    )
  }

  async componentDidMount() {
    const {dispatch} = this.props;
    const { Messages, Profile } = this.props
    console.log("Profile date", this.props.Profile)
    console.log("<<<<<<<", Messages)
    const SortedMessages = Messages.map((item) => {
    return {
      _id: item.id,
      text: item.message,
      createdAt: item.create_time,
      role: item.role,
      user: {
        _id: item.role === "user" ? 1 : 2,
        name: item.role === "user" ? item.name : "Admin",
      }
    }
    })
    console.log("---------", SortedMessages)
    this.setState({messages: SortedMessages})
    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ],
    // })
  }

  async onSend(messages = []) {
    const { dispatch } = this.props;
      const resp = await dispatch(POST(send_message, {chat_id: 1, message: messages[0].text }))
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))

    console.log("Reeee", resp);
    if(resp.code === 200) {
      console.log("resp result", resp.result)
      dispatch(ActionCreator(ADD_NEW_MESSAGE, resp.result));
    }else{
      console.log("Server error")
    }
  }

  render(){
    console.log('messages>>>>>>', this.props.Messages)
    return(
      <>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        renderComposer={this.renderComposer}
        user={{
          _id: 1,
        }}
        isTyping = {true}
      />
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}/>
      </>
    )
  }
}

const get = state => ({Messages: state.Messages, Profile: state.Profile});

export default connect(get)(Contact);
