import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, TextInput, Alert, Image, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { FontAwesome5 } from '@expo/vector-icons';

import { login } from '../../actions/authAction';
import FacebookIcon from '../../../assets/facebookIcon.svg';
import GoogleIcon from '../../../assets/googleIcon.svg';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [seePwd, setSeePwd] = useState(true)

    const dispatch = useDispatch();

    const log = () => {
        fetch(`http://192.168.18.169:3000/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password: pwd,
            })
        })
        .then(response => response.json())  // promise
        .then(json => {
            if(!json.ok){
                return Alert.alert(json.msg)
            }

            AsyncStorage.setItem('@token', json.token, (res, err) => {
                if(err){
                    console.log(err)
                }
                dispatch(login(true))
           }) 
        })
    }
    

    const logFacebook = async() => {
        try {
            await Facebook.initializeAsync('561770824753219');
            const {
              type,
              token,
              expires,
              permissions,
              declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
              permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
              // Get the user's name using Facebook's Graph API
              let response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,first_name, last_name`);
              let user = await response.json()
              const facebookUser = {
                  nombre: user.first_name,
                  apellido: user.last_name,
                  email: user.email,
                  facebook: false
              }

            fetch(`http://192.168.18.169:3000/login/facebook`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    facebookUser
                })
            })
            .then(response => response.json())  // promise
            .then(json => {
                if(!json.ok){
                    return Alert.alert(json.msg)
                }

                AsyncStorage.setItem('@token', json.token, (res, err) => {
                    if(err){
                        console.log(err)
                    }
                    dispatch(login(true))
                }) 

            })  
            } else {
              // type === 'cancel'
            }
          } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
          }
    }

    const logGoogle = async () => {
        
        const result = await Google.logInAsync({
            androidClientId: "734561156669-9nbm9s134flktjil540qf7osqm1ig7km.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
        })
        
        if (result.type === 'success') {
            fetch(`http://192.168.18.169:3000/login/google`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    googleToken: result.idToken
            })
            })
            .then(response => response.json())  // promise
            .then(json => {
                if(!json.ok){
                    return Alert.alert(json.msg)
                }

                let user = JSON.stringify(json.usuario)

                AsyncStorage.setItem('@userInfo', user, (res,err) => {
                    if(err){
                        return console.log(err)
                    }
                    AsyncStorage.setItem('@token', json.token, (res, err) => {
                        if(err){
                            return console.log(err)
                        }
                        dispatch(login(true))
                   })
                })
   
            })
        }
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
                    autoCapitalize = 'none'
                />
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput 
                        style = {styles.inputpwd}
                        value = {pwd}
                        onChangeText = {text => setPwd(text)}
                        placeholder = "Contraseña"
                        autoCapitalize = 'none'
                        secureTextEntry={seePwd}
                    />
                    <TouchableOpacity onPress ={()=> setSeePwd(!seePwd)}>
                        <FontAwesome5 name={seePwd ? "eye" : "eye-slash"} color={'#fff'} size={24} />
                    </TouchableOpacity>
                </View>
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
        width: 240,
        borderRadius: 20,
        margin: 10,
        paddingLeft: 20,
    },
    inputpwd: {
        backgroundColor: '#fff',
        height: 40, 
        width: 240,
        borderRadius: 20,
        margin: 10,
        paddingLeft: 20,
        marginLeft: 35
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