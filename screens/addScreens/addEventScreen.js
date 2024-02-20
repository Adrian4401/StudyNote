import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Button } from 'react-native';
import { MyColors } from '../../colors';
import { headerStyles } from '../../styles/headerStyles';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

export default function AddEventScreen() {
    const navigation = useNavigation();

    return (
        <>
            <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
            <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

                <StatusBar barStyle='light-content' />

                {/* HEADER */}
                <View style={headerStyles.headerBackground}>
                    <Text style={headerStyles.headerText}>Dodaj wydarzenie</Text>
                </View>

                {/* CONTAINER */}
                <ScrollView>
                    <View style={styles.container}>

                        <Text style={{fontSize: 30, color: '#fff'}}>Miłosz</Text>

                    </View>
                </ScrollView>

                <View style={{backgroundColor: 'red'}}>
                    <Button title="Wróć"onPress={() => navigation.goBack()} />
                </View>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MyColors.appBackground,
        alignItems: 'center',
        padding: 20,
        paddingBottom: 120
    }
})