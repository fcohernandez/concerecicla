import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';


import LoginNavigator from '../navigators/LoginNavigator';
import TabNavigator from '../navigators/TabNavigator';

const Stack = createStackNavigator();

const MainNavigator = () => {
    
    const logged = useSelector(state => state.authReducer.logged)
    const title = useSelector(state => state.headerReducer.title)

    console.log(title)

    return(
        <Stack.Navigator 
            screenOptions={{ 
                headerStyle: { backgroundColor: '#95c52d' }, 
                headerTintColor: '#fff', 
                headerTitleAlign: 'center', 
                headerTitleStyle: {fontSize: 30},
                headerTitle: title
            }}>
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