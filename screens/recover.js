import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-native';
// redux
import { connect } from 'react-redux';
import { POST } from '../store/actioncreators';
import { user_recover } from '../store/endpoints';
// style
import { View, Text, BackHandler, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { Button, Icon } from '@ant-design/react-native';
import { formStyle, loginForm, recoveryForm } from '../style';
import { Item, Input } from 'native-base';

class Recover extends Component {
  state = { email: '', error: false, succes: false };

  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress",() => {this.props.history.goBack(); return true} )
  }

  handleSubmit = async () => {
    const { dispatch } = this.props;
    const { email } = this.state;
    const response = await dispatch(POST(user_recover, { email }));
    if (response.code == 200) this.setState({ succes: true });
    else this.setState({ error: response.message });
  };

  render() {
    const { error, succes } = this.state;
    if (succes) return <View style={formStyle.view} children={<Text style={formStyle.heading} children="Check you mail to confirm" />} />;
    return (
      <KeyboardAvoidingView style={recoveryForm.view} behavior="padding">
        <Image source={require("../assets/forgotPassword.png")}/>
        <Text style={ recoveryForm.forgotText } children="Forgot password?"/>
        <Text style={ recoveryForm.recoveryText } children="We will send recovery link to your email" />
        <View style={ recoveryForm.inputContainer }>
        <Text style={ formStyle.filedText }>Email</Text>
        <View style= { formStyle.inputWrapper }>
          <Item style={ recoveryForm.input }>
           <Icon active name='mail' />
              <Input
                type="text"
                placeholder='Email'
                name="email"
                onChangeText={email => this.setState({ email, error: false })}
              />
            </Item>
            </View>
         </View>
        {error && <Text style={formStyle.error} children="{error}" />}
        <Button type="primary" style={ [formStyle.button, {marginTop: 20}] } onPress={this.handleSubmit} children="Reset password" />
        <TouchableOpacity style={recoveryForm.goBack} onPress={() => {this.props.history.goBack(); return true}}><Icon name="arrow-left" className="backIcon"/><Text style={recoveryForm.link}> Forgot Password</Text></TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(Recover);
