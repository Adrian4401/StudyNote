import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DropDownPicker from 'react-native-dropdown-picker';

import { MyColors } from '../colors';

import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';
import { dropdownStyles } from '../styles/dropdownStyles'

import { Ionicons, FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';

const subjectsList = [
  { label: 'Wszystkie przedmioty', value: '0' },
  { label: 'Wizualizacja 3D', value: '1' },
  { label: 'Sztuczna Inteligencja', value: '2' },
  { label: 'Programowanie komponentowe', value: '3' },
  { label: 'Język angielski', value: '4' }
];

const timeList = [
  { label: 'Najnowsze', value: '0' },
  { label: 'Najstarsze', value: '1' },
  { label: 'Ostatni tydzień', value: '2' }
];

export default function NoteScreen() {

  const navigation = useNavigation();

  const [openSubjects, setOpenSubjects] = useState(false);
  const [valueSubjects, setValueSubjects] = useState(null);
  const [openNewest, setOpenNewest] = useState(false);
  const [valueNewest, setValueNewest] = useState(null);
  const [subjects, setSubjects] = useState([
    {label: 'Wizualizacja 3D', value: '0'},
    {label: 'Sztuczna Inteligencja', value: '1'},
    {label: 'Programowanie komponentowe', value: '2'},
    {label: 'Dynamiczne witryny internetowe', value: '3'}
  ]);
  const [newest, setNewest] = useState([
    {label: 'Najnowsze', value: '0'},
    {label: 'Najstarsze', value: '1'},
    {label: 'Ostatni tydzień', value: '1'}
  ]);


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
        <ScrollView>
          <View style={styles.container}>
            
            {/* HEADLINE */}
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
                style={{
                  backgroundColor: MyColors.appDark,
                  borderWidth: 1,
                  borderColor: MyColors.appOrange,
                  marginBottom: 10
                }}
                dropDownContainerStyle={{
                  backgroundColor: MyColors.appDark,
                  borderWidth: 1,
                  borderColor: MyColors.appOrange
                }}
                textStyle={{
                  color: MyColors.appLightGray
                }}
                arrowIconContainerStyle={{
                  backgroundColor: MyColors.appOrange,
                  borderRadius: 5
                }}
              />

              <DropDownPicker
                open={openNewest}
                value={valueNewest}
                items={newest}
                setOpen={setOpenNewest}
                setValue={setValueNewest}
                setItems={setNewest}
                ScrollView={false}
                style={{
                  backgroundColor: MyColors.appDark,
                  borderWidth: 1,
                  borderColor: MyColors.appOrange
                }}
                dropDownContainerStyle={{
                  backgroundColor: MyColors.appDark,
                  borderWidth: 1,
                  borderColor: MyColors.appOrange
                }}
                textStyle={{
                  color: MyColors.appLightGray
                }}
                arrowIconContainerStyle={{
                  backgroundColor: MyColors.appOrange,
                  borderRadius: 5
                }}
              />

             
            </View>

            {/* NOTE */}

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