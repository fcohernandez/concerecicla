import React, {useState} from 'react'
import { View, StyleSheet, Text, Dimensions, ActivityIndicator, Modal, Alert, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const ModalView = (props) => {

    console.log(props)

    return(
        <View style = {styles.container}>
            <View style= {{flexDirection: 'row'}}>
                <Text style = {{color: '#333', marginTop: 5}}>Francisco Hernández: </Text>
                <Text style = {{color: '#333', marginTop: 5, marginLeft: 100}}>02/04/2019 </Text>
            </View>
            <Text style = {{color: '#333', marginTop: 10}}>Este punto limpio me parece una maravilla, 10/10</Text>
            <View style = {{}}>

                <AirbnbRating
                    count={10}
                    defaultRating={10}
                    size={20}
                    reviewSize= {1}
                    isDisabled = {true}
                />
            </View>
        </View>
    )

}

export default ModalView;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10,
        padding: 10
    }
})