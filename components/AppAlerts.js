import { Alert } from "react-native";

import { deleteAllData, deleteSubject, deleteClass, deleteEvent, deleteNote } from '../databaseQueries/databaseQueries.js'





export const alertDeleteAllData = (getTranslatedText) => {

    return (
        Alert.alert(getTranslatedText('deletingData'), getTranslatedText('deleteDataQuestion'), [
            {
                text: 'Anuluj',
                onPress: () => console.log('Anuluj'),
                style: 'cancel'
            },
            {
                text: 'Usuń',
                onPress: () => deleteAllData()
            }
        ])
    )
}


export const alertDeleteSubject = (subjectID, setSubjects, navigation, getTranslatedText) => {

    Alert.alert(getTranslatedText('deletingSubject'), getTranslatedText('deleteSubjectQuestion'), [
        {
            text: 'Anuluj',
            onPress: () => console.log('Anuluj'),
            style: 'cancel'
        },
        {
            text: 'Usuń',
            onPress: () => deleteSubject(subjectID, setSubjects, navigation)
        }
    ])
}


export const alertDeleteClass = (classID, setClasses, navigation, getTranslatedText) => {
    Alert.alert(getTranslatedText('deletingClass'), getTranslatedText('deleteClassQuestion'), [
        {
            text: 'Anuluj',
            onPress: () => console.log('Anuluj'),
            style: 'cancel'
        },
        {
            text: 'Usuń',
            onPress: () => deleteClass(classID, setClasses, navigation)
        }
    ])
}


export const alertDeleteEvent = (eventID, navigation, getTranslatedText) => {
    Alert.alert(getTranslatedText('deletingEvent'), getTranslatedText('deleteEventQuestion'), [
        {
            text: 'Anuluj',
            onPress: () => console.log('Anuluj'),
            style: 'cancel'
        },
        {
            text: 'Usuń',
            onPress: () => deleteEvent(eventID, navigation)
        }
    ])
}


export const alertDeleteNote = (noteID, navigation, getTranslatedText) => {
    Alert.alert(getTranslatedText('deletingNote'), getTranslatedText('deleteNoteQuestion'), [
        {
            text: 'Anuluj',
            onPress: () => console.log('Anuluj'),
            style: 'cancel'
        },
        {
            text: 'Usuń',
            onPress: () => deleteNote(noteID, navigation)
        }
    ])
}