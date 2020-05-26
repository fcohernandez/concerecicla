import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import OrganicIcon from '../../../assets/organicIcon';
import PlasticIcon from '../../../assets/plasticIcon.svg';

import PieChart from './components/PieChart';
import HistoryCard from './components/HistoryCard';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      date: '02/05/2022',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      date: '02/02/2022',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      date: '01/25/2012',
    },
    {
        id: '58694a0f-3da1-471f-bd96-1455271e29d72',
        date: '01/25/2011',
      },
  ];

const Historial = () => {

    return (
        <>
            <Text style = {styles.totalText}>Total</Text>
            <PieChart />
            <View style = {{flexDirection: 'row', alignItems: 'center', paddingStart: 5, paddingEnd: 5, justifyContent: 'space-between'}}>
                <OrganicIcon height={80} width={80}/>
                <PlasticIcon height={60} width={60}/>
                <FontAwesome5 name='newspaper' color='#e56e25' size={60} />
                <FontAwesome5 name='wine-bottle' color='#4eb966' size={60} />
                <FontAwesome5 name='car-battery' color='#3ba3d2' size={60} />
            </View>
            <Text style = {styles.historicoText}>Histórico</Text>
            <View style = {styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <HistoryCard date = {item.date}/>}
                    keyExtractor={item => item.id}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf4f3',
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 10
    },
    cardHistory: {
        backgroundColor: '#fff',
        height: 40,
        width: 200
    },
    totalText: {
        fontWeight: 'bold', 
        fontSize: 40, 
        alignSelf: 'center',
        marginTop: 10
    },
    historicoText: {
        fontWeight: 'bold', 
        fontSize: 30, 
        alignSelf: 'center',
        marginTop: 5
    }
  });

  export default Historial;