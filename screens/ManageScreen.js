import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather, MaterialIcons } from '@expo/vector-icons';

import { MyColors } from '../colors';

import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';

import { loadSubjects, loadClasses } from '../databaseQueries/Select';

import { DBConnect } from '../databaseQueries/DBConnect';

import * as SQLite from 'expo-sqlite';

export default function ManageScreen() {

  const db = SQLite.openDatabase('studynote.db');

  const navigation = useNavigation();

  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadSubjects(setSubjects);
      loadClasses(setClasses);
    });

    return unsubscribe;
  }, [navigation])

  const showSubjects = () => {
    return subjects.map((subject, index) => {
        return(
            <View key={index} style={styles.itemsView}>
                <Text style={styles.itemsText}>{subject.subject_name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('EditSubjectScreen', { subjectID: subject.subject_id, subjectName: subject.subject_name })} style={{flex: 1, alignItems: 'flex-end'}}>
                  <MaterialIcons name="edit" size={24} color="white"/>
                </TouchableOpacity>
            </View>
        )
    })
  }

  const showClasses = () => {
    return classes.map((myclass, index) => {
        return(
            <View key={index} style={styles.itemsView}>
                <Text style={styles.itemsText}>{myclass.class_name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('EditClassScreen', { classID: myclass.class_id, className: myclass.class_name })} style={{flex: 1, alignItems: 'flex-end'}}>
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
              <TouchableOpacity onPress={() => navigation.navigate('AddClassScreen')}>
                <Feather name="plus" size={26} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={{backgroundColor: MyColors.eventBlue, padding: 10, borderRadius: 20, flex: 1}}>
              <ScrollView>  
                  {showClasses()}
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
