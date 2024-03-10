import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import { MyColors } from '../colors';
import { globalStyles } from '../styles/globalStyles';



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
            <FontAwesome5 name="plus" size={40} color="#fff" />
        </TouchableOpacity>
    )
}

export const EditButton = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.makeButton} onPress={onPress} >
            <MaterialIcons name="edit" size={40} color="white"/>
        </TouchableOpacity>
    )
}

export const SettingsScreenButton = ({onPress, icon, text}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...globalStyles.eventView, flexDirection: 'row', paddingHorizontal: 20}}>
            <MaterialIcons name={icon} size={24} color={MyColors.appOrange} style={{paddingHorizontal: 5}}/>
            <Text style={globalStyles.subjectText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    goBackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
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