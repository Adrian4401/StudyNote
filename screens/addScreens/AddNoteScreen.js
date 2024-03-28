import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

import { MyColors } from '../../colors';

import { headerStyles } from '../../styles/headerStyles';

import { GoBackButton, MakeButton } from '../../components/customButtons';

import { loadClasses, loadSubjects } from '../../databaseQueries/databaseQueries.js';

import { DBConnect } from '../../databaseQueries/DBConnect';

import Moment from 'moment';




export default function AddNoteScreen() {

    const navigation = useNavigation();

    const db = DBConnect();

    const [currentTitle, setCurrentTitle] = useState('');
    const [currentNote, setCurrentNote] = useState('');

    const [notes, setNotes] = useState([]);

    const [openSubjects, setOpenSubjects] = useState(false);
    const [openClasses, setOpenClasses] = useState(false);
    const [currentClass, setCurrentClass] = useState(null);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const loadData = navigation.addListener('focus', () => {
            loadSubjects(setSubjects),
            loadClasses(setClasses)
        })
        
        return loadData;
    }, [navigation])

    const subjectItems = subjects.map(subject => {
        return { label: subject.subject_name, value: subject.subject_id.toString() };
    });

    const classesItems = classes.map(myclass => {
        return { label: myclass.class_name, value: myclass.class_id.toString() };
    })




    // Moment.locale('pl');
    // var noteDate = new Date().toLocaleString();
    // var formattedNoteDate = Moment(formattedNoteDate).format('DD.MM.yyyy');

    var day = (new Date().getDate()).toString().padStart(2, '0');
    var month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    var year = new Date().getFullYear();

    var noteDate = day + '.' + month + '.' + year;
    

    const addNote = (currentTitle, currentNote, currentSubject, currentClass, noteDate) => {
        console.log('Date: ', noteDate)
        db.transaction(tx =>
            tx.executeSql(
                'INSERT INTO notes (title, note, subject_id, class_id, create_day) values(?,?,?,?,?)',
                [currentTitle, currentNote, currentSubject, currentClass, noteDate],
                (txObj, resultSet) => {
                    console.log('Udalo sie dodac notatke');
                    navigation.goBack();
                },
                (txObj, error) => console.log('Nie udalo sie dodac notatki -> ' + error)
            )
        )
    }




    const renderItem = ({item}) => {
        if(item.type === 'goBackButton') {
            return(
                <View style={{width: '100%', marginTop: 20}}>
                    <GoBackButton />
                </View>
            )
        } else if(item.type === 'titleTextInput') {
            return(
                <TextInput 
                    value={currentTitle}
                    onChangeText={setCurrentTitle}
                    placeholder='Dodaj tytuł notatki...'
                    placeholderTextColor={MyColors.appLightGray}
                    maxLength={100}
                    multiline
                    style={{
                        color: 'white',
                        fontSize: 25,
                        borderWidth: 2,
                        borderColor: MyColors.appOrange,
                        borderRadius: 10,
                        padding: 10,
                        marginVertical: 10,
                        marginTop: 30,
                        backgroundColor: MyColors.appDark
                    }}
                />
            )
        } else if(item.type === 'subjectsDropDownPicker') {
            return(
                <DropDownPicker
                    placeholder='Wybierz przedmiot'
                    open={openSubjects}
                    value={currentSubject}
                    items={subjectItems}
                    setOpen={setOpenSubjects}
                    setValue={setCurrentSubject}
                    setItems={setSubjects}
                    ScrollView={false}
                    style={{...styles.style, marginBottom: 10}}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    textStyle={styles.textStyle}
                    arrowIconContainerStyle={styles.arrowIconContainerStyle}
                />
            )
        } else if(item.type === 'classesDropDownPicker') {
            return(
                <DropDownPicker
                    placeholder='Wybierz zajęcia'
                    open={openClasses}
                    value={currentClass}
                    items={classesItems}
                    setOpen={setOpenClasses}
                    setValue={setCurrentClass}
                    setItems={setClasses}
                    ScrollView={false}
                    style={styles.style}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    textStyle={styles.textStyle}
                    arrowIconContainerStyle={styles.arrowIconContainerStyle}
                />
            )
        } else if(item.type === 'noteTextInput') {
            return(
                <TextInput 
                    value={currentNote}
                    onChangeText={setCurrentNote}
                    placeholder='Dodaj notatkę...'
                    placeholderTextColor={MyColors.appLightGray}
                    multiline={true}
                    style={{
                        color: 'white',
                        flex: 1,
                        fontSize: 18,
                        borderWidth: 2,
                        borderColor: MyColors.appOrange,
                        borderRadius: 10,
                        padding: 10,
                        marginVertical: 50,
                        height: 400,
                        backgroundColor: MyColors.appGray,
                        flexWrap: 'wrap'
                    }}
                />
            )
        } else if(item.type === 'addButton') {
            return(
                <MakeButton onPress={() => addNote(currentTitle, currentNote, currentSubject, currentClass, noteDate)}/>
            )
        }
    }


    return (
        <>
            <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
            <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

                <StatusBar barStyle='light-content' />

                {/* HEADER */}
                <View style={headerStyles.headerBackground}>
                    <Text style={headerStyles.headerText}>Dodaj notatkę</Text>
                </View>

                <View style={styles.container}>
                    <FlatList 
                        data={[
                            { type: 'addButton' },
                            { type: 'noteTextInput' },
                            { type: 'classesDropDownPicker' },
                            { type: 'subjectsDropDownPicker' },
                            { type: 'titleTextInput' },
                            { type: 'goBackButton' }
                        ]}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{flexDirection: 'column-reverse', paddingBottom: 50}}
                    />
                </View>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MyColors.appBackground,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    style: {
        backgroundColor: MyColors.appDark,
        borderWidth: 1,
        borderColor: MyColors.appOrange
    },
    dropDownContainerStyle: {
        backgroundColor: MyColors.appDark,
        borderWidth: 1,
        borderColor: MyColors.appOrange
    },
    textStyle: {
        color: MyColors.appLightGray
    },
    arrowIconContainerStyle: {
        backgroundColor: MyColors.appOrange,
        borderRadius: 5
    }
});