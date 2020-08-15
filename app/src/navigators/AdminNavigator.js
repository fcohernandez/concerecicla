import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import User from '../screens/userScreen/User';
import Points from '../screens/userScreen/Points';
import NewPoint from '../screens/userScreen/NewPoint';

const Stack = createStackNavigator();


const AdminNavigator = () => {
  return (
    <Stack.Navigator 
            screenOptions={{ 
                headerStyle: { backgroundColor: '#95c52d' }, 
                headerTintColor: '#fff', 
                headerTitleAlign: 'center', 
                headerTitleStyle: {fontSize: 30},
                //headerTitle: title
            }}>
            <Stack.Screen 
                name="Conce Recicla" 
                component={User}
                options = {{headerShown : false}}
            />
            <Stack.Screen 
                name="points" 
                component={Points} 
                options = {{headerShown : false}}
            />
            <Stack.Screen 
                name="newpoint" 
                component={NewPoint} 
                options = {{headerShown : false}}
            />
            
    </Stack.Navigator>
)
}

export default AdminNavigator;