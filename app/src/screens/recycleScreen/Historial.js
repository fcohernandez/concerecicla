import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, FlatList, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import OrganicIcon from '../../../assets/organicIcon';
import PlasticIcon from '../../../assets/plasticIcon.svg';

import PieChart from './components/PieChart';
import HistoryCard from './components/HistoryCard';



const Historial = ({navigation}) => {

  const [totalPlastic, setTotalPlastic] = useState(0)
  const [totalPaper, setTotalPaper] = useState(0)
  const [totalGlass, setTotalGlass] = useState(0)
  const [totalBattery, setTotalBattery] = useState(0)
  const [totalOrganic, setTotalOrganic] = useState(0)
  const [historial, setHistorial] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const unsubscribe = navigation.addListener('tabPress', () => {

      setLoading(true)

    AsyncStorage.getItem('@token', (err, res) => {
    
      fetch(`http://192.168.18.169:3000/recicla/${res}`)
      .then((response) => response.json())
      .then((json) => {
        if(!json.ok){
          Alert.alert("Ha ocurrido un error")
        }

        

        if(Object.keys(json.reciclajes).length == 0){
          Alert.alert('Ups...', 'Aún no has realizado ningún reciclaje! Recicla al menos 1 vez para ver tu historial.')
          navigation.goBack()
        }else{
          setHistorial(json.reciclajes)
        }

        setTotalPlastic(0)
        setTotalPaper(0)
        setTotalGlass(0)
        setTotalBattery(0)
        setTotalOrganic(0)

        let paper = 0
        let plastic = 0
        let glass = 0
        let battery = 0
        let organic = 0

        json.reciclajes.map(reciclaje => {
          reciclaje.materiales.map(material => {
              if(material.material == "1"){
                plastic = plastic + material.cantidad
              }
              if(material.material == "2"){
                paper = paper + material.cantidad
              }
              if(material.material == "3"){
                glass = glass + material.cantidad
              }
              if(material.material == "4"){
                battery = battery + material.cantidad
              }
              if(material.material == "5"){
                organic = organic + material.cantidad
              }
          })

          setTotalPlastic(plastic)
          setTotalPaper(paper)
          setTotalGlass(glass)
          setTotalBattery(battery)
          setTotalOrganic(organic)
          
        })
        setLoading(false)
      })
      
    })

  })
    return unsubscribe
    
  }, [navigation])

    return (
        <>
        {loading? 
          <ActivityIndicator size="large" color="#0000ff" />
        :
            <>
            <Text style = {styles.totalText}>Total</Text>
            <PieChart 
              plastic = {totalPlastic}
              paper = {totalPaper}
              glass = {totalGlass}
              battery = {totalBattery}
              organic = {totalOrganic}
            />
            <View style = {{flexDirection: 'row', alignItems: 'center', paddingStart: 5, paddingEnd: 5, justifyContent: 'space-between'}}>
                <OrganicIcon height={80} width={80}/>
                <PlasticIcon height={60} width={60}/>
                <FontAwesome5 name='newspaper' color='#f00000' size={60} />
                <FontAwesome5 name='wine-bottle' color='#4eb966' size={60} />
                <FontAwesome5 name='car-battery' color='#3ba3d2' size={60} />
            </View>
            <Text style = {styles.historicoText}>Histórico</Text>
            <View style = {styles.container}>
                <FlatList
                    data={historial}
                    renderItem={(item) => <HistoryCard historial = {item}/>}
                    keyExtractor={item => item._id}
                />
            </View>
            </>
        }
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