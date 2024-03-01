import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Button, TextInput } from 'react-native';
import { useEffect, useState } from 'react';

import * as SQLite from 'expo-sqlite';

import { MyColors } from '../../colors';

import { headerStyles } from '../../styles/headerStyles';
import { globalStyles } from '../../styles/globalStyles';

import { GoBackButton, MakeButton } from '../../components/customButtons';



export default function AddSubjectScreen() {

    const db = SQLite.openDatabase('studynote.db');

    const [subjects, setSubjects] = useState([]);
    const [currentSubject, setCurrentSubject] = useState(undefined);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS subjects (subject_id INTEGER PRIMARY KEY AUTOINCREMENT, subject_name TEXT)',
                null,
                () => console.log('created subjects'),
                (error) => console.log(error)
            );
        });

        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM subjects', 
                null,
                (txObj, resultSet) => {
                    setSubjects(resultSet.rows._array),
                    console.log('wypisywanie przedmiotow')
                },
                (txObj, error) => console.log(error)
            );
        });

        setIsLoading(false);
    }, []);

    if(isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 30}}>Loading...</Text>
            </View>
        )
    }

    const showSubjects = () => {
        return subjects.map((subject, index) => {
            console.log(subject.subject_name);
            return(
                <View key={index} style={globalStyles.eventView}>
                    <Text style={globalStyles.subjectText}>{subject.subject_name}</Text>
                </View>
            )
        })
    }

    const addSubject = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO subjects (subject_name) values (?)', [currentSubject],
                (txObj, resultSet) => {
                    let existingSubjects = [...subjects];
                    existingSubjects.push({subject_id: resultSet.insertId, subject_name: currentSubject});
                    setSubjects(existingSubjects);
                    console.log('udalo sie dodac przedmiot');
                    setCurrentSubject(undefined);
                },
                (txObj, error) => console.log('nie udalo sie dodac przedmiotu')
            );
        });
    }

    const deleteSubjects = () => {
        db.transaction(tx => {
            tx.executeSql(
                'DROP TABLE IF EXISTS subjects',
                null,
                (txObj, resultSet) => console.log('udalo sie usunac'),
                (txObj, resultSet) => console.log('nie udalo sie usunac')
            )
        })
    }

    return (
        <>
            <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
            <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

                <StatusBar barStyle='light-content' />

                {/* HEADER */}
                <View style={headerStyles.headerBackground}>
                    <Text style={headerStyles.headerText}>Dodaj przedmiot</Text>
                </View>

                {/* CONTAINER */}
                <ScrollView>
                    <View style={styles.container}>

                        <View style={{alignItems: 'flex-start', width: '100%'}}>
                            <GoBackButton />
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
                                marginVertical: 10
                            }}
                        />
                        
                        <MakeButton onPress={addSubject}/>

                        <View style={{width: '100%', justifyContent: 'flex-start', marginBottom: 10, marginTop: 40}}>
                            <Text style={globalStyles.littleText}>Twoje przedmioty</Text>
                        </View>
                        

                        {showSubjects()}

                    </View>
                </ScrollView>

                {/* <View style={globalStyles.bottomButtonsView}>
                    <Button title='Usun tabele' onPress={deleteSubjects} />
                </View> */}

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
