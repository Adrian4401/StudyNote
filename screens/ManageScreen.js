import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as SQLite from 'expo-sqlite';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import { MyColors } from '../colors';

import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';

import { loadSubjects } from '../database/DBFunctions';


export default function ManageScreen() {

  const navigation = useNavigation();

  const db = SQLite.openDatabase('studynote.db');

  const [subjects, setSubjects] = useState([]);

  // const loadSubjects = () => {
  //   db.transaction(tx => {
  //       tx.executeSql(
  //           'SELECT * FROM subjects WHERE is_deleted = 0', 
  //           null,
  //           (txObj, resultSet) => {
  //               setSubjects(resultSet.rows._array),
  //               console.log('wypisywanie przedmiotow')
  //           },
  //           (txObj, error) => console.log(error)
  //       );
  //   });
  // }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadSubjects(setSubjects);
    });

    return unsubscribe;
  }, [navigation])

  const showSubjects = () => {
    return subjects.map((subject, index) => {
        return(
            <View key={index} style={styles.itemsView}>
                <Text style={styles.itemsText}>{subject.subject_name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('EditSubjectScreen', { subjectName: subject.subject_name })} style={{flex: 1, alignItems: 'flex-end'}}>
                  <MaterialIcons name="edit" size={24} color="white"/>
                </TouchableOpacity>
            </View>
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
          <Text style={headerStyles.headerText}>Zarządzanie</Text>
        </View>


        {/* CONTAINER */}
        <View style={styles.container}>
          
          {/* HEADLINE */}
          <View style={{flex: 1, width: '100%'}}>
            <View style={{...globalStyles.headlineViewWithIcon, marginBottom: 10}}>
              <Text style={globalStyles.headlineText}>przedmioty</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AddSubjectScreen')}>
                <Feather name="plus" size={26} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={{backgroundColor: MyColors.eventBlue, padding: 10, borderRadius: 20, flex: 1}}>
              <ScrollView>  
                  {showSubjects()}
              </ScrollView>
            </View>
            
            
          </View>
          <View style={{flex: 1, width: '100%', marginTop: 20}}>
            <View style={{...globalStyles.headlineViewWithIcon, marginBottom: 10}}>
              <Text style={globalStyles.headlineText}>Rodzaj zajęć</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AddSubjectScreen')}>
                <Feather name="plus" size={26} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={{backgroundColor: MyColors.eventBlue, padding: 10, borderRadius: 20, flex: 1}}>
              <ScrollView>  
                  {showSubjects()}
              </ScrollView>
            </View>
          </View>
          
          
        </View>

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
    padding: 20
  },
  itemsView: {
    width: '100%',
    backgroundColor: MyColors.appDark,
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemsText: {
    fontSize: 20,
    color: '#fff',
    flex: 8
  }
});
