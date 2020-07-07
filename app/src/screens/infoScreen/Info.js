import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';

import Card from './components/Card'

import { useSelector } from 'react-redux';


const Info = () => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, []);

    let materiales = useSelector(state => state.materialsReducer.materiales)

    return(
        <View style = {styles.container}>
            {
                loading ?
                <ActivityIndicator size="large" color="#0000ff" />:
                <FlatList
                    data={materiales}
                    renderItem={(item) => <Card material = {item}/>}
                    keyExtractor={item => item._id}
                />
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf4f3',
      alignItems: 'center',
    },

  });

  export default Info;