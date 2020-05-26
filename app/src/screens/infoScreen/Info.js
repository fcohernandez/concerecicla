import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {useRoute} from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { changeTitle } from '../../actions/headerAction';

const Info = () => {

    return(
        <View style = {styles.container}>
            <Text>Pantalla Info</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default Info;