import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

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