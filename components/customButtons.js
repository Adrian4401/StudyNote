import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { MyColors } from '../colors';

import { MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';

export const GoBackButton = () => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()} >
            <MaterialIcons name="arrow-back-ios-new" size={25} color="#fff" style={{marginRight: 5}} />
            <Text style={styles.goBackText}>Wróć</Text>
         </TouchableOpacity>
    )
}

export const MakeButton = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.makeButton} onPress={onPress} >
            {/* <Feather name="plus" size={40} color="#fff" /> */}
            <FontAwesome5 name="plus" size={40} color="#fff" />
            {/* <Text style={styles.makeText}>Dodaj</Text> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    goBackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 20
    },
    goBackText: {
        color: '#fff',
        fontSize: 25,
        paddingRight: 5
    },
    makeButton: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: MyColors.appOrange,
        paddingVertical: 5,
        borderRadius: 20,
        justifyContent: 'center'
    },
    makeText: {
        color: '#fff',
        fontSize: 25,
        paddingRight: 5
    }
});