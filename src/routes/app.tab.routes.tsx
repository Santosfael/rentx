import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppStackRoutes } from './app.stack.routes';
import { MyCars } from '../screens/MyCars';
import { Home } from '../screens/Home';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen
        name='AppStackRoutes'
        component={AppStackRoutes}
      />

      <Screen
        name='Profile'
        component={Home}
      />

      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  );
}