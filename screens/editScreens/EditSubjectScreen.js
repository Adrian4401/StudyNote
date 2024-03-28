import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as SQLite from 'expo-sqlite';
import { MaterialIcons } from '@expo/vector-icons';
import { loadSubjects } from '../../databaseQueries/databaseQueries.js';

import { MyColors } from '../../colors';

import { headerStyles } from '../../styles/headerStyles';

import { EditButton, GoBackButton } from '../../components/customButtons';



export default function EditSubjectScreen() {

    const db = SQLite.openDatabase('studynote.db');

    const navigation = useNavigation();
    const route = useRoute();

    const [subjects, setSubjects] = useState([]);
    const [currentSubject, setCurrentSubject] = useState('');
    const [subjectID, setSubjectID] = useState('');

    useEffect(() => {
        const { subjectID, subjectName } = route.params;
        
        setCurrentSubject(subjectName);
        setSubjectID(subjectID);
    }, []);

    const editSubject = (subjectID, newSubjectName) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE subjects SET subject_name = ? WHERE subject_id = ?',
                [newSubjectName, subjectID],
                (txObj, resultSet) => {
                    loadSubjects(setSubjects);
                    console.log('Przedmiot został zaktualizowany');
                    navigation.goBack(); // Wróć do poprzedniego ekranu
                },
                (txObj, error) => {
                    console.log('Nie udało się zaktualizować przedmiotu:', error);
                }
            );
        });   
    };

    const deleteSubject = (subjectID) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE subjects SET is_deleted = 1 WHERE subject_id = ?',
                [subjectID],
                (txObj, resultSet) => {
                    loadSubjects(setSubjects);
                    console.log('Przedmiot został usuniety');
                    navigation.goBack(); // Wróć do poprzedniego ekranu
                },
                (txObj, error) => {
                    console.log('Nie udało się usunac przedmiotu:', error);
                }
            );
        }); 
    }

    const alertDeleteSubject = (subjectID) => {
        Alert.alert('Usuwanie przedmiotu', 'Czy na pewno usunąć przedmiot?', [
            {
                text: 'Anuluj',
                onPress: () => console.log('Anuluj'),
                style: 'cancel'
            },
            {
                text: 'Usuń',
                onPress: () => deleteSubject(subjectID)
            }
        ])
    }


    return (
        <>
            <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
            <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

                <StatusBar barStyle='light-content' />

                {/* HEADER */}
                <View style={headerStyles.headerBackground}>
                    <Text style={headerStyles.headerText}>Edytuj przedmiot</Text>
                </View>

                {/* CONTAINER */}
                <ScrollView>
                    <View style={styles.container}>

                        <View style={{alignItems: 'center', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <GoBackButton />
                            <TouchableOpacity onPress={() => alertDeleteSubject(route.params.subjectID)}>
                                <MaterialIcons name="delete" size={30} color='white'/>
                            </TouchableOpacity>
                        </View>
                        

                        <TextInput 
                            value={currentSubject}
                            onChangeText={setCurrentSubject}
                            placeholder='Dodaj przedmiot...'
                            placeholderTextColor={MyColors.appLightGray}
                            maxLength={50}
                            style={{
                                color: 'white',
                                width: '100%',
                                fontSize: 25,
                                borderWidth: 2,
                                borderColor: MyColors.appOrange,
                                borderRadius: 10,
                                padding: 10,
                                marginVertical: 10,
                                marginTop: 30
                            }}
                        />
                        
                        <EditButton onPress={() => editSubject(route.params.subjectID, currentSubject)}/>

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
