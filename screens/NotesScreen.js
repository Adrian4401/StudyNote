import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

import { FontAwesome5, AntDesign } from '@expo/vector-icons';

import { MyColors } from '../colors';

import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';

import { loadSubjects, selectAllNotes, selectAllNotesWithSubjects, selectChosenNotes } from '../databaseQueries/Select';



export default function NoteScreen() {

  const navigation = useNavigation();

  const [openSubjects, setOpenSubjects] = useState(false);
  const [valueSubjects, setValueSubjects] = useState(null);

  const [subjectsDropDown, setSubjectsDropDown] = useState([]);

  const [data, setData] = useState([]);



  useEffect(() => {

    const loadData = navigation.addListener('focus', () => {
      selectAllNotesWithSubjects(setSubjectsDropDown, setData)
    });

    selectChosenNotes(valueSubjects, setData);

    return loadData;

  }, [navigation, valueSubjects, setData])

  

  const subjectOptions = subjectsDropDown.map(subject => {
    return { label: subject.subject_name, value: subject.subject_id.toString() };
  });



  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return (
        <View style={{...globalStyles.headlineViewWithIcon, marginTop: 30}}>
          <Text style={globalStyles.headlineText}>Twoje notatki</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddNoteScreen')}>
            <AntDesign name="plus" size={26} color="#fff" />
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
            style={{...styles.style, marginBottom: 30}}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            textStyle={styles.textStyle}
            arrowIconContainerStyle={styles.arrowIconContainerStyle}
          />
        </View>
      );
    } else if (item.type === 'note' && data) {
      return data.map((element, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('ReadNoteScreen', { noteID: element.note_id })} style={styles.noteStyle}>

            <View>
              <Text style={globalStyles.headlineText}>{element.title}</Text>
            </View>

            <View style={{flex: 1, backgroundColor: MyColors.appLightGray, height: 1, marginBottom: 10}} />

            <View style={styles.infoView}>
              <FontAwesome5 name="book" size={18} color="#fff" style={{flex: 1}}/>
              <Text style={styles.infoText}>{element.subject_name}</Text>
            </View>

            <View style={styles.infoView}>
              <FontAwesome5 name="info-circle" size={18} color="#fff" style={{flex: 1}} />
              <Text style={styles.infoText}>{element.class_name}</Text>
            </View>

            <View style={styles.noteDataView}>
                <Text style={styles.noteDataText}>{element.create_day}</Text>
            </View>

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
    padding: 12,
    marginBottom: 15, 
    borderColor: MyColors.appLightGray, 
    borderWidth: 1
  },
  infoView: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    flex: 10
  },
  noteDataView: {
    alignItems: 'flex-end',
    marginTop: 2,
    paddingHorizontal: 5
  },
  noteDataText: {
    fontSize: 12,
    color: MyColors.appLightGray,
    textTransform: 'uppercase',
    flex: 15
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