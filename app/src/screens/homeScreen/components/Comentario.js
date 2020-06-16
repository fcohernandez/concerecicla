import React, {useState} from 'react'
import { View, StyleSheet, Text, Dimensions, ActivityIndicator, Modal, Alert, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const ModalView = (props) => {

    const {userName, userLastName, descripcion, fecha, puntuacion} = props.comentario.item
    const test = new Date(fecha)

    const date = `${test.getFullYear()}/${test.getMonth() + 1}/${test.getDate()}`

    return(
        <>
        <View style = {styles.container}>
            <View style= {{flexDirection: 'row'}}>
                <Text style = {{color: '#333', marginTop: 5}}>{userName} {userLastName} </Text>
                <Text style = {{color: '#333', marginTop: 5, marginLeft: 100}}>{date} </Text>
            </View>
            <Text style = {{color: '#333', marginTop: 10}}>{descripcion}</Text>
            <View style = {{}}>

                <AirbnbRating
                    count={10}
                    defaultRating={puntuacion || 10}
                    size={20}
                    reviewSize= {1}
                    isDisabled = {true}
                />
            </View>
        </View>
        
        </>
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