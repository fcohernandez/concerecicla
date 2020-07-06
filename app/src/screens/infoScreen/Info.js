import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';

import {fetchMaterials } from './../../actions/materialsAction'

import { useDispatch, useSelector } from 'react-redux';


const Info = () => {

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMaterials())
        setLoading(false)
    }, []);

    let materiales = useSelector(state => state.materialsReducer.materiales)

    return(
        <View style = {styles.container}>
            {
                loading ?
                <ActivityIndicator size="large" color="#0000ff" />:
                materiales.map(material => {
                    return(
                        <View style = {styles.materialButton}>
                            <Text>{material.nombre}</Text>
                        </View>
                    )
                })
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf4f3',
      alignItems: 'center',
    },
    materialButton: {
        backgroundColor: '#fff',
        height: 80,
        width: 240,
        marginTop: 15,
        borderRadius: 18
    }
  });

  export default Info;