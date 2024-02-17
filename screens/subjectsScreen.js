import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { MyColors } from '../colors';
import { headerStyles } from '../styles/headerStyles';


export default function SubjectScreen() {
  return (
    <>
      <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

        <View style={styles.container}>
          {/* HEADER */}
          <View style={headerStyles.headerBackground}>
            <Text style={headerStyles.headerText}>Przedmioty</Text>
          </View>

          <Text>Przedmioty</Text>
          <StatusBar style="auto" />
        </View>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.appBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});