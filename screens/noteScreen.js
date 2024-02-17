import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MyColors } from '../colors';
import { headerStyles } from '../styles/headerStyles';


export default function NoteScreen() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={headerStyles.headerBackground}>
        <Text style={headerStyles.headerText}>Notatnik</Text>
      </View>

      <Text>Notatnik</Text>
      <StatusBar style="auto" />
    </View>
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