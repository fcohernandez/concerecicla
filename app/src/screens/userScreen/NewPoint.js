import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import {View, Text, StyleSheet, TextInput, CheckBox, Button, ScrollView, Dimensions} from 'react-native';
import {fetchPoints} from '../../actions/pointsAction'

const windowWidth = Dimensions.get('window').width;

const Points = ({navigation}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [plastic, setPlastic] = useState(false)
    const [paper, setPaper] = useState(false)
    const [glass, setGlass] = useState(false)
    const [battery, setBattery] = useState(false)
    const [organic, setOrganic] = useState(false)
    const [address, setAddress] = useState('')
    let materials = []

    const dispatch = useDispatch();

    const setMaterials = () => {
        if(plastic)
            materials.push("1")
        if(paper)
            materials.push("2")
        if(glass)
            materials.push("3")
        if(battery)
            materials.push("4")
        if(organic)
            materials.push("5")
    }

    const setCoordinates = (e) => {
        setLatitude(e.nativeEvent.coordinate.latitude)
        setLongitude(e.nativeEvent.coordinate.longitude)
        console.log(latitude, longitude)
    }

    const postPoint = () => {
        setMaterials()
        fetch(`http://192.168.18.169:3000/puntolimpio`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: name,
                    descripcion: description,
                    location: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    materiales: materials,
                    direccion: address
                })
            })
            .then(response => response.json())  // promise
            .then(json => {
                if(!json.ok){
                    console.log(json)
                }
                dispatch(fetchPoints)
                navigation.goBack()
                console.log(json)
            })  
    }


    return(
        <ScrollView style = {styles.container}>
            <Text>Pantalla nuevos puntos</Text>
            <MapView
                    style = {styles.mapStyle}
                    initialRegion={{
                        latitude: -36.827093734017495,
                        longitude: -73.05026829242706,
                        latitudeDelta: 0.025,
                        longitudeDelta: 0.025}}
                    onPress = {(e)=>setCoordinates(e)}
            >
                <Marker
                    coordinate={{latitude, longitude}}
                    title={'lol'}
                    description='testttt'
                    //onPress = {() => setModalInfo(punto)}
                    key = {'12ads'}
                />
            </MapView>

            <TextInput
                style={styles.input}
                value = {name}
                onChangeText = {text => setName(text)}
                placeholder = "Nombre punto limpio"
                autoCapitalize = 'none'
            />
            <TextInput
                style={styles.input}
                value = {description}
                onChangeText = {text => setDescription(text)}
                placeholder = "Descripción punto limpio"
                autoCapitalize = 'none'
            />
            <TextInput
                style={styles.input}
                value = {address}
                onChangeText = {text => setAddress(text)}
                placeholder = "Dirección punto limpio"
                autoCapitalize = 'none'
            />
            <View style ={{flexDirection: 'row'}}>
                <CheckBox
                    value={plastic}
                    onValueChange={setPlastic}
                    
                />
                <Text style={{alignSelf: 'center'}}> Plásticos</Text>
                <CheckBox
                    value={paper}
                    onValueChange={setPaper}
                    
                />
                <Text style={{alignSelf: 'center'}}>Papeles y cartones</Text>
            </View>
            <View style ={{flexDirection: 'row'}}>
                <CheckBox
                    value={glass}
                    onValueChange={setGlass}
                    
                />
                <Text style={{alignSelf: 'center'}}>Vidrios</Text>
                <CheckBox
                    value={battery}
                    onValueChange={setBattery}
                    
                />
                <Text style={{alignSelf: 'center'}}>Baterías</Text>
                <CheckBox
                    value={organic}
                    onValueChange={setOrganic}
                    
                />
                <Text style={{alignSelf: 'center'}}>Desechos orgánicos</Text>
            </View>
            <Button title="Agregar punto" onPress={()=>postPoint()}/>
        </ScrollView>
    )
}

export default Points;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 28,
        width: windowWidth - 40,
        height: 45,
        paddingLeft: 15,
        marginBottom: 15,
        marginTop: 15
    },
    mapStyle: {
        width: 400,
        height: 400,
        zIndex: -1,
        marginBottom: 15,
        marginTop: 20
    },
})