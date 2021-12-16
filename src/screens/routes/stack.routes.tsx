import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../Home';
import { CarDetails } from '../CarDetails';
import { Scheduling } from '../Scheduling';
import { SchedulingDetails } from '../SchedulingDetails';
import { SchedulingComplete } from '../SchedulingComplete';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen
        name='Home'
        component={Home}
      />

      <Screen
        name='CarDetails'
        component={CarDetails}
      />

      <Screen
        name='Scheduling'
        component={Scheduling}
      />

      <Screen
        name='SchedulingDetails'
        component={SchedulingDetails}
      />

      <Screen
        name='SchedulingComplete'
        component={SchedulingComplete}
      />
    </Navigator>
  );
}