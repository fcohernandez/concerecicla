import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import HomeScreen from '../screens/homeScreen/Home';
import InfoScreen from '../screens/infoScreen/Info';
import RecyclaNavigator from './ReciclaNavigator'
import { changeTitle } from '../actions/headerAction';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    const dispatch = useDispatch();

    return(
        <Tab.Navigator
            initialRouteName = "Puntos Limpios"
            tabBarOptions = {{
                style : { backgroundColor: '#95c52d', borderTopRightRadius: 18, borderTopLeftRadius: 18, color: '#fff' },
                activeTintColor: '#fff',
                tabStyle: '#333',
            }}
        >
            <Tab.Screen 
                name="Reciclar" 
                component={RecyclaNavigator}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name="recycle" color={'#fff'} size={24} />
                    ) 
                }}
                listeners={() => ({
                    tabPress: () => {
                        dispatch(changeTitle('Reciclar'))
                    }
                })}

            />
            <Tab.Screen 
                name="Puntos Limpios"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name='map-marked' color={'#fff'} size={24} />
                    )
                }}
                listeners={() => ({
                    tabPress: () => {
                        dispatch(changeTitle('Conce Recicla'))
                    }
                })}
            />
            <Tab.Screen 
                name="Información" 
                component={InfoScreen}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name='book-open' color={'#fff'} size={24} />
                    ) 
                }}
                listeners={() => ({
                    tabPress: () => {
                        dispatch(changeTitle('Información'))
                    }
                })}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator;