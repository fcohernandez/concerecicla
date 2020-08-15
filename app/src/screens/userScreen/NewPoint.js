import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import {View, Text, StyleSheet, TextInput, CheckBox, Button, ScrollView} from 'react-native';

const Points = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [plastic, setPlastic] = useState(false)
    const [paper, setPaper] = useState(false)
    const [glass, setGlass] = useState(false)
    const [battery, setBattery] = useState(false)
    const [organic, setOrganic] = useState(false)
    let materials = []

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

    const test = (e) => {
        console.log(e.nativeEvent.coordinate)
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
                    materiales: materials
                })
            })
            .then(response => response.json())  // promise
            .then(json => {
                if(!json.ok){
                    console.log(json)
                }
                console.log(json)
            })  
    }


    return(
        <ScrollView style = {styles.container}>
            <Text>Pantalla nuevos puntos</Text>
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
            
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    style={styles.inputCoord}
                    value = {longitude}
                    onChangeText = {text => setLongitude(text)}
                    placeholder = "Longitud"
                    autoCapitalize = 'none'
                />
                <TextInput
                    style={styles.inputCoord}
                    value = {latitude}
                    onChangeText = {text => setLatitude(text)}
                    placeholder = "Latitud"
                    autoCapitalize = 'none'
                />
            </View>

            <MapView
                    style = {styles.mapStyle}
                    initialRegion={{
                        latitude: -36.827093734017495,
                        longitude: -73.05026829242706,
                        latitudeDelta: 0.025,
                        longitudeDelta: 0.025}}
                    onPress = {(e)=>test(e)}
            ></MapView>

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
            </View>
            <View style ={{flexDirection: 'row'}}>
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
        width: 280,
        height: 45,
        paddingLeft: 15,
        marginBottom: 15
    },
    inputCoord: {
        backgroundColor: '#fff',
        borderRadius: 28,
        width: 130,
        height: 45,
        paddingLeft: 15,
        marginBottom: 15,
        marginLeft: 10,
        marginRight:10
    },
    mapStyle: {
        width: 400,
        height: 400,
        zIndex: -1
    },
})