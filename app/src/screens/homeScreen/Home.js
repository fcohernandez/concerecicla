import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPoints } from '../../actions/pointsAction'

const Home = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [points, setPoints] = useState([])

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
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }

    const puntos = useSelector(state => state.pointsReducer.puntos)

    return(
        <View style = {styles.container}>
            {console.log(puntos)}
            { location ?
                <MapView
                    style = {styles.mapStyle}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.025,
                        longitudeDelta: 0.025}}
                >
                    <Marker
                        coordinate={{latitude: -36.92572621746226, longitude: -73.02273273468018}}
                        title='prueba'
                        description='testttt'
                    />
                </MapView> 
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
    },
  });

  export default Home;