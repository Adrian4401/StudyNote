import { Alert } from "react-native";

import { deleteAllData } from '../databaseQueries/databaseQueries.js'

export const AlertDeleteAllData = () => {
    Alert.alert('Usuwanie danych', 'Czy na pewno usunąć wszystkie dane?', [
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
}