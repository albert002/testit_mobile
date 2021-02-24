import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@ant-design/react-native';

const Empty = (
  <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', padding: 40 }}>
    <Icon name="rest" style={{ margin: 10, fontSize: 64 }} />
    <Text style={{ color: 'gray' }}>No Data</Text>
  </View>
);
export default Empty;
