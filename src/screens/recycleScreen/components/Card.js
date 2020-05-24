import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import OrganicIcon from '../../../../assets/organicIcon.svg';
import PlasticIcon from '../../../../assets/plasticIcon.svg';

const Card = (props) => {

    const {count, setCount, icon, text, svg, color} = props

    const selectSvg = () =>{
        switch(icon){
            case 'organic':
                return <OrganicIcon width={40} height={40}/>
            case 'plastic':
                return <PlasticIcon width={40} height={40}/>
            default:
                break;
        }
    }

    return(
        <View style = {styles.cardContainer}>
            <View style = {{flexDirection: 'row'}}>
                { svg ? 
                    selectSvg(): 
                    <FontAwesome5 name={icon} color={color} size={40} />
                }
                <Text style = {{marginHorizontal: 10, color: '#333', fontWeight: 'bold'}}>{text}</Text>
            </View>
            <View style = {{flexDirection: 'row', marginTop: 30, justifyContent: 'center'}}>
                <TouchableOpacity style = {styles.minusButton} onPress = { () => setCount(count - 1) }>
                    <Text style = {styles.buttons}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.contCointainer}>
                    <Text style = {styles.cont}>{count}</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.plusButton} onPress = { () => setCount(count + 1) }>
                    <Text style = {styles.buttons}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    cardContainer: {
        height: 140, 
        width: 140, 
        backgroundColor: '#fff', 
        borderRadius: 18,
        marginHorizontal: 10,
        elevation: 10,
        padding: 12,
    },
    minusButton: {
        backgroundColor: '#a79fc2', 
        borderRadius: 15, 
        width: 30, 
        height: 30, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginHorizontal: 5
    },
    plusButton: {
        backgroundColor: '#4f4085', 
        borderRadius: 15, 
        width: 30, 
        height: 30, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginHorizontal: 5
    },
    contCointainer: {
        backgroundColor: '#fff', 
        borderRadius: 15, 
        width: 30, 
        height: 30, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginHorizontal: 5,
        borderColor: '#333',
        borderWidth: 2
    },
    buttons: {
        color: '#fff', 
        fontWeight: 'bold'
    },
    cont: {
        color: '#333', 
        fontWeight: 'bold'
    }
  });
