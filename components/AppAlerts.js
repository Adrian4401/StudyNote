import { Alert } from "react-native";

import { deleteAllData } from '../databaseQueries/databaseQueries.js'

import appLanguage from "../utils/languages.js";
import { useLanguage } from "../context/LanguageContext.js";





export const AlertDeleteAllData = () => {

    const { language } = useLanguage();

    const getTranslatedText = (key) => {
        return appLanguage[language][key];
    }

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