import React, { Component } from 'react';
import { Link } from 'react-router-native';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
// redux
import { connect } from 'react-redux';
import { POST } from '../store/actioncreators';
import { user_login } from '../store/endpoints';
// style
import { Button, InputItem } from '@ant-design/react-native';
import { formStyle, loginForm, recoveryForm } from '../style';
import { Icon } from '@ant-design/react-native';
import { Item, Input } from 'native-base';


class Login extends Component {
  state = { email: '', password: '', error: false, passwordHidden: true};

  handleSubmit = async () => {
    const { dispatch, onAuthorize } = this.props;
    const { email, password } = this.state;
    const response = await dispatch(POST(user_login, { email, password }));
    if (response.code == 200) onAuthorize(true, response.result.authToken);
    else this.setState({ error: response.message });
  };

  togglePassword = () => {
    this.setState({passwordHidden: !this.state.passwordHidden})
  }

  render() {
    const { error } = this.state;
    return (
      <KeyboardAvoidingView style={loginForm.view} behavior="padding">
        <Image
          source={require("../assets/login.png")}
        />

        <View style={ loginForm.inputContainer }>
        <Text style={ formStyle.filedText }>Email</Text>
        <View style= { formStyle.inputWrapper }>
          <Item style={recoveryForm.input}>

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

         <View style={ loginForm.inputContainer }>
         <Text style={ formStyle.filedText }>Password</Text>
         <View style= { formStyle.inputWrapper }>

            <Item style={recoveryForm.input}>
              <Icon active name='lock' />
              <Input
                type="text"
                secureTextEntry={ this.state.passwordHidden ? true : false}
                placeholder='Password'
                name="password"
                onChangeText={password => this.setState({ password, error: false })}
                />
             { this.state.passwordHidden ? <Icon name="eye-invisible" onPress={() => this.togglePassword()}/> : <Icon name="eye" onPress={() => this.togglePassword()}/> }
             </Item>
             </View>
          </View>

          <Link to="/recover">
            <Text style={ loginForm.link } children="Forgot password" />
          </Link>
        {error && <Text style={formStyle.error}> {error}</Text>}
        <Button ghost={ true } style={formStyle.button} onPress={this.handleSubmit}>
          <Text style={formStyle.submitButton}>Login</Text>
        </Button>
        <View style={ loginForm.signUpView }><Text style={ loginForm.signupText }> Don't have an account?</Text><Link to="/register"><Text style={ loginForm.blueText }>Sign up!</Text></Link></View>
        <View style={ loginForm.signUpView }>
          <Image source={require("../assets/fbIcon.png")}/><Text>{"   "}</Text>
          <Image source={require("../assets/googleIcon.png")}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(Login);
