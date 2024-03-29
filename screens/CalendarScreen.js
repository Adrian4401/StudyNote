import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome, FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';

import { MyColors } from '../colors';
import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';

import { Create, selectAllEvents } from '../databaseQueries/databaseQueries';




export default function CalendarScreen() {

  const navigation = useNavigation();

  const [data, setData] = useState([]);



  useEffect(() => {

    const loadData = navigation.addListener('focus', () => {
      selectAllEvents(setData)
    });
    
    return loadData;
  }, [setData])



  const showEvents = () => {
    return data.map((element, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => navigation.navigate('ReadEventScreen', { eventID: element.event_id })} style={globalStyles.eventView}>
          <View style={styles.eventNameView}>
            <Text style={styles.eventNameText}>{element.title}</Text> 
          </View>

          <View style={globalStyles.eventSubjectView}>
            <FontAwesome5 name="book" size={20} color="#fff"/>
            <Text style={globalStyles.subjectText}>{element.subject_name}</Text>
          </View>

          <View>
            <View style={globalStyles.eventDatetimeView}>
              <Ionicons name="calendar-clear" size={18} color='#D1D0D0' style={{marginRight: 10}} />
              <Text style={globalStyles.littleText}>{element.deadlineDate}</Text>
            </View>
            <View style={{...globalStyles.eventDatetimeView, marginTop: 5}}>
              <AntDesign name="clockcircle" size={18} color='#D1D0D0' style={{marginRight: 10}} />
              <Text style={globalStyles.littleText}>{element.deadlineTime}</Text>
            </View>
          </View>
        </TouchableOpacity>
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
              <Text style={{...globalStyles.headlineText, marginBottom: 0, marginTop: 10}}>Twoje bliższe terminy</Text>
              <Text style={globalStyles.littleText}>najbliższe 7 dni</Text>
            </View>

            {/* EVENT */}
            {showEvents()}

          


            {/* HEADLINE */}
            <View style={globalStyles.headlineView}>
              <Text style={{...globalStyles.headlineText, marginBottom: 0, marginTop: 10}}>Dalsze terminy</Text>
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
