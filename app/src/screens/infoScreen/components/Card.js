import React, {useEffect, useState} from 'react';

import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';

const Card = (props) => {
    const material = props.material.item
    console.log(material)

    return(
        <View style = {styles.materialButton}>
            <Text style ={styles.header}>{material.nombre}</Text>
            <Text style ={styles.title}>¿Cómo reciclar este material?</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    materialButton: {
        backgroundColor: '#fff',
        height: 300,
        width: 310,
        marginTop: 15,
        borderRadius: 18,
        marginBottom: 10,
        alignItems: 'center',
        elevation: 8,
    },
    header: {
        color: '#333',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    title: {
        color: '#333',
        marginTop: 5,
        fontSize: 18
    }

});

export default Card