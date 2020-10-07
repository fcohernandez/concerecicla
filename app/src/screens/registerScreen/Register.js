import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Alert, SafeAreaView, StyleSheet,
    Text, TextInput, TouchableWithoutFeedback, View, ImageBackground, Image, AsyncStorage, TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';

import { login } from '../../actions/authAction';

const Register = () => {

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [validEmail, setValidEmail] = useState(true)
    const [pwdMatch, setpwdMatch] = useState(true)
    const [seePwd, setSeePwd] = useState(true)

    const dispatch = useDispatch();

    const log = () => {

        if(!pwdMatch){
            return Alert.alert("contraseñas no coinciden")
        }

        fetch('http://192.168.18.169:3000/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password: pwd,
                nombre: name,
                apellido: lastname
            })
        })
        .then(response => response.json())  // promise
        .then(json => {
            if(!json.ok){
                return Alert.alert(json.msg)
            }

            console.log(json)

            let user = JSON.stringify(json.usuarioDB)
            console.log(user)
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

    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
          setEmail(text)
          setValidEmail(false)
        }
        else {
          setEmail(text)
          setValidEmail(true)
        }
    }

    const validatePassword = () => {
        if(pwd == confirmPwd){
            setpwdMatch(true)
        }else{
            setpwdMatch(false)
        }
    }

    return(
        <ImageBackground source={require('../../../assets/loginBackgroud.png')} style={styles.image}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
            >
                <SafeAreaView style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inner}>
                            <Image source = {require('../../../assets/logoRecycle.png')} style = {styles.logo}/>
                            <Text style={styles.textLogo}>
                                Conce Recicla
                            </Text>
                            <TextInput
                                placeholder="Nombre"
                                style={styles.input}
                                value ={name}
                                onChangeText = {text => setName(text)}
                            />
                            <TextInput
                                placeholder="Apellido"
                                style={styles.input}
                                value = {lastname}
                                onChangeText = {text => setLastName(text)}
                            />
                            <TextInput
                                placeholder="Correo Electrónico"
                                style={ validEmail ? styles.input : styles.inputWrong}
                                value = {email}
                                onChangeText = {text => validate(text)}
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
                            <TextInput
                                placeholder="Confirmar contraseña"
                                style={ pwdMatch ? styles.input : styles.inputWrong}
                                value = {confirmPwd}
                                onChangeText = {text => setConfirmPwd(text)}
                                onBlur = {() => validatePassword()}
                                autoCapitalize = 'none'
                                secureTextEntry={seePwd}
                            />
                            <View style={styles.loginButton}>
                                <Text style={styles.textLogin} onPress={() => log()} > Registrarme </Text>
                            </View>
                            <View style={{ flex : 1 }} />
                        </View>
                        </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </ImageBackground>
           
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center'
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
    inputpwd: {
        backgroundColor: '#fff',
        height: 40, 
        width: 250,
        borderRadius: 20,
        margin: 10,
        paddingLeft: 20,
        marginLeft: 40
    },
    inputWrong: {
        backgroundColor: '#fff',
        height: 40, 
        width: 250,
        borderRadius: 20,
        margin: 10,
        paddingLeft: 20,
        borderWidth: 1.5,
        borderColor: '#f21'
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
        marginBottom: 10
    },
    loginButton: {
        backgroundColor: '#4f4085',
        borderRadius: 40,
        width: 180,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center'
    },
    textLogin: {
        fontSize: 20,
        color: '#fff',
    },
  });

  export default Register;