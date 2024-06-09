import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, Switch, Platform } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import { MyColors } from '../utils/colors';

import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';

import { SettingsScreenButton } from '../components/customButtons';

import { AlertDeleteAllData } from '../components/AppAlerts';

import appLanguage from "../utils/languages";
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';

import { MaterialCommunityIcons } from '@expo/vector-icons';





export default function SettingsScreen() {

  const [openLanguages, setOpenLanguages] = useState(false);
  // const [valueLanguages, setValueLanguages] = useState('pl');
  const { language, changeLanguage } = useLanguage();
  const [languages, setLanguages] = useState([
    {label: 'Polski', value: 'pl', icon: () => <Image source={require('../assets/pl_flag.png')} style={{borderRadius: 20}}/>},
    {label: 'English', value: 'en', icon: () => <Image source={require('../assets/uk_flag.png')} style={{borderRadius: 20}}/>}
  ]);
  const { darkMode, changeDarkMode } = useDarkMode()


  const getTranslatedText = (key) => {
    return appLanguage[language][key];
  }



  

  return (
    <>
      <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

        {/* HEADER */}
        <View style={headerStyles.headerBackground}>
            <Text style={headerStyles.headerText}>{getTranslatedText('settingsScreenTitle')}</Text>
        </View>


        {/* CONTAINER */}
        <ScrollView>
          <View style={styles.container}>

            
            {/* LANGUAGE section */}
            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.sectionText}>{getTranslatedText('languageText')}</Text>
            </View>
            <DropDownPicker
              placeholder='Wybierz język'
              open={openLanguages}
              value={language}
              items={languages}
              setOpen={setOpenLanguages}
              setValue={changeLanguage}
              setItems={setLanguages}
              ScrollView={false}
              style={styles.style}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              textStyle={styles.textStyle}
              arrowIconContainerStyle={styles.arrowIconContainerStyle}
            />


            {/* DARK THEME section */}
            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.sectionText}>{getTranslatedText('themeText')}</Text>
            </View>
            <SettingsScreenButton onPress={() => console.log("To do")} icon={"invert-colors"} text={getTranslatedText('themeText')}/>

            <View style={{...globalStyles.eventView, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
              <MaterialCommunityIcons name="invert-colors" size={24} color={MyColors.appBlue} style={{paddingHorizontal: 5}}/>
              <Text style={globalStyles.subjectText}>{getTranslatedText('themeText')}</Text>
              <View
                style={{
                  flex: 1,
                  // backgroundColor: 'red',
                  alignItems: 'flex-end'
                }}
              >
                <Switch
                  value={darkMode}
                  onValueChange={changeDarkMode}
                  trackColor={{false: MyColors.appLightGray, true: MyColors.appBlue}}
                  thumbColor={darkMode ? '#0066CD' : '#BDBBBB'}
                  style={{height: Platform.OS === 'android' ? 20 : 30}}
                />
              </View>
            </View>


            {/* DATA section */}
            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.sectionText}>{getTranslatedText('dataText')}</Text>
            </View>
            <SettingsScreenButton onPress={() => console.log("To do")} icon={"file-export"} text={getTranslatedText('dataExportButton')}/>
            <SettingsScreenButton onPress={() => console.log("To do")} icon={"file-import"} text={getTranslatedText('dataImportButton')}/>

            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.sectionText}>{getTranslatedText('deleteDataText')}</Text>
            </View>
            <SettingsScreenButton onPress={AlertDeleteAllData} icon={"delete"} text={getTranslatedText('deleteDataButton')}/>
            

          </View>
        </ScrollView>

      </SafeAreaView>
    </>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.appBackground,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 120
  },
  style: {
    backgroundColor: MyColors.appDark,
    flex: 1,
    borderRadius: 20
  },
  dropDownContainerStyle: {
    backgroundColor: MyColors.appDark,
    paddingVertical: 5
  },
  textStyle: {
    color: 'white',
    fontSize: 20
  },
  arrowIconContainerStyle: {
    backgroundColor: MyColors.appBlue,
    borderRadius: 5
  }
});
