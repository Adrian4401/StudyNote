import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { useEffect, useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { MyColors } from '../../utils/colors.js';

import { headerStyles } from '../../styles/headerStyles';
import { globalStyles } from '../../styles/globalStyles';

import { GoBackButton, MakeButton } from '../../components/customButtons.js';

import { addClass, loadClasses } from '../../databaseQueries/databaseQueries.js';

import appLanguage from "../../utils/languages";
import { useLanguage } from '../../context/LanguageContext';



export default function AddClassScreen() {

    const [classes, setClasses] = useState([]);
    const [currentClass, setCurrentClass] = useState(undefined);

    const { language } = useLanguage();

    const getTranslatedText = (key) => {
        return appLanguage[language][key];
    }

    useEffect(() => {
        loadClasses(setClasses);
        console.log(classes)
    }, []);

    const showBottomClassesInfo = () => {
        if(classes && classes.length > 0){
            return(
                <View style={{width: '100%', justifyContent: 'flex-start', marginBottom: 10, marginTop: 40}}>
                    <Text style={globalStyles.littleText}>{getTranslatedText('yourClasses')}</Text>
                </View>
            )
        } else {
            return(
                <View style={{width: '100%', alignItems: 'center', marginTop: 100}}>
                    <Text style={globalStyles.littleText}>{getTranslatedText('emptyClassesInfo')}.</Text>
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


    const handleAddClass = () => {
        addClass(currentClass, setCurrentClass, classes, setClasses)
    }
 

    

    return (
        <>
            <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
            <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>


                {/* HEADER */}
                <View style={headerStyles.headerBackground}>
                    <Text style={headerStyles.headerText}>{getTranslatedText('add')} {getTranslatedText('classes')}</Text>
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
                            placeholder={getTranslatedText('addClassesPlaceholder')}
                            placeholderTextColor={MyColors.appLightGray}
                            maxLength={50}
                            style={{
                                color: 'white',
                                width: '100%',
                                fontSize: 25,
                                borderWidth: 2,
                                borderColor: MyColors.appBlue,
                                borderRadius: 10,
                                padding: 10,
                                marginVertical: 10,
                                marginTop: 30
                            }}
                        />
                        
                        <MakeButton onPress={handleAddClass}/>

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
