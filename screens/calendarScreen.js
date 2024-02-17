import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { MyColors } from '../colors';
import { headerStyles } from '../styles/headerStyles';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


export default function CalendarScreen() {
  return (
    <>
      <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

        {/* HEADER */}
        <View style={headerStyles.headerBackground}>
            <Text style={headerStyles.headerText}>Kalendarz</Text>
        </View>

        {/* CONTAINER */}
        <ScrollView>
          <View style={styles.container}>
            
            {/* USER HEADLINE */}
            <View style={styles.headlineView}>
              <View style={styles.headlineUserView}>
                <FontAwesome name="user-circle-o" size={24} color={MyColors.appOrange} />
                <Text style={styles.headlineUserText}>Adrian</Text>
              </View>
              <Text style={styles.headlineText}>Twoje nadchodzące wydarzenia</Text>
              <Text style={styles.littleText}>najbliższe 7 dni</Text>
            </View>

            {/* EVENT */}
            <View style={styles.eventView}>
              <View style={styles.eventNameView}>
                <Text style={styles.eventNameText}>Egzamin</Text> 
              </View>

              <View style={styles.eventSubjectView}>
                <FontAwesome5 name="book" size={20} color="#fff" style={{marginRight: 10}}/>
                <Text style={styles.headlineText}>Sztuczna inteligencja</Text>
              </View>

              <View>
                <View style={styles.eventDatetimeView}>
                  <Ionicons name="calendar-clear" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={styles.littleText}>12.01.2024</Text>
                </View>
                <View style={{...styles.eventDatetimeView, marginTop: 5}}>
                  <AntDesign name="clockcircle" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={styles.littleText}>16:40</Text>
                </View>
              </View>
            </View>

            {/* EVENT */}
            <View style={styles.eventView}>
              <View style={styles.eventNameView}>
                <Text style={styles.eventNameText}>Zaliczenie</Text> 
              </View>

              <View style={styles.eventSubjectView}>
                <FontAwesome5 name="book" size={20} color="#fff" style={{marginRight: 10}}/>
                <Text style={styles.headlineText}>Programowanie komponentowe</Text>
              </View>

              <View>
                <View style={styles.eventDatetimeView}>
                  <Ionicons name="calendar-clear" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={styles.littleText}>15.01.2024</Text>
                </View>
                <View style={{...styles.eventDatetimeView, marginTop: 5}}>
                  <AntDesign name="clockcircle" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={styles.littleText}>15:00</Text>
                </View>
              </View>
            </View>


            {/* HEADLINE */}
            <View style={styles.headlineView}>
              <Text style={styles.headlineText}>Dalsze terminy</Text>
            </View>

            {/* EVENT */}
            <View style={styles.eventView}>
              <View style={styles.eventNameView}>
                <Text style={styles.eventNameText}>Egzamin</Text> 
              </View>

              <View style={styles.eventSubjectView}>
                <FontAwesome5 name="book" size={20} color="#fff" style={{marginRight: 10}}/>
                <Text style={styles.headlineText}>Wizualizacja 3d</Text>
              </View>

              <View>
                <View style={styles.eventDatetimeView}>
                  <Ionicons name="calendar-clear" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={styles.littleText}>20.01.2024</Text>
                </View>
                <View style={{...styles.eventDatetimeView, marginTop: 5}}>
                  <AntDesign name="clockcircle" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={styles.littleText}>16:40</Text>
                </View>
              </View>
            </View>

            {/* EVENT */}
            <View style={styles.eventView}>
              <View style={styles.eventNameView}>
                <Text style={styles.eventNameText}>Egzamin</Text> 
              </View>

              <View style={styles.eventSubjectView}>
                <FontAwesome5 name="book" size={20} color="#fff" style={{marginRight: 10}}/>
                <Text style={styles.headlineText}>Sztuczna inteligencja</Text>
              </View>

              <View>
                <View style={styles.eventDatetimeView}>
                  <Ionicons name="calendar-clear" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={styles.littleText}>12.01.2024</Text>
                </View>
                <View style={{...styles.eventDatetimeView, marginTop: 5}}>
                  <AntDesign name="clockcircle" size={18} color='#D1D0D0' style={{marginRight: 10}} />
                  <Text style={styles.littleText}>16:40</Text>
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
    padding: 10,
  },
  headlineView: {
    width: '100%',
    marginTop: 10
  },
  headlineUserView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  headlineUserText: {
    fontSize: 25, 
    textTransform: 'uppercase', 
    color: MyColors.appOrange, 
    paddingLeft: 20
  },
  headlineText: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#fff'
  },
  littleText: {
    fontSize: 15,
    color: '#D1D0D0',
    textTransform: 'uppercase'
  },
  eventView: {
    width: '100%',
    backgroundColor: '#252331',
    borderRadius: 20,
    padding: 10,
    marginVertical: 10
  },
  eventNameView: {
    width: '100%',
    padding: 10,
    backgroundColor: '#2F3051',
    borderRadius: 20,
    alignItems: 'center'
  },
  eventNameText: {
    fontSize: 25,
    textTransform: 'uppercase',
    color: '#fff'
  },
  eventSubjectView: {
    flexDirection: 'row',
    marginVertical: 15,
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  eventDatetimeView: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center'
  }
});