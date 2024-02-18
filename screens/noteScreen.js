import { StyleSheet, Text, View, SafeAreaView, StatusBar, Button, ScrollView } from 'react-native';
import { MyColors } from '../colors';
import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';
import { dropdownStyles } from '../styles/dropdownStyles'
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

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
  // const [value, setValue] = useState(null);
  const [subjectValue, setSubjectValue] = useState('0');
  const [timeValue, setTimeValue] = useState('0');
  const [isFocus, setIsFocus] = useState(false);

  // const renderLabel = () => {
  //   if (value || isFocus) {
  //     return (
  //       <Text style={[styles.label, isFocus && { color: MyColors.appOrange }]}>
  //         Dropdown label
  //       </Text>
  //     );
  //   }
  //   return null;
  // };

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
            <View style={{...globalStyles.headlineView, marginBottom: 10}}>
              <Text style={globalStyles.headlineText}>Twoje notatki</Text>
            </View>

            <View style={{width: '100%', marginBottom: 30}}>
              {/* {renderLabel()} */}
              <Dropdown
                style={[dropdownStyles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={dropdownStyles.placeholderStyle}
                selectedTextStyle={dropdownStyles.selectedTextStyle}
                inputSearchStyle={dropdownStyles.inputSearchStyle}
                iconStyle={dropdownStyles.iconStyle}
                data={subjectsList}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? subjectsList.find(item => item.value === '0').label : 'Wybierz'}
                searchPlaceholder="Search..."
                value={subjectValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setSubjectValue(item.value);
                  setIsFocus(false);
                }}
                // renderLeftIcon={() => (
                //   <AntDesign
                //     style={styles.icon}
                //     color={isFocus ? 'blue' : 'black'}
                //     name="Safety"
                //     size={20}
                //   />
                // )}
              />

              <Dropdown
                style={[dropdownStyles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={dropdownStyles.placeholderStyle}
                selectedTextStyle={dropdownStyles.selectedTextStyle}
                inputSearchStyle={dropdownStyles.inputSearchStyle}
                iconStyle={dropdownStyles.iconStyle}
                data={timeList}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? timeList.find(item => item.value === '0').label : 'Wybierz'}
                searchPlaceholder="Search..."
                value={timeValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setTimeValue(item.value);
                  setIsFocus(false);
                }}
                // renderLeftIcon={() => (
                //   <AntDesign
                //     style={styles.icon}
                //     color={isFocus ? 'blue' : 'black'}
                //     name="Safety"
                //     size={20}
                //   />
                // )}
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