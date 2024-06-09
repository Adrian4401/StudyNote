import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import DropDownPicker from 'react-native-dropdown-picker';

import { MyColors } from '../../utils/colors.js';

import { headerStyles } from '../../styles/headerStyles';

import { EditButton, GoBackButton } from '../../components/customButtons.js';

import { selectEditedNote, editNote } from '../../databaseQueries/databaseQueries.js';

import Moment from 'moment';

import appLanguage from "../../utils/languages";
import { useLanguage } from '../../context/LanguageContext';





export default function EditNoteScreen() {

    const navigation = useNavigation();

    const route = useRoute();

    const [currentTitle, setCurrentTitle] = useState('');
    const [currentNote, setCurrentNote] = useState('');

    const [openSubjects, setOpenSubjects] = useState(false);
    const [openClasses, setOpenClasses] = useState(false);
    const [currentClass, setCurrentClass] = useState(null);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [noteID, setNoteID] = useState(null);

    const { language } = useLanguage();

    const getTranslatedText = (key) => {
        return appLanguage[language][key];
    }

    

    useEffect(() => {
        const { noteID } = route.params;
        setNoteID(noteID)

        const loadData = navigation.addListener('focus', () => {
            selectEditedNote(setSubjects, setClasses, noteID, setCurrentTitle, setCurrentNote, setCurrentSubject, setCurrentClass)
        })

        console.log('ID przedmiotu: ' + currentSubject);

        return loadData;
    }, [navigation, currentSubject])



    const subjectItems = subjects.map(subject => ({
        label: subject.subject_name,
        value: subject.subject_id,
    }));

    const classesItems = classes.map(myclass => ({
        label: myclass.class_name,
        value: myclass.class_id,
    }));



    Moment.locale('pl');
    var noteDate = new Date().toLocaleString();
    var formattedNoteDate = Moment(formattedNoteDate).format('DD.MM.yyyy');



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
                    value={currentTitle.toString()}
                    onChangeText={setCurrentTitle}
                    placeholderTextColor={MyColors.appLightGray}
                    maxLength={100}
                    multiline
                    style={{
                        color: 'white',
                        fontSize: 25,
                        borderWidth: 2,
                        borderColor: MyColors.appBlue,
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
                    value={currentNote.toString()}
                    onChangeText={setCurrentNote}
                    placeholderTextColor={MyColors.appLightGray}
                    multiline={true}
                    style={{
                        color: 'white',
                        flex: 1,
                        fontSize: 18,
                        borderWidth: 2,
                        borderColor: MyColors.appBlue,
                        borderRadius: 10,
                        padding: 10,
                        marginVertical: 50,
                        height: 400,
                        backgroundColor: MyColors.appGray,
                        flexWrap: 'wrap'
                    }}
                />
            )
        } else if(item.type === 'editButton') {
            return(
                <EditButton onPress={() => editNote(currentTitle, currentNote, currentSubject, currentClass, noteID, navigation)} />
            )
        }
    }


    return (
        <>
            <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
            <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

                {/* HEADER */}
                <View style={headerStyles.headerBackground}>
                    <Text style={headerStyles.headerText}>{getTranslatedText('edit')} {getTranslatedText('note_2')}</Text>
                </View>

                <View style={styles.container}>
                    <FlatList 
                        data={[
                            { type: 'editButton' },
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
        borderColor: MyColors.appBlue
    },
    dropDownContainerStyle: {
        backgroundColor: MyColors.appDark,
        borderWidth: 1,
        borderColor: MyColors.appBlue
    },
    textStyle: {
        color: MyColors.appLightGray
    },
    arrowIconContainerStyle: {
        backgroundColor: MyColors.appBlue,
        borderRadius: 5
    }
});