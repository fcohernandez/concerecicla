import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TextInput, AsyncStorage, TouchableOpacity, Alert } from 'react-native';

import { login } from '../../actions/authAction';

import { useDispatch } from 'react-redux';


const User = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [userId, setUserId] = useState('')
    const [edad, setEdad] = useState('0')

    const dispatch = useDispatch();

    useEffect(() => {
        AsyncStorage.getItem('@userInfo', (err, res) => {
            let userInfo = JSON.parse(res)
            setNombre(userInfo.nombre)
            setApellido(userInfo.apellido)
            setUserId(userInfo._id)
        })
    },[])

    const logOut = () => {
        dispatch(login(false))
    }

    const updateUser = () => {
        fetch(`http://192.168.18.169:3000/usuario/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                apellido,
            })
        })
        .then(response => response.json())  // promise
        .then(json => {
            if(!json.ok){
                return Alert.alert(json.msg)
            }

            let user = JSON.stringify(json.usuario)

            AsyncStorage.setItem('@userInfo', user, (res, err) => {
                if(err){
                    console.log(err)
                }

                Alert.alert('Usuario actualizado correctamente!')
                
           }) 
        })
    }

    return(
        <View style = {styles.container}>
            <Text style={styles.texto}>Nombre</Text>
            <TextInput 
                style = {styles.input}
                value = {nombre}
                placeholder = 'Nombre'
                onChangeText = {text => setNombre(text)}
            />
            <Text style={styles.texto}>Apellido</Text>
            <TextInput 
                style = {styles.input}
                value = {apellido}
                placeholder = 'Apellido'
                onChangeText = {text => setApellido(text)}
            />
            <Text style={styles.texto}>Edad</Text>
            <TextInput 
                style = {styles.input}
                value = {edad}
                placeholder = "Edad"
                onChangeText = {text => setEdad(text)}
            />
            <TouchableOpacity 
                    style = {styles.saveButton}
                    onPress={ () => updateUser()}
            >
                <Text style = { styles.textSave }>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                    style = {styles.cerrarSesion}
                    onPress={ () => logOut()}
            >
                <Text style = { styles.textSesion }>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf4f3',
      alignItems: 'center',
      marginTop: 20
    },
    input: {
        backgroundColor: '#fff',
        height: 40, 
        width: 240,
        borderRadius: 20,
        margin: 10,
        paddingLeft: 20,
    },
    texto: {
        color: '#333'
    },
    saveButton: {
        backgroundColor: '#4f4085',
        borderRadius: 40,
        width: 180,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    textSave: {
        fontSize: 20,
        color: '#fff',
    },
    cerrarSesion: {
        backgroundColor: '#4f4a85',
        borderRadius: 40,
        width: 140,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    textSesion: {
        fontSize: 18,
        color: '#fff',
    },
  });

  export default User;