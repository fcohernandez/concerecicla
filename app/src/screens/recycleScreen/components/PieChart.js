import React from 'react';
import { Alert } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg'

const Piechart = (props) => {

    /*const data = [ props.plastic,props.paper,props.glass,props.battery,props.organic]

    const color = (index) => {
        switch(index){
            case 0:
                return '#f18a20'
            case 1:
                return '#f00000'
            case 2:
                return '#4eb966'
            case 3:
                return '#3ba3d2'
            case 4:
                return '#efb119'
            default:
                break;
        }
    }

    const material = (index) => {
        switch(index){
            case 0:
                return 'plásticos'
            case 1:
                return 'papeles y cartones'
            case 2:
                return 'vidrios'
            case 3:
                return 'baterías'
            case 4:
                return 'desechos orgánicos'
            default:
                break;
        }
        //<PieChart style={{ height: 200, marginTop: 15 }} data={pieData} />
    }*/

    const data1 = [
        {
            key: 1,
            amount: props.plastic,
            svg: { fill: '#f18a20' },
        },
        {
            key: 2,
            amount: props.paper,
            svg: { fill: '#f00000' }
        },
        {
            key: 3,
            amount: props.glass,
            svg: { fill: '#4eb966' }
        },
        {
            key: 4,
            amount: props.battery,
            svg: { fill: '#3ba3d2' }
        },
        {
            key: 5,
            amount: props.organic,
            svg: { fill: '#efb119' }
        }
    ]

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={pieCentroid[ 0 ]}
                    y={pieCentroid[ 1 ]}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={24}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {data.amount}
                </Text>
            )
        })
    }

    /*const pieData = data
        .map((value, index) => ({
            value,
            svg: {
                fill: color(index),
                onPress: () => Alert.alert(`Has reciclado ${value} de ${material(index)}`)
            },
            key: `pie-${index}`,
        }))*/

    return (
            <PieChart
                style={{ height: 200 }}
                valueAccessor={({ item }) => item.amount}
                data={data1}
                spacing={0}
                outerRadius={'95%'}
            >
                <Labels/>
            </PieChart>
    )
}


  export default Piechart;