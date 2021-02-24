import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-native';
// redux
import { connect } from 'react-redux';
// style
import { View, Text, BackHandler, TouchableOpacity, Image } from 'react-native';
import { Button, InputItem, Icon } from '@ant-design/react-native';
import { userInfo } from '../style';

// import { formStyle, loginForm, recoveryForm } from '../style';
// import { Item, Input } from 'native-base';

class UserInfo extends Component {


  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress",() => {this.props.history.goBack(); return true} )
  }

  render() {
    const { Profile } = this.props;
    console.log(">>>>>>>>>>>", Profile)

    const { firstname, image, lastname } = Profile;
    return (
      <View style={ userInfo.container }>
        <View style={ userInfo.userData}>
          {image ? (
            <Image source={{ uri: image }} style={{ width: 80, height: 80, alignSelf: 'center', margin: 5, borderRadius: 40 }} />
          ) : (
            <Icon name="user" size="lg" />
          )}
          <View>
          <Text style={userInfo.username}>
            {firstname} {lastname}
            </Text>
            <View style={userInfo.xp}>
              <Text style={{color: "white"}}>1XP</Text>
            </View>
            <View style={userInfo.totalBugs}>
              <View style={ [userInfo.divider, userInfo.bugItem] }>
                  <Text>Accepted</Text>
                  <Text>0</Text>
              </View>
              <View style={userInfo.bugItem}>
                  <Text>Declined</Text>
                  <Text>0</Text>

              </View>
            </View>
          </View>
          </View>
      </View>
    );
  }
}

const get = state => ({ Profile: state.Profile });

export default connect(get)(UserInfo);
