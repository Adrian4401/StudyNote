import { Alert } from "react-native";

import { 
    deleteTableSubjects,
    deleteSubjects,
    deleteTableClasses,
    deleteClasses,
    deleteTableNotes,
    deleteNotes
} from '../databaseQueries/Delete.js'

export const AlertDeleteSubjectsTable = () => {
    Alert.alert('Usuwanie tabeli przedmiotów', 'Czy na pewno usunąć tabelę?', [
        {
            text: 'Anuluj',
            onPress: () => console.log('Anuluj'),
            style: 'cancel'
        },
        {
            text: 'Usuń',
            onPress: () => deleteTableSubjects()
        }
    ])
}

export const AlertDeleteAllSubjects = () => {
    Alert.alert('Usuwanie przedmiotów', 'Czy na pewno chcesz usunąć wszystkie przedmioty?', [
        {
            text: 'Anuluj',
            onPress: () => console.log('Anuluj'),
            style: 'cancel'
        },
        {
            text: 'Usuń',
            onPress: () => deleteSubjects()
        }
    ])
}

export const AlertDeleteClassesTable = () => {
    Alert.alert('Usuwanie tabeli zajęć', 'Czy na pewno usunąć tabelę?', [
        {
            text: 'Anuluj',
            onPress: () => console.log('Anuluj'),
            style: 'cancel'
        },
        {
            text: 'Usuń',
            onPress: () => deleteTableClasses()
        }
    ])
}

export const AlertDeleteAllClasses = () => {
    Alert.alert('Usuwanie zajęć', 'Czy na pewno chcesz usunąć wszystkie zajęcia?', [
        {
            text: 'Anuluj',
            onPress: () => console.log('Anuluj'),
            style: 'cancel'
        },
        {
            text: 'Usuń',
            onPress: () => deleteClasses()
        }
    ])
}

export const AlertDeleteNotesTable = () => {
    Alert.alert('Usuwanie tabeli notatek', 'Czy na pewno usunąć tabelę?', [
        {
            text: 'Anuluj',
            onPress: () => console.log('Anuluj'),
            style: 'cancel'
        },
        {
            text: 'Usuń',
            onPress: () => deleteTableNotes()
        }
    ])
}

export const AlertDeleteAllNotes = () => {
    Alert.alert('Usuwanie notatek', 'Czy na pewno chcesz usunąć wszystkie notatki?', [
        {
            text: 'Anuluj',
            onPress: () => console.log('Anuluj'),
            style: 'cancel'
        },
        {
            text: 'Usuń',
            onPress: () => deleteNotes()
        }
    ])
}