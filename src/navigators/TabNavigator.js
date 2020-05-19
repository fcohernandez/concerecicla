import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from '../screens/homeScreen/Home';
import RecycleScreen from '../screens/recycleScreen/Recycle';
import InfoScreen from '../screens/infoScreen/Info';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
                component={RecycleScreen}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name="recycle" color={'#fff'} size={24} />
                    ) 
                }}
            />
            <Tab.Screen 
                name="Puntos Limpios"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name='map-marked' color={'#fff'} size={24} />
                    )
                }}
            />
            <Tab.Screen 
                name="Información" 
                component={InfoScreen}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name='book-open' color={'#fff'} size={24} />
                    ) 
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator;