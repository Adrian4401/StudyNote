import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import { MyColors } from '../colors';

import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';

import { SettingsScreenButton } from '../components/customButtons';

import { AlertDeleteAllData } from '../components/AppAlerts';

import { Entypo } from '@expo/vector-icons';

import appLanguage from '../utils/languages';





export default function SettingsScreen() {


  const [openLanguages, setOpenLanguages] = useState(false);
  const [valueLanguages, setValueLanguages] = useState('pl');
  const [languages, setLanguages] = useState([
    {label: 'Polski', value: 'pl', icon: () => <Image source={require('../assets/pl_flag.png')} style={{borderRadius: 20}}/>},
    {label: 'English', value: 'en', icon: () => <Image source={require('../assets/uk_flag.png')} style={{borderRadius: 20}}/>}
  ]);


  const getTranslatedText = (key) => {
    return appLanguage[valueLanguages][key];
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
            
            {/* HEADLINE */}
            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.headlineText}>Ustawienia</Text>
            </View>

            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.littleText}>{getTranslatedText('languageText')}</Text>
            </View>
            <DropDownPicker
              placeholder='Wybierz język'
              open={openLanguages}
              value={valueLanguages}
              items={languages}
              setOpen={setOpenLanguages}
              setValue={setValueLanguages}
              setItems={setLanguages}
              ScrollView={false}
              style={styles.style}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              textStyle={styles.textStyle}
              arrowIconContainerStyle={styles.arrowIconContainerStyle}
            />
            <SettingsScreenButton onPress={() => console.log("To do")} icon={"invert-colors"} text='Ciemny motyw'/>

            {/* HEADLINE */}
            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.headlineText}>Dane</Text>
            </View>

            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.littleText}>Zarządzanie danymi</Text>
            </View>
            <SettingsScreenButton onPress={() => console.log("To do")} icon={"file-export"} text='Eksportowanie danych'/>
            <SettingsScreenButton onPress={() => console.log("To do")} icon={"file-import"} text='Importowanie danych'/>

            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.littleText}>Usuwanie danych</Text>
            </View>
            <SettingsScreenButton onPress={AlertDeleteAllData} icon={"delete"} text='Usuń wszystkie dane'/>
            

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
    backgroundColor: MyColors.appOrange,
    borderRadius: 5
  }
});
