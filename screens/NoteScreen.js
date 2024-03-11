import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';

import { MyColors } from '../colors';

import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';

import { loadSubjects } from '../databaseQueries/Select';

import { DBConnect } from '../databaseQueries/DBConnect';



export default function NoteScreen() {

  const navigation = useNavigation();

  const [subjectsDropDown, setSubjectsDropDown] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadSubjects(setSubjectsDropDown)
    });

    return unsubscribe;
  }, [navigation])

  const subjectOptions = subjectsDropDown.map(subject => {
    return { label: subject.subject_name, value: subject.subject_id.toString() };
  });

  const [openSubjects, setOpenSubjects] = useState(false);
  const [valueSubjects, setValueSubjects] = useState(null);
  const [openNewest, setOpenNewest] = useState(false);
  const [valueNewest, setValueNewest] = useState(null);

  const db = DBConnect();


  const [data, setData] = useState([]);


  useEffect(() => {
    const selectNotes = navigation.addListener('focus', () => {
      db.transaction(tx => 
        tx.executeSql(
          'SELECT notes.title, notes.note, subjects.subject_name, classes.class_name FROM notes RIGHT JOIN subjects ON notes.subject_id = subjects.subject_id RIGHT JOIN classes ON notes.class_id = classes.class_id WHERE notes.note IS NOT NULL;',
          [],
          (_, {rows}) => {
            const data = rows._array;
            console.log(data);
            setData(data);
            // data.map(element => {
            //   console.log(element.title);
            //   console.log(element.note);
            //   console.log(element.subject_name);
            // })
            console.log('Udalo sie wypisac notatki')
          },
          (txObj, error) => console.log('Nie udalo sie wypisac notatek -> ' + error)
        )  
      )
    })
    
    return selectNotes;
  }, [navigation])





  const [newest, setNewest] = useState([
    {label: 'Najnowsze', value: '0'},
    {label: 'Najstarsze', value: '1'},
    {label: 'Ostatni tydzień', value: '2'}
  ]);

  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return (
        <View style={{...globalStyles.headlineViewWithIcon, marginTop: 30}}>
          <Text style={globalStyles.headlineText}>Twoje notatki</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddNoteScreen')}>
            <Feather name="plus" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      );
    } else if (item.type === 'subjectsDropdown') {
      return (
        <View style={{width: '100%'}}>
          <DropDownPicker
            placeholder='Wybierz przedmiot'
            open={openSubjects}
            value={valueSubjects}
            items={subjectOptions}
            setOpen={setOpenSubjects}
            setValue={setValueSubjects}
            setItems={setSubjectsDropDown}
            ScrollView={false}
            style={{...styles.style, marginBottom: 10}}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            textStyle={styles.textStyle}
            arrowIconContainerStyle={styles.arrowIconContainerStyle}
          />
        </View>
      );
    } else if(item.type === 'newestDropdown') {
      return(
        <View style={{width: '100%', marginBottom: 30}}>
          <DropDownPicker
            open={openNewest}
            value={valueNewest}
            items={newest}
            setOpen={setOpenNewest}
            setValue={setValueNewest}
            setItems={setNewest}
            ScrollView={false}
            style={styles.style}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            textStyle={styles.textStyle}
            arrowIconContainerStyle={styles.arrowIconContainerStyle}
          />
        </View>
      )
    } else if (item.type === 'note' && data) {
        return data.map((element, index) => {
          return (
            <TouchableOpacity key={index} style={styles.noteStyle}>

              <View>
                <Text style={globalStyles.headlineText}>{element.title}</Text>
              </View>

              <View style={{flex: 1, backgroundColor: MyColors.appLightGray, height: 1}} />

              <View style={styles.infoView}>
                <FontAwesome5 name="book" size={20} color="#fff" style={{flex: 1}}/>
                <Text style={styles.infoText}>{element.subject_name}</Text>
              </View>

              <View style={styles.infoView}>
                <FontAwesome5 name="book" size={20} color="#fff" style={{flex: 1}}/>
                <Text style={styles.infoText}>{element.class_name}</Text>
              </View>

              <View style={styles.noteDataView}>
                  <Ionicons name="calendar-clear" size={18} color='#D1D0D0' style={{flex: 1}} />
                  <Text style={styles.noteDataText}>12.01.2024</Text>
              </View>

              {/* <View style={globalStyles.eventSubjectView}>
                <Text style={globalStyles.subjectText}>{element.note}</Text>
              </View> */}

            </TouchableOpacity>
          )
        })
    }
  };



  return (
    <>
      <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

        <StatusBar barStyle='light-content' />

        {/* HEADER */}
        <View style={headerStyles.headerBackground}>
            <Text style={headerStyles.headerText}>Notatnik</Text>
        </View>
        

        {/* CONTAINER */}
        <View style={styles.container}>
          <FlatList
            data={[
              { type: 'note' },
              { type: 'newestDropdown' },
              { type: 'subjectsDropdown' },
              { type: 'header' }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.appBackground,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  noteStyle: {
    width: '100%',
    backgroundColor: MyColors.appDark,
    borderRadius: 20,
    padding: 15,
    marginVertical: 5, 
    borderColor: MyColors.appLightGray, 
    borderWidth: 1
  },
  infoView: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5
  },
  infoText: {
    fontSize: 20,
    color: '#fff',
    flex: 10
  },
  noteDataView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 5
  },
  noteDataText: {
    fontSize: 15,
    color: MyColors.appLightGray,
    textTransform: 'uppercase',
    flex: 10
  },
  style: {
    backgroundColor: MyColors.appDark,
    borderWidth: 1,
    borderColor: MyColors.appOrange
  },
  dropDownContainerStyle: {
    backgroundColor: MyColors.appDark,
    borderWidth: 1,
    borderColor: MyColors.appOrange
  },
  textStyle: {
    color: MyColors.appLightGray
  },
  arrowIconContainerStyle: {
    backgroundColor: MyColors.appOrange,
    borderRadius: 5
  }
});