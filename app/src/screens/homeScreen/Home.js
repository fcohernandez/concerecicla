import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Modal, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { AirbnbRating } from 'react-native-ratings';

import { fetchPoints, fetchComments } from '../../actions/pointsAction'

import { FontAwesome5 } from '@expo/vector-icons';
import Comentario from './components/Comentario';

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

      dispatch(fetchComments(punto._id))

      setModalVisible(true)
    }

    const ratingCompleted = ( rating ) => {
      console.log( `Rating is: ${rating}` );
    }

    const puntos = useSelector(state => state.pointsReducer.puntos)
    
    const comentarios = useSelector(state => state.commentsReducer.comentarios)
    //console.log(puntos)

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
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10, marginTop: 10}}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>   
                          <FontAwesome5 name="window-close" color={'#333'} size={36} />
                        </TouchableOpacity>
                        </View>

                        <View style={{height: 200}}>
                          <ScrollView horizontal = {true} style={{marginTop: 10, marginRight: 10, marginLeft: 10}}>
                            <Image
                              style={{ width: 200, height: 200, marginHorizontal: 10 }}
                              source={require('../../../assets/imagen1.png')}
                            />
                            <Image
                              style={{ width: 200, height: 200 }}
                              source={require('../../../assets/imagen2.png')}
                            />
                          </ScrollView>
                        </View>
                        <View style={{alignItems:'center'}}>
                          <Text style={{fontWeight: 'bold', fontSize: 30}}>{point.nombre}</Text>
                        </View>
                        <View style={{ justifyContent: 'center'}}>
                          <AirbnbRating
                            count={10}
                            reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                            defaultRating={point.puntuacion}
                            size={20}
                            reviewSize= {1}
                            onFinishRating={(e) => ratingCompleted(e)}
                            isDisabled = {true}
                          />
                        </View>
                        <View style = {{backgroundColor: '#95c52d', borderRadius: 18, marginLeft: 10, marginRight: 10,paddingBottom: 10, marginTop: 10}}>
                          <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}> Dirección: {point.descripcion}</Text>
                          </View>
                          <View style={{flexDirection: 'row', marginLeft: 10}}>
                            <Text style = {{color: '#fff', fontWeight: 'bold'}}>Materiales: asdsa asdas asdasd asddsa</Text>
                          </View>
                          <View style={{flexDirection: 'row', marginLeft: 10}}>
                            <Text style = {{color: '#fff', fontWeight: 'bold'}}>Horario: 18:00-20:00</Text>
                          </View>
                        </View>

                        <View style = {{alignItems: 'center'}}>
                            <TouchableOpacity style = {styles.recycleButton} onPress = {() => recicla()}>
                                <Text style = {{color: '#fff', fontSize: 28}}>Valorar</Text>
                            </TouchableOpacity>
                        </View>
                        <Comentario/>
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
      backgroundColor: '#ecf4f3'
    },
    recycleButton: {
      backgroundColor: '#4f4085',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: 160,
      marginTop: 10,
      borderRadius: 18,
      marginBottom: 10
    },
  });

  export default Home;