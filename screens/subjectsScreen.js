import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { MyColors } from '../colors';
import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';


export default function SubjectScreen() {
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
            <View style={globalStyles.headlineView}>
              <Text style={globalStyles.headlineText}>Twoje przedmioty</Text>
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