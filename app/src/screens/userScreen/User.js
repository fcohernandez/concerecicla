import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TextInput, AsyncStorage, TouchableOpacity } from 'react-native';

import { login } from '../../actions/authAction';

import { useDispatch } from 'react-redux';

import { changeTitle } from '../../actions/headerAction';

const User = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        AsyncStorage.getItem('@userInfo', (err, res) => {
            let userInfo = JSON.parse(res)
            setNombre(userInfo.nombre)
            setApellido(userInfo.apellido)
        })
    },[])

    const logOut = () => {
        dispatch(login(false))
    }

    return(
        <View style = {styles.container}>
            <Text style={styles.texto}>Nombre</Text>
            <TextInput 
                style = {styles.input}
                value = {nombre}
                placeholder = 'Nombre'
            />
            <Text style={styles.texto}>Apellido</Text>
            <TextInput 
                style = {styles.input}
                value = {apellido}
                placeholder = 'Apellido'
            />
            <Text style={styles.texto}>Edad</Text>
            <TextInput 
                style = {styles.input}
                value = ''
                placeholder = "Edad"
            />
            <TouchableOpacity 
                    style = {styles.saveButton}
                    onPress={ () => actualizarInfo()}
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