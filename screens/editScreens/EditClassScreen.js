import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';
import { editClass, deleteClass } from '../../databaseQueries/databaseQueries.js';

import { MyColors } from '../../utils/colors.js';

import { headerStyles } from '../../styles/headerStyles';
import { EditButton, GoBackButton } from '../../components/customButtons.js';

import appLanguage from "../../utils/languages";
import { useLanguage } from '../../context/LanguageContext';
import { alertDeleteClass } from '../../components/AppAlerts.js';



export default function EditClassScreen() {

    const navigation = useNavigation();
    const route = useRoute();

    const [classes, setClasses] = useState([]);
    const [currentClass, setCurrentClass] = useState('');
    const [classID, setClassID] = useState('');

    const { language } = useLanguage();

    const getTranslatedText = (key) => {
        return appLanguage[language][key];
    }



    useEffect(() => {
        const { classID, className } = route.params;
        setCurrentClass(className);
        setClassID(classID);
    }, []);

    

    const handleEditClass = () => {
        editClass(classID, currentClass, setClasses, navigation)
    }

    const handleDeleteClass = () => {
        alertDeleteClass(classID, setClasses, navigation, getTranslatedText)
    }





    return (
        <>
            <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
            <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

                {/* HEADER */}
                <View style={headerStyles.headerBackground}>
                    <Text style={headerStyles.headerText}>{getTranslatedText('edit')} {getTranslatedText('classes')}</Text>
                </View>

                {/* CONTAINER */}
                <ScrollView>
                    <View style={styles.container}>

                        <View style={{alignItems: 'center', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <GoBackButton />
                            <TouchableOpacity onPress={handleDeleteClass}>
                                <MaterialIcons name="delete" size={30} color='white'/>
                            </TouchableOpacity>
                        </View>
                        

                        <TextInput 
                            value={currentClass}
                            onChangeText={setCurrentClass}
                            placeholder='Edytuj zajęcia...'
                            placeholderTextColor={MyColors.appLightGray}
                            maxLength={50}
                            style={{
                                color: 'white',
                                width: '100%',
                                fontSize: 25,
                                borderWidth: 2,
                                borderColor: MyColors.appBlue,
                                borderRadius: 10,
                                padding: 10,
                                marginVertical: 10,
                                marginTop: 30
                            }}
                        />
                        
                        <EditButton onPress={handleEditClass}/>

                    </View>
                </ScrollView>


            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MyColors.appBackground,
        alignItems: 'center',
        padding: 20,
        paddingBottom: 120
    }
})
