import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Switch, Platform, FlatList } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import { MyColors } from '../assets/styles/colors';

import { headerStyles, globalStyles, createStyles } from '../assets/styles/index';

import { SettingsScreenButton } from '../components/customButtons';

import { alertDeleteAllData } from '../components/AppAlerts';

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
  const { darkMode, changeDarkMode, theme } = useDarkMode()
  const tempStyles = createStyles(theme)

  const getTranslatedText = (key) => {
    return appLanguage[language][key];
  }


  const handleLanguageChange = (value) => {
    console.log('Wybrany jezyk: ', value)
    changeLanguage(value)
  }

  const handleDarkModeChange = (value) => {
    console.log('Wybrany darkmode: ', value)
    changeDarkMode(value)
  }

  const handleDeleteAllData = () => {
    alertDeleteAllData(getTranslatedText)
  }


  const renderItem = ({ item }) => {
    if (item.type === 'language') {
      return (
        <>
          <View style={tempStyles.headlineView}>
            <Text style={tempStyles.sectionText}>{getTranslatedText('languageText')}</Text>
          </View>
          <DropDownPicker
            placeholder='Wybierz język'
            open={openLanguages}
            value={language}
            items={languages}
            setOpen={setOpenLanguages}
            setValue={(callback) => {
              const value = typeof callback === 'function' ? callback(language) : callback;
              handleLanguageChange(value);
            }}
            setItems={setLanguages}
            ScrollView={false}
            style={styles.dropDownStyle}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            textStyle={styles.dropDownTextStyle}
            arrowIconContainerStyle={styles.arrowIconContainerStyle}
          />
        </>
      )
    }
    if (item.type === 'rest') {
      return (
        <>
          {/* DARK THEME section */}
          <View style={tempStyles.headlineView}>
            <Text style={tempStyles.sectionText}>{getTranslatedText('themeText')}</Text>
          </View>

          <View style={{...tempStyles.eventView, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
            <MaterialCommunityIcons name="invert-colors" size={24} color={theme.primary} style={{paddingHorizontal: 5}}/>
            <Text style={tempStyles.subjectText}>{darkMode ? getTranslatedText('dark') : getTranslatedText('light')}</Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Switch
                value={darkMode}
                onValueChange={handleDarkModeChange}
                trackColor={{false: theme.textSecondary, true: theme.primary}}
                thumbColor={darkMode ? '#0066CD' : '#BDBBBB'}
                style={{height: Platform.OS === 'android' ? 20 : 30}}
              />
            </View>
          </View>


          {/* DATA section */}
          <View style={tempStyles.headlineView}>
            <Text style={tempStyles.sectionText}>{getTranslatedText('dataText')}</Text>
          </View>
          <SettingsScreenButton onPress={() => console.log("To do")} icon={"file-export"} text={getTranslatedText('dataExportButton')}/>
          <SettingsScreenButton onPress={() => console.log("To do")} icon={"file-import"} text={getTranslatedText('dataImportButton')}/>

          <View style={tempStyles.headlineView}>
            <Text style={tempStyles.sectionText}>{getTranslatedText('deleteDataText')}</Text>
          </View>
          <SettingsScreenButton onPress={handleDeleteAllData} icon={"delete"} text={getTranslatedText('deleteDataButton')}/>
        </>
      )
    }
  }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 40
    },
    dropDownStyle: {
      backgroundColor: theme.secondary,
      flex: 1,
      borderRadius: 20,
      borderWidth: 0
    },
    dropDownContainerStyle: {
      backgroundColor: theme.secondary,
      paddingVertical: 5,
      borderWidth: 0
    },
    dropDownTextStyle: {
      color: theme.textPrimary,
      fontSize: 20
    },
    arrowIconContainerStyle: {
      backgroundColor: theme.primary,
      borderRadius: 5
    }
  });

  

  return (
    <>
      <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: theme.navigation}}/>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: theme.background}}>

        {/* HEADER */}
        <View style={tempStyles.headerBackground}>
            <Text style={headerStyles.headerText}>{getTranslatedText('settingsScreenTitle')}</Text>
        </View>


        {/* CONTAINER */}
        {/* <ScrollView> */}
          <View style={styles.container}>
            <FlatList
              data={[
                { type: 'rest' },
                { type: 'language' }
              ]}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexDirection: 'column-reverse', paddingBottom: 100, width: '100%'}}
            />
          </View>

      </SafeAreaView>
    </>
  );
}