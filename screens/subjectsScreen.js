import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { MyColors } from '../colors';
import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';


export default function SubjectScreen() {

  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

        <StatusBar barStyle='light-content' />

        {/* HEADER */}
        <View style={headerStyles.headerBackground}>
          <Text style={headerStyles.headerText}>Przedmioty</Text>
        </View>


        {/* CONTAINER */}
        <ScrollView>
          <View style={styles.container}>
            
            {/* HEADLINE */}
            <View style={{...globalStyles.headlineViewWithIcon, marginBottom: 10}}>
              <Text style={globalStyles.headlineText}>Twoje przedmioty</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AddSubjectScreen')}>
                <Feather name="plus" size={26} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={globalStyles.eventView}>
              <Text style={globalStyles.subjectText}>Wizualizacja 3D</Text>
            </View>
            <View style={globalStyles.eventView}>
              <Text style={globalStyles.subjectText}>Sztuczna Inteligencja</Text>
            </View>
            <View style={globalStyles.eventView}>
              <Text style={globalStyles.subjectText}>Język angielski</Text>
            </View>
            <View style={globalStyles.eventView}>
              <Text style={globalStyles.subjectText}>Programowanie komponentowe</Text>
            </View>
            <View style={globalStyles.eventView}>
              <Text style={globalStyles.subjectText}>Dynamiczne witryny internetowe</Text>
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