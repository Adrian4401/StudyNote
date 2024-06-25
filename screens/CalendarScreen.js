import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

import { loadEvents } from '../databaseQueries/databaseQueries';

import { CustomStatusBar } from '../components/StatusBar';

import { showEvents } from '../utils/functions';

import { useLanguage } from '../context/LanguageContext';
import appLanguage from "../utils/languages";

import { useDarkMode } from '../context/DarkModeContext';
import { createStyles } from '../assets/styles/index';




export default function CalendarScreen() {

  const navigation = useNavigation();

  const [weeklyData, setWeeklyData] = useState([]);
  const [futureData, setFutureData] = useState([]);
  const [olderData, setOlderData] = useState([]);
  
  const { language } = useLanguage();

  const { theme } = useDarkMode()
  const styles = createStyles(theme)

  const getTranslatedText = (key) => {
    return appLanguage[language][key];
  }

  
  useEffect(() => {

    const loadData = navigation.addListener('focus', () => {
      // selectThisWeekEvents(setWeeklyData)
      // selectNextWeekEvents(setFutureData)
      // selectOlderEvents(setOlderData)

      loadEvents(setWeeklyData, setFutureData, setOlderData)
    });
    
    return loadData;
  }, [setWeeklyData, setFutureData, setOlderData])



  var day = (new Date().getDate()).toString().padStart(2, '0');
  var month = (new Date().getMonth() + 1).toString().padStart(2, '0');
  var year = new Date().getFullYear();

  var todayDate = day + '.' + month + '.' + year;



  const showThisWeekEvents = () => {
    return (
      <>
        <View style={{width: '100%'}}>
          <Text style={{...styles.headlineText, marginBottom: 0, marginTop: 10}}>{getTranslatedText('thisWeekEventsText')}</Text>
          <Text style={styles.littleText}>{getTranslatedText('thisWeekEventsLittleText')}</Text>
        </View>

        {showEvents(weeklyData, navigation)}
      </>
    )
  }


  const showFutureEvents = () => {
    return (
      <>
        <View style={styles.headlineView}>
          <Text style={{...styles.headlineText, marginBottom: 0, marginTop: 10}}>{getTranslatedText('futureEventsText')}</Text>
        </View>

        {showEvents(futureData, navigation)}
      </>
    )
  }


  const showOlderEvents = () => {
    return (
      <>
        <View style={styles.headlineView}>
          <Text style={{...styles.headlineText, marginBottom: 0, marginTop: 10}}>{getTranslatedText('olderEventsText')}</Text>
        </View>

        {showEvents(olderData, navigation)}
      </>
    )
  }




  const showAllEvents = () => {
    if(weeklyData.length <= 0 && futureData.length <= 0 && olderData.length <= 0) {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={{color: theme.textSecondary, fontSize: 20, marginTop: '30%', marginBottom: '5%', textTransform: 'uppercase'}}>{getTranslatedText('emptyEventsText')}</Text>
          <FontAwesome name="folder-open" size={50} color={theme.textSecondary} />
        </View>
      )
    }
    else {
      return (
        <>
          {weeklyData.length > 0 && showThisWeekEvents()}
          {futureData.length > 0 && showFutureEvents()}
          {olderData.length > 0 && showOlderEvents()}
        </>
      );
    }
  }



  const calendarStyles = StyleSheet.create({
    headlineUserView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: theme.inputBackground,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20
    },
    headlineUserText: {
      fontSize: 25, 
      textTransform: 'uppercase', 
      color: 'white',
      flex: 2
    },
    eventNameView: {
      width: '100%',
      padding: 5,
      backgroundColor: theme.eventBackground,
      borderRadius: 15,
      alignItems: 'center'
    },
    eventNameText: {
      fontSize: 25,
      textTransform: 'uppercase',
      color: '#fff'
    }
  });



  return (
    <>
      <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: theme.navigation}}/>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: theme.background}}>

        {/* <StatusBar barStyle='light-content' /> */}
        <CustomStatusBar />
        

        {/* HEADER */}
        <View style={styles.headerBackground}>
            <Text style={styles.headerText}>{getTranslatedText('calendarScreenTitle')}</Text>
        </View>

        {/* CONTAINER */}
        <ScrollView>
          <View style={styles.viewContainer}>
            
            {/* USER HEADLINE */}
            <View style={styles.headlineView}>
              <View style={calendarStyles.headlineUserView}>
                {/* <Ionicons name="calendar-clear" size={24} color='white' style={{flex: 1}}/> */}
                <FontAwesome5 name="calendar-day" size={22} color="white" />
                <Text style={{...calendarStyles.headlineUserText, fontSize: 20, textAlign: 'center'}}>{todayDate}</Text>
              </View>
            </View>


            {showAllEvents()}

            {/* {showThisWeekEvents()}

            {showFutureEvents()}

            {showOlderEvents()} */}


          </View>
        </ScrollView>

        <View style={{width: '100%',height: 40}} />

      </SafeAreaView>
    </>
  );
}