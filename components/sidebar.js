import React from 'react';
// native modules
import { Text, Image, ScrollView,View,TouchableWithoutFeedback, Platform } from 'react-native';
// style
import { Icon, WingBlank, InputItem, Toast, Portal } from '@ant-design/react-native';
import { POST, PUT, ActionCreator } from '../store/actioncreators';
import { user_upload_avatar, user_update, user_update_password } from '../store/endpoints';
import { UPDATE_PROFILE } from '../store/actiontypes';

import { styles } from '../style';
import { List, CardItem } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


// routes
import { PrivateRoutes } from '../constants/routes';

export const sidebar = (Profile, Logout, drawer, history, dispatch) => {
  this.getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') return 0;
    this.ImagePicker(Platform.OS);
  };

  this.makeFile = file => {
    let localUri = file.uri;
    let name = localUri.split('/').pop();
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(name);
    let type = match ? `image/${match[1]}` : `image`;
    return { uri:localUri, type, name };
  };

  this.ImagePicker = async os => {
    // const { dispatch } = this.props;
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
  const { firstname, image, lastname } = Profile;

  return (
    <ScrollView style={[styles.container]}>
      <TouchableWithoutFeedback onPress={() => history.push("/dashboard/user_info")}>
      <View style={ styles.userData}>
        {image ? (
          <Image source={{ uri: image }} style={{ width: 80, height: 80, alignSelf: 'center', margin: 5, borderRadius: 40 }} />
        ) : (
          <Icon name="user" size="lg" />
        )}
        <Text style={styles.username}>
          {firstname} {lastname}
          </Text>
          <View style={styles.dash}/>
          <View>
            <Text style={styles.balanceText}>Your Balance</Text>
            <Text style={styles.balance}>$here will be balance</Text>
          </View>
      </View>
      </TouchableWithoutFeedback>

        {PrivateRoutes.map(
          item =>
            item.isMenuItem && (
              <CardItem
               key={ item.key }
               style={styles.item}
               button
               onPress= {() => history.push(item.path)}
              >
                {

                  item.key === 2 ? <Icon name="inbox" /> :
                  item.key === 3 ? <Icon name="folder"/> :
                  item.key === 7 ? <Icon name="credit-card" /> :
                  item.key === 8 ? <Icon name="message" /> :
                  item.key === 4 ? <Icon name="setting" />: null
                }
                <Text style={styles.text}>
                  {item.name}
                </Text>
              </CardItem>
            )
        )}
        <CardItem button onPress={ Logout }>
          <Icon name="logout" />
          <Text style={styles.text} >Logout</Text>
        </CardItem>
    </ScrollView>
  );
};
