import React, { Component } from 'react';

//react  native modules
import { View, Image, Platform, Text, BackHandler } from 'react-native';
// style
import FadeInView from '../components/animated_view';
import { Provider, Accordion, WhiteSpace, Toast, InputItem, Button, Portal, WingBlank, Icon } from '@ant-design/react-native';
import { accordion, formStyle } from '../style';
import {List, ListItem, Form, Input, Item, Header, Left, Body, Button as ButtonBase} from "native-base"
// redux
import { connect } from 'react-redux';
import { POST, PUT, ActionCreator } from '../store/actioncreators';
import { user_upload_avatar, user_update, user_update_password } from '../store/endpoints';
import { UPDATE_PROFILE } from '../store/actiontypes';
// expo
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
//

class Settings extends Component {
  constructor(props) {
    super(props);
    const { firstname, lastname } = props.Profile;
    this.state = {
      activeSections: [],
      firstname,
      lastname,
      personal_error: false,
      old_password: '',
      new_password: '',
      confirm_password: '',
      pass_error: false,
    };
  }

  onChange = activeSections => this.setState({ activeSections });

  componentDidMount(){
    const { history } = this.props;
    BackHandler.addEventListener("hardwareBackPress", () => {
      history.goBack();
      return true
    })
  }

  onPersonalSubmit = async event => {
    const toast = Toast.loading('Loading...');
    event.preventDefault();
    const { dispatch } = this.props;
    const { firstname, lastname } = this.state;
    const response = await dispatch(PUT(user_update, { firstname, lastname }));
    if (response.code === 200) {
      Portal.remove(toast);
      Toast.success(response.message, 2);
      dispatch(ActionCreator(UPDATE_PROFILE, response.result));
    } else {
      Portal.remove(x);
      Toast.fail(response.message, 3);
    }
  };

  onPasswordChange = async () => {
    const toast = Toast.loading('Loading...');
    const { dispatch } = this.props;
    const { old_password, new_password, confirm_password } = this.state;
    if (new_password === confirm_password) {
      const response = await dispatch(POST(user_update_password, { oldPassword: old_password, newPassword: new_password }));
      if (response.code === 200) {
        console.log('here')
        Portal.remove(toast);
        Toast.success(response.message, 2);
      } else {
        Portal.remove(toast);
        Toast.fail(response.message, 3);
      }
    } else {
      Portal.remove(toast);
      Toast.fail('Password need to match', 1);
    }
  };
  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') return 0;
    this.ImagePicker(Platform.OS);
  };

  // make file from uploaded image
  makeFile = file => {
    let localUri = file.uri;
    let name = localUri.split('/').pop();
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(name);
    let type = match ? `image/${match[1]}` : `image`;
    return { uri:localUri, type, name };
  };

  ImagePicker = async os => {
    const { dispatch } = this.props;
    // check os type
    const picker = os === 'ios' ? ImagePicker.launchImageLibraryAsync : ImagePicker.launchCameraAsync;
    const file = await picker({ aspect: [4, 4], quality: 0.6, allowsEditing: true });
    if (file.cancelled === false) {
      const toast = Toast.loading('uploading');
      const fileOptions = this.makeFile(file);
      console.log(file);
      const data = new FormData();
      data.append('image', fileOptions);
      const response = await dispatch(PUT(user_upload_avatar, data, true));
      if (response.code === 200) {
        Portal.remove(toast);
        Toast.success(response.message, 2);
        dispatch(ActionCreator(UPDATE_PROFILE, { image: response.url }));
      } else {
        Portal.remove(toast);
        Toast.fail(response.message, 3);
      }
      console.log('response', response);
    } else {
      return;
    }
  };

  render() {
    const { firstname, lastname, old_password, new_password, confirm_password } = this.state;
    const { history } = this.props;
    const { image } = this.props.Profile;
    return (
      <Provider>
      <Header
        style={{
          padding: 10,
          backgroundColor: "#4b5b6a",
          marginBottom: 10
        }}
      >
        <Left>
          <ButtonBase transparent onPress={() => history.goBack()}>
            <Icon name="arrow-left" />
          </ButtonBase>
        </Left>
        <Body>
        <Text style={{color: "white", marginLeft: -10, fontSize: 18}}>
          Settings
        </Text>
        </Body>
      </Header>
        <FadeInView>
          <View>
            <WingBlank style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              {image ? (
                <Image source={{ uri: image }} style={{ width: 80, height: 80, alignSelf: 'center', margin: 5, borderRadius: 40 }} />
              ) : (
                <Icon name="user" size="lg" />
              )}
              <WhiteSpace />
              <Button type="ghost" size="small" onPress={this.getPermissionAsync} children="Change avatar" />
              <InputItem type="file" />
            </WingBlank>
            <WhiteSpace />
            <Accordion
              onChange={this.onChange}
              activeSections={this.state.activeSections}
              expandMultiple
              sectionContainerStyle={accordion.heading}
              containerStyle={accordion.panel}
              underlayColor="lightgray"
            >
              <Accordion.Panel header="Profile">
                <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                  <InputItem
                    type="text"
                    value={firstname}
                    ref={this.firstname}
                    placeholder="Firstname"
                    name="firstname"
                    style={formStyle.input}
                    onChangeText={firstname => this.setState({ firstname, personal_error: false })}
                  />
                  <InputItem
                    type="text"
                    value={lastname}
                    ref={this.lastname}
                    placeholder="Lastname"
                    name="lastname"
                    style={formStyle.input}
                    onChangeText={lastname => this.setState({ lastname, personal_error: false })}
                  />
                  <Button type="primary" style={formStyle.button} onPress={this.onPersonalSubmit} children="Submit" />
                </View>
              </Accordion.Panel>

              <Accordion.Panel header="Password">
                <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                  <InputItem
                    type="password"
                    value={old_password}
                    placeholder="Old Password"
                    name="old_password"
                    style={formStyle.input}
                    onChangeText={old_password => this.setState({ old_password, pass_error: false })}
                  />
                  <InputItem
                    type="password"
                    value={new_password}
                    placeholder="New Password"
                    name="new_password"
                    style={formStyle.input}
                    onChangeText={new_password => this.setState({ new_password, pass_error: false })}
                  />
                  <InputItem
                    type="password"
                    value={confirm_password}
                    placeholder="ConfirmNew Password"
                    name="confirm_password"
                    style={formStyle.input}
                    onChangeText={confirm_password => this.setState({ confirm_password, pass_error: false })}
                  />
                  <Button type="primary" style={formStyle.button} onPress={this.onPasswordChange} children="Submit" />
                </View>
              </Accordion.Panel>
            </Accordion>
          </View>
        </FadeInView>
      </Provider>
    );
  }
}
const get = state => {
  return { Profile: state.Profile };
};
export default connect(get)(Settings);
