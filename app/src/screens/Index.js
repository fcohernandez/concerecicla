import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from '../navigators/MainNavigator';

  
export default function Index() {
    return (
      <SafeAreaView style = { styles.container }>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  })
