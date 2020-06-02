import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Canasta from '../screens/recycleScreen/Canasta'
import Historial from '../screens/recycleScreen/Historial'

const Tab = createMaterialTopTabNavigator();


const RecyclaNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions = {{
        style : { backgroundColor: '#fff', color: '#fff' },
          activeTintColor: '#333',
          pressOpacity: 0.8,
          pressColor: '#ffc',
        }}
    >
      <Tab.Screen name="Canasta" component={Canasta} />
      <Tab.Screen name="Historial" component={Historial} />
    </Tab.Navigator>
  );
}

export default RecyclaNavigator;