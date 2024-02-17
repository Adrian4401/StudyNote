import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CalendarScreen, NoteScreen, SubjectScreen, MoreScreen } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MyColors } from './colors';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <View
      style={{
        width: 70,
        height: 70,
        top: 15,
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
    height: 70,
    elevation: 0,
    backgroundColor: '#000',
    borderRadius: 20,
    borderTopColor: 'transparent'
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions} initialRouteName='Calendar'>
        <Tab.Screen 
          name='Calendar' 
          component={CalendarScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return(
                <View style={{alignItems: 'center', justifyContent: 'center', top: 15}}>
                  <Ionicons name="calendar-clear" size={24} color={focused ? '#BCB3B3' : '#736D6D'} />
                </View>
              )
            }
          }}
        />
        <Tab.Screen 
          name='Note' 
          component={NoteScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return(
                <View style={{alignItems: 'center', justifyContent: 'center', top: 15}}>
                  <FontAwesome name="sticky-note" size={24} color={focused ? '#BCB3B3' : '#736D6D'} />
                </View>
              )
            }
          }}
        />
        <Tab.Screen 
          name='Add' 
          component={NoteScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return(
                <Ionicons name="add-outline" size={45} color="#fff" />
              )
            },
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} />
            )
          }}
        />
        <Tab.Screen 
          name='Subject' 
          component={SubjectScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return(
                <View style={{alignItems: 'center', justifyContent: 'center', top: 15}}>
                  <FontAwesome5 name="book" size={24} color={focused ? '#BCB3B3' : '#736D6D'} />
                </View>
              )
            }
          }}
        />
        <Tab.Screen 
          name='More' 
          component={MoreScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return(
                <View style={{alignItems: 'center', justifyContent: 'center', top: 15}}>
                  <Ionicons name="options" size={24} color={focused ? '#BCB3B3' : '#736D6D'} />
                </View>
              )
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});