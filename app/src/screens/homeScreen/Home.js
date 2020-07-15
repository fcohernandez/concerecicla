import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Modal, Text, TouchableOpacity, ScrollView, Image, FlatList, TextInput, Alert, AsyncStorage} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { AirbnbRating } from 'react-native-ratings';

import { fetchPoints, fetchComments } from '../../actions/pointsAction'
import { fetchMaterials } from '../../actions/materialsAction'

import { FontAwesome5 } from '@expo/vector-icons';
import Comentario from './components/Comentario';

const Home = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [point, setPoint] = useState({})
    const [loadingComentarios, setLoadingComentarios] = useState(true)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalComentario, setModalComentario] = useState(false)

    const [rating, setRating] = useState(0)
    const [descripcion, setDescripcion] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Debe permitir que la aplicación tenga acceso a su localización para poder utilizarla de forma correcta');
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })()
      dispatch(fetchPoints())
      dispatch(fetchMaterials())
    }, []);
  
    const setModalInfo = (punto) => {

      setPoint(punto);

      dispatch(fetchComments(punto._id))

      setModalVisible(true)
      setLoadingComentarios(false)
    }

    const ratingCompleted = ( rating ) => {
      setRating(rating)
    }

    const postComentario = () => {

      AsyncStorage.getItem('@token', (err, res) => {
        fetch(`http://192.168.18.169:3000/comentario`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: res,
                    puntoId: point._id,
                    descripcion,
                    puntuacion: rating
                })
            })
            .then(response => response.json())  // promise
            .then(json => {
                if(!json.ok){
                  setModalComentario(false)
                    return Alert.alert(json.msg)
                    
                }

                Alert.alert('Comentario registrado!')
                setModalComentario(false)
                setModalVisible(false)
                

                fetch(`http://192.168.18.169:3000/puntolimpio/${point._id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    totalPuntuaciones: point.totalPuntuaciones,
                    rating,
                    puntuacion: point.puntuacion
                })
                })
                .then(response => response.json())  // promise
                .then(json => {
                    if(!json.ok){
                        return Alert.alert(json.msg)
                        
                    }
                    dispatch(fetchPoints())
                })
                })
      })
      
    }

    let puntos = useSelector(state => state.pointsReducer.puntos)
    
    let comentarios = useSelector(state => state.commentsReducer.comentarios)

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
                            defaultRating={point.puntuacionPromedio}
                            size={20}
                            reviewSize= {1}
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
                            <TouchableOpacity style = {styles.recycleButton} onPress = {() => setModalComentario(true)}>
                                <Text style = {{color: '#fff', fontSize: 28}}>Valorar</Text>
                            </TouchableOpacity>
                        </View>

                        {
                          loadingComentarios ?
                              <ActivityIndicator size="large" color="#0000ff" />
                            :

                            <FlatList
                              data={comentarios}
                              renderItem = {item => <Comentario comentario = {item}/>}
                              keyExtractor={item => item._id}
                            />
                        }
                        
                    </View>
                </Modal>

                <Modal
                    animationType = "slide"
                    transparent = {true}
                    visible = {modalComentario}
                >
                  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000080'}}>
                    <View style={{width: 300,height: 400, backgroundColor: '#fff', borderRadius: 18}}>
                      <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10, marginTop: 10}}>
                          <TouchableOpacity onPress={() => setModalComentario(false)}>   
                            <FontAwesome5 name="window-close" color={'#333'} size={36} />
                          </TouchableOpacity>
                      </View>
                      <TextInput 
                        style = 
                        {{borderRadius: 18, 
                          borderColor: '#95c52d', 
                          borderWidth: 2, 
                          padding: 10, 
                          height: 140,
                          marginLeft: 10,
                          marginRight: 10,
                          marginTop: 10}}
                          multiline = {true}
                          placeholder = "Escriba aquí su comentario"
                          onChangeText = {text => setDescripcion(text)}
                        />

                      <AirbnbRating
                          count={10}
                          reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                          defaultRating={rating}
                          size={20}
                          reviewSize= {20}
                          onFinishRating={(e) => ratingCompleted(e)}
                      />
                      <View style={{alignItems: 'center', marginTop: 20}}>
                        <TouchableOpacity style = {styles.recycleButton} onPress = {() => postComentario()}>
                          <Text style = {{color: '#fff', fontSize: 28, alignSelf: 'center'}}>Comentar</Text>
                        </TouchableOpacity>
                      </View>
                      
                    </View>
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