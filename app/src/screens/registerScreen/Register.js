import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, TextInput, Alert, Image } from 'react-native';
import { useDispatch } from 'react-redux';

import { login } from '../../actions/authAction';

const Register = () => {

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const dispatch = useDispatch();

    const log = () => {
        dispatch(login(true))
    }

    return(
        <View style = {styles.container}>
            <ImageBackground source={require('../../../assets/loginBackgroud.png')} style={styles.image}>
                <Image source={require('../../../assets/logoRecycle.png')} style={styles.logo}/>
                <Text style={styles.textLogo}>CONCE RECICLA</Text>
                <TextInput
                    style = {styles.input}
                    value = {name}
                    onChangeText = {text => setName(text)}
                    placeholder = "Nombre"
                />
                <TextInput
                    style = {styles.input}
                    value = {lastname}
                    onChangeText = {text => setLastName(text)}
                    placeholder = "Apellido"
                />
                <TextInput
                    style = {styles.input}
                    value = {email}
                    onChangeText = {text => setEmail(text)}
                    placeholder = "Correo electrónico"
                />
                <TextInput
                    style = {styles.input}
                    value = {pwd}
                    onChangeText = {text => setPwd(text)}
                    placeholder = "Contraseña"
                />
                <TextInput
                    style = {styles.input}
                    value = {confirmPwd}
                    onChangeText = {text => setConfirmPwd(text)}
                    placeholder = "Confirmar contraseña"
                />
                <TouchableOpacity 
                    style = {styles.loginButton}
                    onPress={ () => log()}
                >
                    <Text style = { styles.textLogin }>Registrarme</Text>
                </TouchableOpacity>
            </ImageBackground>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#fff',
        height: 40, 
        width: 250,
        borderRadius: 20,
        margin: 10,
        paddingLeft: 20,
    },
    logo: {
        height: 220, 
        width: 220
    }, 
    textLogo: {
        fontSize: 24, 
        color: '#fff', 
        fontStyle: 'italic', 
        fontWeight: 'bold',
        marginBottom: 25
    },
    loginButton: {
        backgroundColor: '#4f4085',
        borderRadius: 40,
        width: 180,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    textLogin: {
        fontSize: 20,
        color: '#fff',
    },
  });

  export default Register;