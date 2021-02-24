import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { formStyle } from '../style';

export const Loader = <View style={formStyle.view} children={<ActivityIndicator size="large" />} />;
