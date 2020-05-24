import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Card from './components/Card';

const Recycle = () => {

    const [paperCount, setPaperCount] = useState(0)
    const [glassCount, setGlassCount] = useState(0)
    const [batteryCount, setBatteryCount] = useState(0)
    const [organicCount, setOrganicCount] = useState(0)
    const [plasticCount, setPlasticCount] = useState(0)

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
                <TouchableOpacity style = {styles.recycleButton}>
                    <Text style = {{color: '#fff', fontSize: 28}}>Reciclar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf4f3',
    },
    rowContainerTop: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 60
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

  export default Recycle;