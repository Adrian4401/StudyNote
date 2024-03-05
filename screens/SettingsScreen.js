import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';

import * as SQLite from 'expo-sqlite';

import { MyColors } from '../colors';

import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';



export default function SettingsScreen() {

  const db = SQLite.openDatabase('studynote.db');

  const deleteSubjects = () => {
    db.transaction(tx => {
      tx.executeSql(
          'DELETE FROM subjects',
          null,
          (txObj, resultSet) => {
            console.log('udalo sie usunac dane z SUBJECTS')
          },
          (txObj, resultSet) => console.log('nie udalo sie usunac danych z SUBJECTS')
      )
    })
  }
  const deleteTableSubjects = () => {
    db.transaction(tx => {
      tx.executeSql(
          'DROP TABLE IF EXISTS subjects',
          null,
          (txObj, resultSet) => {
            console.log('udalo sie usunac tabele SUBJECTS')
          },
          (txObj, resultSet) => console.log('nie udalo sie usunac tabeli SUBJECTS')
      )
    })
  }

  const deleteClasses = () => {
    db.transaction(tx => {
      tx.executeSql(
          'DELETE FROM classes',
          null,
          (txObj, resultSet) => {
            console.log('udalo sie usunac dane z CLASSES')
          },
          (txObj, resultSet) => console.log('nie udalo sie usunac danych z CLASSES')
      )
    })
  }
  const deleteTableClasses = () => {
    db.transaction(tx => {
      tx.executeSql(
          'DROP TABLE IF EXISTS classes',
          null,
          (txObj, resultSet) => {
            console.log('udalo sie usunac tabele CLASSES')
          },
          (txObj, resultSet) => console.log('nie udalo sie usunac tabeli CLASSES')
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
              <MaterialIcons name="notifications" size={24} color={MyColors.appOrange} style={{paddingHorizontal: 5}}/>
              <Text style={globalStyles.subjectText}>Powiadomienia</Text>
            </View>

            {/* HEADLINE */}
            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.headlineText}>Dane</Text>
            </View>

            
            <TouchableOpacity onPress={deleteSubjects} style={{...globalStyles.eventView, flexDirection: 'row', paddingHorizontal: 20}}>
              <MaterialIcons name="delete" size={24} color={MyColors.appOrange} style={{paddingHorizontal: 5}}/>
              <Text style={globalStyles.subjectText}>Usuń przedmioty</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteTableSubjects} style={{...globalStyles.eventView, flexDirection: 'row', paddingHorizontal: 20}}>
              <MaterialIcons name="delete" size={24} color={MyColors.appOrange} style={{paddingHorizontal: 5}}/>
              <Text style={globalStyles.subjectText}>Usuń tabelę przedmioty</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteClasses} style={{...globalStyles.eventView, flexDirection: 'row', paddingHorizontal: 20}}>
              <MaterialIcons name="delete" size={24} color={MyColors.appOrange} style={{paddingHorizontal: 5}}/>
              <Text style={globalStyles.subjectText}>Usuń zajęcia</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteTableClasses} style={{...globalStyles.eventView, flexDirection: 'row', paddingHorizontal: 20}}>
              <MaterialIcons name="delete" size={24} color={MyColors.appOrange} style={{paddingHorizontal: 5}}/>
              <Text style={globalStyles.subjectText}>Usuń tabelę zajęć</Text>
            </TouchableOpacity>
            

          </View>
        </ScrollView>

        <View style={{width: '100%',height: 40}} />

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
