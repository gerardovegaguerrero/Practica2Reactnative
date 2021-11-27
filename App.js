import React from 'react';
import {Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator1 from './Navigations/Stacknavigatior1';
export default function App() {
  return (
      <NavigationContainer>
        <StackNavigator1/>
      </NavigationContainer>
  );
}


