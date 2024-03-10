import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';

import { MyColors } from '../colors';

import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';

import { loadSubjects } from '../databaseQueries/Select';



export default function NoteScreen() {

  const navigation = useNavigation();

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadSubjects(setSubjects)
    });

    return unsubscribe;
  }, [navigation])

  const subjectOptions = subjects.map(subject => {
    return { label: subject.subject_name, value: subject.subject_id.toString() };
  });

  const [openSubjects, setOpenSubjects] = useState(false);
  const [valueSubjects, setValueSubjects] = useState(null);
  const [openNewest, setOpenNewest] = useState(false);
  const [valueNewest, setValueNewest] = useState(null);

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
            setItems={setSubjects}
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
    } else if (item.type === 'note') {
      return (
        <View style={{...globalStyles.eventView, padding: 15, borderColor: MyColors.appLightGray, borderWidth: 1, zIndex: 1}}>
          <View>
            <Text style={globalStyles.headlineText}>Przetwarzanie informacji</Text>
          </View>
          <View style={{flex: 1, backgroundColor: MyColors.appGray, height: 1}} />
          <View style={globalStyles.eventSubjectView}>
            <FontAwesome5 name="book" size={20} color="#fff"/>
            <Text style={globalStyles.subjectText}>Sztuczna inteligencja</Text>
          </View>
          <View style={globalStyles.eventDatetimeView}>
              <Ionicons name="calendar-clear" size={18} color='#D1D0D0' style={{marginRight: 10}} />
              <Text style={globalStyles.littleText}>12.01.2024</Text>
          </View>
        </View>
      );
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
              { type: 'note' },
              { type: 'note' },
              { type: 'newestDropdown' },
              { type: 'subjectsDropdown' },
              { type: 'header' }
            ]}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexDirection: 'column-reverse'}}
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



{/* <ScrollView>
          <View style={styles.container}>
            
            HEADLINE
            <View style={globalStyles.headlineViewWithIcon}>
              <Text style={globalStyles.headlineText}>Twoje notatki</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AddNoteScreen')}>
                <Feather name="plus" size={26} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={{width: '100%', marginBottom: 30, zIndex: 1}}>

              <DropDownPicker
                open={openSubjects}
                value={valueSubjects}
                items={subjects}
                setOpen={setOpenSubjects}
                setValue={setValueSubjects}
                setItems={setSubjects}
                ScrollView={false}
                zIndex={10000}
                style={styles.style}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                textStyle={styles.textStyle}
                arrowIconContainerStyle={styles.arrowIconContainerStyle}
              />

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

            NOTE

            <View style={{...globalStyles.eventView, padding: 15, borderColor: MyColors.appLightGray, borderWidth: 1}}>
              <View>
                <Text style={globalStyles.headlineText}>Przetwarzanie informacji</Text>
              </View>
              <View style={{flex: 1, backgroundColor: MyColors.appGray, height: 1}} />
              <View style={globalStyles.eventSubjectView}>
                <FontAwesome5 name="book" size={20} color="#fff"/>
                <Text style={globalStyles.subjectText}>Sztuczna inteligencja</Text>
              </View>
              <View style={globalStyles.eventDatetimeView}>
                  <Ionicons name="calendar-clear" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={globalStyles.littleText}>12.01.2024</Text>
                </View>
            </View>


          </View>
        </ScrollView> */}

        {/* <View style={{width: '100%',height: 40}} /> */}