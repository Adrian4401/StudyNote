import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useIsFocused, useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MyColors } from './colors';

import { CalendarScreen, NoteScreen, SubjectScreen, MoreScreen, AddEventScreen, AddNoteScreen, AddSubjectScreen } from './screens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      justifyContent: 'center',
      alignItems: 'center'
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 60,
        height: 60,
        top: Platform.OS === 'ios' ? 15 : 0,
        borderRadius: 30,
        backgroundColor: MyColors.appOrange
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 25,
    right: 10,
    left: 10,
    height: 60,
    backgroundColor: '#000',
    borderRadius: 20,
    borderTopColor: 'transparent'
  }
}

function MainTabNavigator() {
  
  const navigation = useNavigation();

  const handleTabChange = (screenName) => {
    navigation.navigate(screenName, {screen : screenName});
    console.log(screenName);
    ChangeScreen(screenName);
  };

  function ChangeScreen(screenName) {
    if(screenName=='Calendar') {
      navigation.navigate('AddEventScreen')
    } else if(screenName=='Note') {
      navigation.navigate('AddNoteScreen')
    } else if(screenName=='Subject') {
      navigation.navigate('AddSubjectScreen')
    }
  }

  // function ChangeScreen(screenName) {
  //   if(screenName==='Calendar') {
  //     return AddEventScreen;
  //   } else if(screenName==='Note') {
  //     return AddNoteScreen;
  //   } else if(screenName==='Subject') {
  //     return AddSubjectScreen;
  //   }
  // }

  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName='Calendar'>
      <Tab.Screen 
        name='Calendar' 
        component={CalendarScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return(
              <View style={{alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? 15 : 0}}>
                <Ionicons name="calendar-clear" size={24} color={focused ? '#fff' : '#736D6D'} />
              </View>
            )
          }
        }}
        listeners={{
          tabPress: () => handleTabChange('Calendar')
        }}
      />
      <Tab.Screen 
        name='Note' 
        component={NoteScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return(
              <View style={{alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? 15 : 0}}>
                <FontAwesome name="sticky-note" size={24} color={focused ? '#fff' : '#736D6D'} />
              </View>
            )
          }
        }}
        listeners={{
          tabPress: () => handleTabChange('Note')
        }}
      />
      <Tab.Screen 
        name='Add' 
        component={AddEventScreen}
        options={{
          tabBarIcon: () => {
            return(
              <Ionicons name="add-outline" size={45} color="#fff" />
            )
          },
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} navigation={navigation} onPress={() => ChangeScreen()}/>
          )
        }}
      />
      <Tab.Screen 
        name='Subject' 
        component={SubjectScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return(
              <View style={{alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? 15 : 0}}>
                <FontAwesome5 name="book" size={24} color={focused ? '#fff' : '#736D6D'} />
              </View>
            )
          }
        }}
        listeners={{
          tabPress: () => handleTabChange('Subject')
        }}
      />
      <Tab.Screen 
        name='More' 
        component={MoreScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return(
              <View style={{alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? 15 : 0}}>
                <Ionicons name="options" size={24} color={focused ? '#fff' : '#736D6D'} />
              </View>
            )
          }
        }}
        listeners={{
          tabPress: () => handleTabChange('More')
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Main'
          component={MainTabNavigator}
          options={{headerShown : false}}
        />
        <Stack.Screen
          name='AddEventScreen'
          component={AddEventScreen}
          options={{headerShown : false}}
        />
        <Stack.Screen
          name='AddNoteScreen'
          component={AddNoteScreen}
          options={{headerShown : false}}
        />
        <Stack.Screen
          name='AddSubjectScreen'
          component={AddSubjectScreen}
          options={{headerShown : false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}