import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const HistoryCard = (props) => {

    return (
        <View style = {styles.cardHistory}>
            <Text style = {{fontWeight: 'bold'}}>{props.date}</Text>
            <FontAwesome5 name='newspaper' color='#e56e25' size={30} />
            <FontAwesome5 name='wine-bottle' color='#4eb966' size={30} />
            <FontAwesome5 name='car-battery' color='#3ba3d2' size={30} />
        </View>
    )
}

const styles = StyleSheet.create({
    cardHistory: {
        backgroundColor: '#fff',
        height: 50,
        width: 280,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    }
  });

  export default HistoryCard;