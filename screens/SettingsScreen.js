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
            <SettingsScreenButton onPress={() => console.log("To do")} icon={"bell"} text='Język'/>
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
  }
});
