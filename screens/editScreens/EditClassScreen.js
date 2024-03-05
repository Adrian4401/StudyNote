import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as SQLite from 'expo-sqlite';

import { MyColors } from '../../colors';

import { headerStyles } from '../../styles/headerStyles';

import { MaterialIcons } from '@expo/vector-icons';

import { EditButton, GoBackButton } from '../../components/customButtons';

import { loadClasses } from '../../database/DBFunctions';


export default function EditClassScreen() {

    const db = SQLite.openDatabase('studynote.db');

    const navigation = useNavigation();
    const route = useRoute();

    const [classes, setClasses] = useState([]);
    const [currentClass, setCurrentClass] = useState('');

    useEffect(() => {
        const { className } = route.params;
        setCurrentClass(className);
    }, []);

    const editSubject = (oldClassName, newClassName) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE classes SET class_name = ? WHERE class_name = ?',
                [newClassName, oldClassName],
                (txObj, resultSet) => {
                    loadClasses(setClasses);
                    console.log('Zajecie zostalo zaktualizowane');
                    navigation.goBack(); // Wróć do poprzedniego ekranu
                },
                (txObj, error) => {
                    console.log('Nie udalo se zaktualizowac zajecia:', error);
                }
            );
        });   
    };

    const deleteClass = (oldClassName) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE classes SET is_deleted = 1 WHERE class_name = ?',
                [oldClassName],
                (txObj, resultSet) => {
                    loadClasses(setClasses);
                    console.log('Zajecie zostalo usuniete');
                    navigation.goBack(); // Wróć do poprzedniego ekranu
                },
                (txObj, error) => {
                    console.log('Nie udalo się usunac zajecia:', error);
                }
            );
        }); 
    }

    const alertDeleteClass = (oldClassName) => {
        Alert.alert('Usuwanie zajęć', 'Czy na pewno usunąć zajęcie?', [
            {
                text: 'Anuluj',
                onPress: () => console.log('Anuluj'),
                style: 'cancel'
            },
            {
                text: 'Usuń',
                onPress: () => deleteClass(oldClassName)
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
                    <Text style={headerStyles.headerText}>Edytuj zajęcia</Text>
                </View>

                {/* CONTAINER */}
                <ScrollView>
                    <View style={styles.container}>

                        <View style={{alignItems: 'center', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <GoBackButton />
                            <TouchableOpacity onPress={() => alertDeleteClass(route.params.className)}>
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
                                borderColor: MyColors.appOrange,
                                borderRadius: 10,
                                padding: 10,
                                marginVertical: 10,
                                marginTop: 30
                            }}
                        />
                        
                        <EditButton onPress={() => editSubject(route.params.className, currentClass)}/>

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
