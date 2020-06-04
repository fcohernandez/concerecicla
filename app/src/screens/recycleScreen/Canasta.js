import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, AsyncStorage} from 'react-native';

import Card from './components/Card';



const Canasta = (props) => {
    const [paperCount, setPaperCount] = useState(0)
    const [glassCount, setGlassCount] = useState(0)
    const [batteryCount, setBatteryCount] = useState(0)
    const [organicCount, setOrganicCount] = useState(0)
    const [plasticCount, setPlasticCount] = useState(0)

    const recicla = () => {
        let materiales = []
        let token

        if(plasticCount > 0){
            materiales.push({material: "1", cantidad: plasticCount})
        }
    
        if(paperCount > 0){
            materiales.push({material: "2", cantidad: paperCount})
        }
    
        if(glassCount > 0){
            materiales.push({material: "3", cantidad: glassCount})
        }
    
        if(batteryCount > 0){
            materiales.push({material: "4", cantidad: batteryCount})
        }
    
        if(organicCount > 0){
            materiales.push({material: "5", cantidad: organicCount})
        }

        //return Alert.alert(JSON.stringify(materiales))

        AsyncStorage.getItem('@token', (err, res) => {
            fetch(`http://192.168.18.169:3000/recicla`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    materiales,
                    token: res
                })
            })
            .then(response => response.json())  // promise
            .then(json => {
                if(!json.ok){
                    return Alert.alert(json.msg)
                }
                Alert.alert(`Reciclaje realizado con éxito!`)
            })
        })


        setPaperCount(0)
        setGlassCount(0)
        setBatteryCount(0)
        setOrganicCount(0)
        setPlasticCount(0)
        
    }

    return(
        <View style = {styles.container}>
            <View style = {styles.rowContainerTop}>
                <Card 
                    count = {paperCount} 
                    setCount = {setPaperCount}
                    icon = {'newspaper'}
                    text = {'Papeles y cartones'}
                    svg = {false}
                    color = {'#e56e25'}
                />
                <Card 
                    count = {glassCount} 
                    setCount = {setGlassCount}
                    icon = {'wine-bottle'}
                    text = {'Vidrios'}
                    svg = {false}
                    color = {'#4eb966'}
                />
            </View>
            <View style = {styles.rowContainer}>
                <Card 
                    count = {batteryCount} 
                    setCount = {setBatteryCount}
                    icon = {'car-battery'}
                    text = {'Baterías'}
                    svg = {false}
                    color = {'#3ba3d2'}
                />
                <Card 
                    count = {organicCount} 
                    setCount = {setOrganicCount}
                    icon = {'organic'}
                    text = {'Desechos orgánicos'}
                    svg = {true}
                />
            </View>
            <View style = {styles.rowContainer}>
                <Card 
                    count = {plasticCount} 
                    setCount = {setPlasticCount}
                    icon = {'plastic'}
                    text = {'Plásticos'}
                    svg = {true}
                />
            </View>
            <View style = {{alignItems: 'center'}}>
                <TouchableOpacity style = {styles.recycleButton} onPress = {() => recicla()}>
                    <Text style = {{color: '#fff', fontSize: 28}}>Reciclar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf4f3',
    },
    rowContainerTop: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 15
    },
    rowContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 15
    },
    recycleButton: {
        backgroundColor: '#4f4085',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 200,
        marginTop: 15,
        borderRadius: 18
    },

  });

export default Canasta;