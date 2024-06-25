import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons'

import { MyColors } from '../utils/colors'
import { globalStyles } from '../styles/globalStyles'

import appLanguage from '../utils/languages'
import { useLanguage } from '../context/LanguageContext'



export const GoBackButton = () => {

    const navigation = useNavigation();
    const { language } = useLanguage();
    const getTranslatedText = (key) => {
        return appLanguage[language][key];
    }

    return (
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()} >
            <AntDesign name="left" size={25} color="#fff" style={{marginRight: 5}} />
            <Text style={styles.goBackText}>{getTranslatedText('goBack')}</Text>
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
            <MaterialCommunityIcons name={icon} size={24} color={MyColors.appBlue} style={{paddingHorizontal: 5}}/>
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
        backgroundColor: MyColors.appBlue,
        paddingVertical: 5,
        borderRadius: 20,
        justifyContent: 'center',
        marginTop: 20
    },
    makeText: {
        color: '#fff',
        fontSize: 25,
        paddingRight: 5
    }
});