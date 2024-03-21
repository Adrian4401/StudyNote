import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Button, TextInput } from 'react-native';
import { useEffect, useState } from 'react';

import * as SQLite from 'expo-sqlite';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { MyColors } from '../../colors';

import { headerStyles } from '../../styles/headerStyles';
import { globalStyles } from '../../styles/globalStyles';

import { GoBackButton, MakeButton } from '../../components/customButtons';

import { loadClasses } from '../../databaseQueries/Select';



export default function AddClassScreen() {

    const db = SQLite.openDatabase('studynote.db');

    const [classes, setClasses] = useState([]);
    const [currentClass, setCurrentClass] = useState(undefined);

    useEffect(() => {
        loadClasses(setClasses);
    }, []);

    const showBottomClassesInfo = () => {
        if(classes && classes.length > 0){
            return(
                <View style={{width: '100%', justifyContent: 'flex-start', marginBottom: 10, marginTop: 40}}>
                    <Text style={globalStyles.littleText}>Twoje zajęcia</Text>
                </View>
            )
        } else {
            return(
                <View style={{width: '100%', alignItems: 'center', marginTop: 100}}>
                    <Text style={globalStyles.littleText}>Nie masz jeszcze żadnych zajęć.</Text>
                    <MaterialCommunityIcons name="emoticon-sad" size={100} color={MyColors.appLightGray} style={{marginTop: 20}}/>
                </View>
            )
        }
    }
    
    const showClasses = () => {
        return classes.map((myclass, index) => {
            return(
                <View key={index} style={globalStyles.eventView}>
                    <Text style={globalStyles.subjectText}>{myclass.class_name}</Text>
                </View>
            )
        })
    }

    const addClass = () => {
        if(currentClass && typeof currentClass === "string" && currentClass.trim() !== "") {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO classes (class_name) values (?)', 
                    [currentClass],
                    (txObj, resultSet) => {
                        let existingClasses = [...classes];
                        setClasses(existingClasses);
                        existingClasses.push({class_id: resultSet.insertId, class_name: currentClass});
                        console.log('udalo sie dodac zajecia');
                        setCurrentClass(undefined);
                    },
                    (txObj, error) => console.log('nie udalo sie dodac zajecia')
                );
            });
        }
        else {
            console.log('nie mozna dodac pustego przedmiotu')
        }
    }
 

    return (
        <>
            <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
            <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

                <StatusBar barStyle='light-content' />

                {/* HEADER */}
                <View style={headerStyles.headerBackground}>
                    <Text style={headerStyles.headerText}>Dodaj zajęcia</Text>
                </View>

                {/* CONTAINER */}
                <ScrollView>
                    <View style={styles.container}>

                        <View style={{alignItems: 'flex-start', width: '100%'}}>
                            <GoBackButton />
                        </View>
                        

                        <TextInput 
                            value={currentClass}
                            onChangeText={setCurrentClass}
                            placeholder='Dodaj zajęcia...'
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
                        
                        <MakeButton onPress={addClass}/>

                        {showBottomClassesInfo()}
                        

                        {showClasses()}

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
