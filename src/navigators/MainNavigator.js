import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import LoginNavigator from '../navigators/LoginNavigator';
import TabNavigator from '../navigators/TabNavigator';

const Stack = createStackNavigator();

const MainNavigator = () => {
    
    const logged = useSelector(state => state.authReducer.logged)

    return(
        <Stack.Navigator>
            { logged ?
                <Stack.Screen 
                    name="Conce Recicla" 
                    component={TabNavigator}
                />
                :
                <Stack.Screen 
                    name="Login" 
                    component={LoginNavigator} 
                    options = {{headerShown : false}}
                />
            }
        </Stack.Navigator>
    );
}

export default MainNavigator;