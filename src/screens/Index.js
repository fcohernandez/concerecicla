import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from '../navigators/TabNavigator';

  
export default function Index() {
    return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );
  }
