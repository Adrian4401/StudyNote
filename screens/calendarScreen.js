import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { MyColors } from '../colors';
import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


export default function CalendarScreen() {
  return (
    <>
      <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

        <StatusBar barStyle='light-content' />

        {/* HEADER */}
        <View style={headerStyles.headerBackground}>
            <Text style={headerStyles.headerText}>Kalendarz</Text>
        </View>

        {/* CONTAINER */}
        <ScrollView>
          <View style={styles.container}>
            
            {/* USER HEADLINE */}
            <View style={globalStyles.headlineView}>
              <View style={styles.headlineUserView}>
                <FontAwesome name="user-circle-o" size={24} color={MyColors.appOrange} />
                <Text style={styles.headlineUserText}>Adrian</Text>
              </View>
              <Text style={{...globalStyles.headlineText, marginBottom: 0, marginTop: 10}}>Twoje nadchodzące wydarzenia</Text>
              <Text style={globalStyles.littleText}>najbliższe 7 dni</Text>
            </View>

            {/* EVENT */}
            <View style={globalStyles.eventView}>
              <View style={styles.eventNameView}>
                <Text style={styles.eventNameText}>Egzamin</Text> 
              </View>

              <View style={globalStyles.eventSubjectView}>
                <FontAwesome5 name="book" size={20} color="#fff"/>
                <Text style={globalStyles.subjectText}>Sztuczna inteligencja</Text>
              </View>

              <View>
                <View style={globalStyles.eventDatetimeView}>
                  <Ionicons name="calendar-clear" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={globalStyles.littleText}>12.01.2024</Text>
                </View>
                <View style={{...globalStyles.eventDatetimeView, marginTop: 5}}>
                  <AntDesign name="clockcircle" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={globalStyles.littleText}>16:40</Text>
                </View>
              </View>
            </View>

            {/* EVENT */}
            <View style={globalStyles.eventView}>
              <View style={styles.eventNameView}>
                <Text style={styles.eventNameText}>Zaliczenie</Text> 
              </View>

              <View style={globalStyles.eventSubjectView}>
                <FontAwesome5 name="book" size={20} color="#fff" />
                <Text style={globalStyles.subjectText}>Programowanie komponentowe</Text>
              </View>

              <View>
                <View style={globalStyles.eventDatetimeView}>
                  <Ionicons name="calendar-clear" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={globalStyles.littleText}>15.01.2024</Text>
                </View>
                <View style={{...globalStyles.eventDatetimeView, marginTop: 5}}>
                  <AntDesign name="clockcircle" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={globalStyles.littleText}>15:00</Text>
                </View>
              </View>
            </View>


            {/* HEADLINE */}
            <View style={globalStyles.headlineView}>
              <Text style={{...globalStyles.headlineText, marginBottom: 0, marginTop: 10}}>Dalsze terminy</Text>
            </View>

            {/* EVENT */}
            <View style={globalStyles.eventView}>
              <View style={styles.eventNameView}>
                <Text style={styles.eventNameText}>Egzamin</Text> 
              </View>

              <View style={globalStyles.eventSubjectView}>
                <FontAwesome5 name="book" size={20} color="#fff" />
                <Text style={globalStyles.subjectText}>Wizualizacja 3d</Text>
              </View>

              <View>
                <View style={globalStyles.eventDatetimeView}>
                  <Ionicons name="calendar-clear" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={globalStyles.littleText}>20.01.2024</Text>
                </View>
                <View style={{...globalStyles.eventDatetimeView, marginTop: 5}}>
                  <AntDesign name="clockcircle" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={globalStyles.littleText}>16:40</Text>
                </View>
              </View>
            </View>

            {/* EVENT */}
            <View style={globalStyles.eventView}>
              <View style={styles.eventNameView}>
                <Text style={styles.eventNameText}>Egzamin</Text> 
              </View>

              <View style={globalStyles.eventSubjectView}>
                <FontAwesome5 name="book" size={20} color="#fff" />
                <Text style={globalStyles.subjectText}>Sztuczna inteligencja</Text>
              </View>

              <View>
                <View style={globalStyles.eventDatetimeView}>
                  <Ionicons name="calendar-clear" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={globalStyles.littleText}>12.01.2024</Text>
                </View>
                <View style={{...globalStyles.eventDatetimeView, marginTop: 5}}>
                  <AntDesign name="clockcircle" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={globalStyles.littleText}>16:40</Text>
                </View>
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
  },
  headlineUserView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: MyColors.appGray,
    padding: 10,
    borderRadius: 20
  },
  headlineUserText: {
    fontSize: 25, 
    textTransform: 'uppercase', 
    color: MyColors.appOrange, 
    paddingLeft: 20
  },
  eventNameView: {
    width: '100%',
    padding: 5,
    backgroundColor: MyColors.eventBlue,
    borderRadius: 15,
    alignItems: 'center'
  },
  eventNameText: {
    fontSize: 25,
    textTransform: 'uppercase',
    color: '#fff'
  }
});