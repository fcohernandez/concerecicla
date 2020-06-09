import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Modal, Text, TouchableOpacity} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPoints } from '../../actions/pointsAction'

import ModalView from './components/Modal'

const Home = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [point, setPoint] = useState({})

    const [modalVisible, setModalVisible] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })()
      dispatch(fetchPoints())

    }, []);
  
    const setModalInfo = (punto) => {

      setPoint(punto);

      setModalVisible(true)
    }

    const puntos = useSelector(state => state.pointsReducer.puntos)

    return(
      <View style = {styles.container}>
            { location ?
            <>
                <MapView
                    style = {styles.mapStyle}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.025,
                        longitudeDelta: 0.025}}
                >
                {
                  puntos.map(punto => {
                    return(
                      <Marker
                        coordinate={{latitude: punto.location.coordinates[1], longitude: punto.location.coordinates[0]}}
                        title={punto.nombre}
                        description='testttt'
                        onPress = {() => setModalInfo(punto)}
                        key = {punto._id}
                      />
                    )        
                  })
                }
                    
                    
                </MapView>
                <Modal
                    animationType = "slide"
                    transparent = {true}
                    visible = {modalVisible}
                >
                    <View style= {styles.modal}>
                        <Text>{point.nombre}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                </>
            :
            <ActivityIndicator size="large" color="#0000ff" />} 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: -1
    },
    modal: {
      flex: 1,
      marginTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
    }
  });

  export default Home;