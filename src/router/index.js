import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Beranda, DetilAnime, Search, Splash} from '../pages';
import JadwalRilis from '../pages/TabMenu/JadwalRilis';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Beranda" component={Beranda} />
      <Stack.Screen name="DetilAnime" component={DetilAnime} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="JadwalRilis" component={JadwalRilis} />
    </Stack.Navigator>
  );
};

export default Router;
