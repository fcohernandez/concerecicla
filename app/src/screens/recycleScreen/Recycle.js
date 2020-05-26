import React, {useState} from 'react';
import { View, StyleSheet, Text} from 'react-native';

import Canasta from './Canasta';
import Historial from './Historial';

const Recycle = () => {

    const [opacityCanasta, setOpacityCanasta] = useState(1)
    const [opacityHistorial, setOpacityHistorial] = useState(0.3)
    const [canastaScreen, setCanastaScreen] = useState(true)

    const changeOpacityCanasta = () => {
         setOpacityCanasta(1)
         setOpacityHistorial(0.3)
         setCanastaScreen(true)
    }

    const changeOpacityHistorial = () => {
        setOpacityCanasta(0.3)
        setOpacityHistorial(1)
        setCanastaScreen(false)
    }

    return(
        <View style = {styles.container}>
            <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
                <Text onPress = {() => changeOpacityCanasta()} style = {[styles.headerText, {opacity: opacityCanasta}]}>Canasta</Text>
                <Text onPress = {() => changeOpacityHistorial()} style = {[styles.headerText, {opacity: opacityHistorial}]}>Historial</Text>
            </View>
            { canastaScreen ? <Canasta/> : <Historial/>}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf4f3',
    },
    headerText: {
        color: '#333', 
        fontSize: 28, 
        marginRight: 10
    }
  });

  export default Recycle;