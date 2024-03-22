import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, FlatList, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

import { MyColors } from '../../colors';

import { FontAwesome5 } from '@expo/vector-icons';

import { headerStyles } from '../../styles/headerStyles';
import { globalStyles } from '../../styles/globalStyles';

import { GoBackButton, MakeButton } from '../../components/customButtons';

import { loadClasses, loadSubjects, selectChosenNotes } from '../../databaseQueries/Select';

import { DBConnect } from '../../databaseQueries/DBConnect';

import Moment from 'moment';

export default function AddEventScreen() {

    const navigation = useNavigation();

    const db = DBConnect();

    const [currentTitle, setCurrentTitle] = useState('');
    const [currentNote, setCurrentNote] = useState('');

    const [openSubjects, setOpenSubjects] = useState(false);
    const [openClasses, setOpenClasses] = useState(false);
    const [currentClass, setCurrentClass] = useState(null);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);

    const [valueSubjects, setValueSubjects] = useState(null);
    const [data, setData] = useState([]);
    


    useEffect(() => {
        const loadData = navigation.addListener('focus', () => {
            loadSubjects(setSubjects),
            loadClasses(setClasses)
        })

        selectChosenNotes(valueSubjects, setData);
        
        return loadData;
    }, [navigation, valueSubjects, setData])



    const subjectItems = subjects.map(subject => {
        return { label: subject.subject_name, value: subject.subject_id.toString() };
    });

    const classesItems = classes.map(myclass => {
        return { label: myclass.class_name, value: myclass.class_id.toString() };
    })




    Moment.locale('pl');
    // var noteDate = new Date().toLocaleString();
    var formattedNoteDate = Moment(formattedNoteDate).format('DD.MM.yyyy');

    

    const addEvent = (currentTitle, currentNote, currentSubject, currentClass, formattedNoteDate) => {
        console.log('tytul: ' + currentTitle)
        console.log('notatka: ' + currentNote)
        console.log('przedmiot: ' + currentSubject)
        console.log('zajecia: ' + currentClass)
        db.transaction(tx =>
            tx.executeSql(
                'INSERT INTO notes (title, note, subject_id, class_id, create_day) values(?,?,?,?,?)',
                [currentTitle, currentNote, currentSubject, currentClass, formattedNoteDate],
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
                    placeholder='Dodaj tytuł wydarzenia...'
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
                    value={valueSubjects}
                    items={subjectItems}
                    setOpen={setOpenSubjects}
                    setValue={setValueSubjects}
                    setItems={setSubjects}
                    ScrollView={false}
                    style={{...styles.style, marginBottom: 10, marginTop: 40}}
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
        } else if(item.type === 'descriptionTextInput') {
            return(
                <TextInput 
                    value={currentNote}
                    onChangeText={setCurrentNote}
                    placeholder='Dodaj krótki opis...'
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
                        marginVertical: 10,
                        height: 200,
                        backgroundColor: MyColors.appGray,
                        flexWrap: 'wrap'
                    }}
                />
            )
        } else if(item.type === 'notes') {
            return data.map((element, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate('ReadNoteScreen', { noteID: element.note_id })} style={styles.noteStyle}>
        
                    <View>
                      <Text style={globalStyles.headlineText}>{element.title}</Text>
                    </View>
        
                    <View style={{flex: 1, backgroundColor: MyColors.appLightGray, height: 1, marginBottom: 10}} />
        
                    <View style={styles.infoView}>
                      <FontAwesome5 name="book" size={18} color="#fff" style={{flex: 1}}/>
                      <Text style={styles.infoText}>{element.subject_name}</Text>
                    </View>
        
                    <View style={styles.infoView}>
                      <FontAwesome5 name="info-circle" size={18} color="#fff" style={{flex: 1}} />
                      <Text style={styles.infoText}>{element.class_name}</Text>
                    </View>
        
                    <View style={styles.noteDataView}>
                        <Text style={styles.noteDataText}>{element.create_day}</Text>
                    </View>
        
                  </TouchableOpacity>
                )
              })
        } else if(item.type === 'addButton') {
            return(
                <MakeButton onPress={() => addNote(currentTitle, currentNote, currentSubject, currentClass, formattedNoteDate)}/>
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
                    <Text style={headerStyles.headerText}>Dodaj wydarzenie</Text>
                </View>

                <View style={styles.container}>
                    <FlatList 
                        data={[
                            { type: 'addButton' },
                            { type: 'notes' },
                            { type: 'classesDropDownPicker' },
                            { type: 'subjectsDropDownPicker' },
                            { type: 'descriptionTextInput' },
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
        borderColor: MyColors.appOrange,
        marginBottom: 50
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
    },
    noteStyle: {
        width: '100%',
        backgroundColor: MyColors.appDark,
        borderRadius: 20,
        padding: 12,
        marginBottom: 15, 
        borderColor: MyColors.appLightGray, 
        borderWidth: 1
      },
      infoView: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 5
      },
      infoText: {
        fontSize: 16,
        color: '#fff',
        flex: 10
      },
      noteDataView: {
        alignItems: 'flex-end',
        marginTop: 2,
        paddingHorizontal: 5
      },
      noteDataText: {
        fontSize: 12,
        color: MyColors.appLightGray,
        textTransform: 'uppercase',
        flex: 15
      },
});