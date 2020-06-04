import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

const Piechart = (props) => {

    console.log(props)
    const data = [1,2,3,4,5]

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    const pieData = data
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))

    return (
            <PieChart style={{ height: 200, marginTop: 15 }} data={pieData} />
    )
}


  export default Piechart;