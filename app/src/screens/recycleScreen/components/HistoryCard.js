import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import OrganicIcon from '../../../../assets/organicIcon';
import PlasticIcon from '../../../../assets/plasticIcon.svg';

const HistoryCard = (props) => {

    const {fecha, materiales} = props.historial.item

    const test = new Date(fecha)

    const date = `${test.getFullYear()}/${test.getMonth() + 1}/${test.getDate()}`


    return (
        <View style = {styles.cardHistory}>
            <Text style = {{fontWeight: 'bold'}}>{date}</Text>
            {
                materiales.map(material => {
                    if(material.material == "1")
                        return <PlasticIcon height={30} width={30} key={material.material}/>
                    if(material.material == "2")
                        return <FontAwesome5 name='newspaper' color='#e56e25' size={30} key={material.material}/>
                    if(material.material == "3")
                        return <FontAwesome5 name='wine-bottle' color='#4eb966' size={30} key={material.material} />
                    if(material.material == "4")
                        return <FontAwesome5 name='car-battery' color='#3ba3d2' size={30} key={material.material}/>
                    if(material.material == "5")
                        return <OrganicIcon height={30} width={30} key={material.material}/>
                })
            }
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