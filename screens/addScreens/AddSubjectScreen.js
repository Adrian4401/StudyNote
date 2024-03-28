import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Button, TextInput } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { loadSubjects, addSubject } from '../../databaseQueries/databaseQueries.js';

import { MyColors } from '../../colors';

import { headerStyles } from '../../styles/headerStyles';
import { globalStyles } from '../../styles/globalStyles';

import { GoBackButton, MakeButton } from '../../components/customButtons';





export default function AddSubjectScreen() {

    const [subjects, setSubjects] = useState([]);
    const [currentSubject, setCurrentSubject] = useState(undefined);



    useEffect(() => {
        console.log('DATA -- Subjects loaded')
        loadSubjects(setSubjects);
    }, []);



    const showBottomSubjectsInfo = () => {
        if(subjects && subjects.length > 0){
            return(
                <View style={{width: '100%', justifyContent: 'flex-start', marginBottom: 10, marginTop: 40}}>
                    <Text style={globalStyles.littleText}>Twoje przedmioty</Text>
                </View>
            )
        } else {
            return(
                <View style={{width: '100%', alignItems: 'center', marginTop: 100}}>
                    <Text style={globalStyles.littleText}>Nie masz jeszcze żadnych przedmiotów.</Text>
                    <MaterialCommunityIcons name="emoticon-sad" size={100} color={MyColors.appLightGray} style={{marginTop: 20}}/>
                </View>
            )
        }
    }

    const showSubjects = () => {
        return subjects.map((subject, index) => {
            return(
                <View key={index} style={globalStyles.eventView}>
                    <Text style={globalStyles.subjectText}>{subject.subject_name}</Text>
                </View>
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
                                marginVertical: 10,
                                marginTop: 30
                            }}
                        />
                        
                        <MakeButton onPress={() => addSubject(currentSubject, setCurrentSubject, subjects, setSubjects)}/>

                        {showBottomSubjectsInfo()}

                        {showSubjects()}

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
