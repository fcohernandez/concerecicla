import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, TextInput, Alert, Image } from 'react-native';
import { useDispatch } from 'react-redux';

import { login } from '../../actions/authAction';
import FacebookIcon from '../../../assets/facebookIcon.svg';
import GoogleIcon from '../../../assets/googleIcon.svg';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')

    const dispatch = useDispatch();

    const log = () => {
        dispatch(login(true))
    }

    const logFacebook = () => {
        Alert.alert("Login con facebook")
    }

    const logGoogle = () => {
        Alert.alert("Login con google")
    }

    return(
        <View style = {styles.container}>
            <ImageBackground source={require('../../../assets/loginBackgroud.png')} style={styles.image}>
                <Image source={require('../../../assets/logoRecycle.png')} style={styles.logo}/>
                <Text style={styles.textLogo}>CONCE RECICLA</Text>
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
                <TouchableOpacity 
                    style = {styles.loginButton}
                    onPress={ () => log()}
                >
                    <Text style = { styles.textLogin }>Iniciar Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = { () => Alert.alert('Recuperar contraseña')}>
                    <Text style={ styles.textForgetPwd }>Olvidé mi contraseña</Text>
                </TouchableOpacity>
                <Text style = { styles.textNoAccount }>¿No tienes cuenta?</Text>
                <View style = {styles.socialContainer}>
                    <TouchableOpacity style = {styles.marginLogos} onPress={()=>logFacebook()}>
                        <FacebookIcon width={80} height={80} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.marginLogos} onPress={()=>logGoogle()}>
                        <GoogleIcon width={80} height={80} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress = { () => navigation.navigate('register') }>
                    <Text style = { styles.textRegister }>
                        Registrarme
                    </Text>
                </TouchableOpacity>
            </ImageBackground>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
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
    loginButton: {
        backgroundColor: '#4f4085',
        borderRadius: 40,
        width: 180,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    textForgetPwd: {
        color: '#fff',
        fontSize: 12,
        marginTop: 10
    },
    textLogin: {
        fontSize: 20,
        color: '#fff',
    },
    textNoAccount: {
        fontSize: 18,
        color: '#fff',
        marginTop: 25
    },
    socialContainer:{
        flexDirection: 'row',
        marginTop: 15,
    },
    textRegister: {
        fontSize: 14,
        color: '#fff',
        marginTop: 15
    },
    marginLogos: {
        marginHorizontal: 10
    }
  });

  export default Login;