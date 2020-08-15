import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, StyleSheet, Button} from 'react-native';

const Points = ({navigation}) => {
    let puntos = useSelector(state => state.pointsReducer.puntos)
    console.log(puntos)
    return(
        <View style = {styles.container}>
            <Text>Pantalla puntos</Text>
            <Button title="Agregar punto" onPress={()=>navigation.navigate('newpoint')}/>
        </View>
    )
}

export default Points;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})