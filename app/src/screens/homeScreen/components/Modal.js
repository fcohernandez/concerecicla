import React, {useState} from 'react'
import { View, StyleSheet, Text, Dimensions, ActivityIndicator, Modal, Alert, TouchableOpacity } from 'react-native';

const ModalView = (props) => {

    const [modalVisible, setModalVisible] = useState(props.visible)

    console.log(props)

    return(
        <Modal
            animationType = "slide"
            transparent = {true}
            visible = {modalVisible}
        >
            <View style= {styles.modal}>
                <Text>asd</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text>X</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )

}

export default ModalView;

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})