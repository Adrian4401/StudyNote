import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { MyColors } from '../colors';

import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export const GoBackButton = () => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()} >
            <MaterialIcons name="arrow-back-ios-new" size={25} color="#fff" />
            <Text style={styles.goBackText}>Wróć</Text>
         </TouchableOpacity>
    )
}

export const MakeButton = () => {
    return (
        <TouchableOpacity style={styles.makeButton} onPress={() => navigation.goBack()} >
            <Feather name="plus" size={28} color="#fff" />
            <Text style={styles.makeText}>Dodaj</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    goBackButton: {
        width: '45%',
        flexDirection: 'row',
        backgroundColor: '#000',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        justifyContent: 'space-between'
    },
    goBackText: {
        color: '#fff',
        fontSize: 25,
        paddingRight: 5
    },
    makeButton: {
        width: '45%',
        flexDirection: 'row',
        backgroundColor: MyColors.appOrange,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        justifyContent: 'space-between'
    },
    makeText: {
        color: '#fff',
        fontSize: 25,
        paddingRight: 5
    }
});