import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/loginScreen/Login';
import Register from '../screens/registerScreen/Register';

const Stack = createStackNavigator();

const LoginNavigator = () => {
    return(
        <Stack.Navigator headerMode="none">
            <Stack.Screen 
                name="login" 
                component={Login}
                 
            />
            <Stack.Screen 
                name="register" 
                component={Register}
            />
        </Stack.Navigator>
    )
}

export default LoginNavigator;