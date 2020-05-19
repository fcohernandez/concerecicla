import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Recycle = () => {
    return(
        <View style = {styles.container}>
            <Text>Pantalla Recycle</Text>
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

  export default Recycle;