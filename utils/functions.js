import { TouchableOpacity, View, Text, StyleSheet } from "react-native"

import { FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';

import { globalStyles } from "../styles/globalStyles";

import { MyColors } from "../colors";

import appLanguage from "./languages";
import valueLanguages from "../screens/SettingsScreen";




export const getTranslatedText = (key) => {
  return appLanguage[valueLanguages][key];
}


export const showEvents = (dataType, navigation) => {
    return dataType.map((element) => {
      return (
        <TouchableOpacity key={element.event_id} onPress={() => navigation.navigate('ReadEventScreen', { eventID: element.event_id })} style={globalStyles.eventView}>
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



  const styles = StyleSheet.create({
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