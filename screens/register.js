import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-native';
import { View, Text, BackHandler, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
// redux
import { connect } from 'react-redux';
import { POST } from '../store/actioncreators';
import { user_register } from '../store/endpoints';
// style
import { Button, InputItem, Icon } from '@ant-design/react-native';
import { formStyle, loginForm, recoveryForm, registerForm } from '../style';
import { Item, Input } from 'native-base';


class Register extends Component {
  state = { succes: false, error: false, passwordHidden: true,form: { email: '', password: '', firstname: '', lastname: '' } };

  handleSubmit = async () => {
    const { form } = this.state;
    const { dispatch } = this.props;
    const response = await dispatch(POST(user_register, form));

    if (response.code === 200) this.setState({ succes: true });
    else this.setState({ error: response.message });
  };

  togglePassword = () => {
    this.setState({passwordHidden: !this.state.passwordHidden})
  }

  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress",() => {this.props.history.goBack(); return true} )
  }

  render() {
    const { succes, error } = this.state;
    if (succes) return <Redirect to="/login" />;

    return (
      <KeyboardAvoidingView style={loginForm.view} behavior="padding">
      <Text style={{fontSize: 18, marginRight: "54%", marginBottom: 20}}>Create your account</Text>

        <View style={registerForm.inputContainer}>
        <Text style={ formStyle.filedText }>Firstname</Text>
        <View style= { formStyle.inputWrapper }>
          <Item style={recoveryForm.input}>
           <Icon active name='user' />
           <Input
              type="text"
              placeholder='Firstname'
              name="firstname"
              onChangeText={firstname => this.setState({ ...this.state, error: false, form: { ...this.state.form, firstname } })}
            />
          </Item>
          </View>
         </View>

         <View style={registerForm.inputContainer}>
         <Text style={ formStyle.filedText }>Lastname</Text>
         <View style= { formStyle.inputWrapper }>
           <Item style={recoveryForm.input}>
            <Icon active name='user' />
            <Input
               type="text"
               placeholder='Lastname'
               name="lastname"
               onChangeText={lastname => this.setState({ ...this.state, error: false, form: { ...this.state.form, lastname } })}
             />
            </Item>
            </View>
          </View>

          <View style={registerForm.inputContainer}>
          <Text style={ formStyle.filedText }>Email</Text>
          <View style= { formStyle.inputWrapper }>
            <Item style={recoveryForm.input}>
             <Icon active name='mail' />
             <Input
                type="text"
                placeholder='Email'
                name="email"
                onChangeText={email => this.setState({ ...this.state, error: false, form: { ...this.state.form, email } })}
              />
            </Item>
            </View>
           </View>

           <View style={registerForm.inputContainer}>
           <Text style={ formStyle.filedText }>Password</Text>
           <View style= { formStyle.inputWrapper }>
             <Item style={recoveryForm.input}>
              <Icon active name='lock' />
              <Input
                 type="password"
                 secureTextEntry={ this.state.passwordHidden ? true : false}
                 placeholder='Password'
                 name="password"
                 onChangeText={password => this.setState({ ...this.state, error: false, form: { ...this.state.form, password } })}
               />
               { this.state.passwordHidden ? <Icon name="eye-invisible" onPress={() => this.togglePassword()}/> : <Icon name="eye" onPress={() => this.togglePassword()}/> }
               </Item>
               </View>
            </View>
            <View style={ [loginForm.signUpView, {marginBottom: 10, marginRight: "28%", marginTop: 10}] }><Text style={ loginForm.signupText }> Do you already have an account?</Text><Link to="/login"><Text style={ loginForm.blueText }>Sign in!</Text></Link></View>


        {error && <Text style={formStyle.error}> {error}</Text>}
        <Button type="primary" style={formStyle.button} onPress={this.handleSubmit}>
          Register
        </Button>

        <View style={ loginForm.signUpView }>
          <Image source={require("../assets/fbIcon.png")}/><Text>{"   "}</Text>
          <Image source={require("../assets/googleIcon.png")}/>
        </View>
        <TouchableOpacity style={recoveryForm.goBack} onPress={() => {this.props.history.goBack(); return true}}><Icon name="arrow-left" className="backIcon"/><Text style={recoveryForm.link}> Register</Text></TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(Register);
