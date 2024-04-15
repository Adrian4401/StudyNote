import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Button } from 'react-native';

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { MyColors } from '../colors';

import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';

import { SettingsScreenButton } from '../components/customButtons';

import { AlertDeleteAllData } from '../components/AppAlerts';





export default function SettingsScreen() {



  return (
    <>
      <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

        {/* HEADER */}
        <View style={headerStyles.headerBackground}>
            <Text style={headerStyles.headerText}>Ustawienia</Text>
        </View>


        {/* CONTAINER */}
        <ScrollView>
          <View style={styles.container}>
            
            {/* HEADLINE */}
            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.headlineText}>Ustawienia</Text>
            </View>
          
            <TouchableOpacity style={{...globalStyles.eventView, flexDirection: 'row', paddingHorizontal: 20}}>
              <FontAwesome name="user" size={24} color={MyColors.appOrange} style={{paddingHorizontal: 5}}/>
              <Text style={globalStyles.subjectText}>Nazwa użytkownika</Text>
            </TouchableOpacity>
            <View style={{...globalStyles.eventView, flexDirection: 'row', paddingHorizontal: 20}}>
              <FontAwesome name="paint-brush" size={22} color={MyColors.appOrange} style={{paddingHorizontal: 5}}/>
              <Text style={globalStyles.subjectText}>Motyw aplikacji</Text>
            </View>
            <View style={{...globalStyles.eventView, flexDirection: 'row', paddingHorizontal: 20}}>
              <MaterialCommunityIcons name="bell" size={24} color={MyColors.appOrange} style={{paddingHorizontal: 5}}/>
              <Text style={globalStyles.subjectText}>Powiadomienia</Text>
            </View>

            {/* HEADLINE */}
            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.headlineText}>Dane</Text>
            </View>

            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.littleText}>Zarządzanie danymi</Text>
            </View>
            <SettingsScreenButton onPress={() => console.log("To do")} icon={"import-export"} text='Eksportowanie danych'/>
            <SettingsScreenButton onPress={() => console.log("To do")} icon={"import-export"} text='Importowanie danych'/>

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
  }
});
