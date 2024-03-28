import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Button } from 'react-native';

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { MyColors } from '../colors';

import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';

import { SettingsScreenButton } from '../components/customButtons';
import { 
  AlertDeleteAllClasses,
  AlertDeleteAllNotes,
  AlertDeleteAllSubjects, 
  AlertDeleteClassesTable, 
  AlertDeleteNotesTable, 
  AlertDeleteSubjectsTable 
} from '../components/AppAlerts';

import { DBConnect } from '../databaseQueries/DBConnect';



export default function SettingsScreen() {

  const db = DBConnect();

  const deleteEventsTable = () => {
    db.transaction(tx => {
      tx.executeSql(
          'DROP TABLE IF EXISTS events',
          null,
          (_, resultSet) => {
            console.log('DATA -- Events table deleted')
          },
          (error) => console.log('ERROR -- Deleting events table failed -> ', error)
      )
    })
  }

  const deleteEvents = () => {

    db.transaction(tx => {
      tx.executeSql(
          'DELETE FROM events',
          null,
          (_, resultSet) => {
            console.log('DATA -- Data from table events deleted')
          },
          (error) => console.log('ERROR -- Deleting data from events table failed -> ', error)
      )
    })
}

  return (
    <>
      <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

        <StatusBar barStyle='light-content' />

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
            <SettingsScreenButton onPress={AlertDeleteAllSubjects} icon={"import-export"} text='Eksportowanie danych'/>
            <SettingsScreenButton onPress={AlertDeleteSubjectsTable} icon={"import-export"} text='Importowanie danych'/>

            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.littleText}>Usuwanie danych</Text>
            </View>
            <SettingsScreenButton onPress={AlertDeleteAllSubjects} icon={"delete"} text='Usuń wszystkie przedmioty'/>
            <SettingsScreenButton onPress={AlertDeleteSubjectsTable} icon={"delete"} text='Usuń tabelę przedmiotów'/>
            <SettingsScreenButton onPress={AlertDeleteAllClasses} icon={"delete"} text='Usuń wszystkie zajęcia'/>
            <SettingsScreenButton onPress={AlertDeleteClassesTable} icon={"delete"} text='Usuń tabelę zajęć'/>
            <SettingsScreenButton onPress={AlertDeleteAllNotes} icon={"delete"} text='Usuń wszystkie notatki'/>
            <SettingsScreenButton onPress={AlertDeleteNotesTable} icon={"delete"} text='Usuń tabelę notatek'/>

            <Button
              title="Usuń tabele wydarzeń"
              onPress={deleteEventsTable}
            />

            <Button
              title="Usuń wydarzenia"
              onPress={deleteEvents}
            />
            

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
