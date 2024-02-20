import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { MyColors } from '../../colors';
import { headerStyles } from '../../styles/headerStyles';
import { globalStyles } from '../../styles/globalStyles';

export default function AddSubjectScreen() {
    return (
        <>
            <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
            <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

                <StatusBar barStyle='light-content' />

                {/* HEADER */}
                <View style={headerStyles.headerBackground}>
                    <Text style={headerStyles.headerText}>Dodaj przedmiot</Text>
                </View>

                {/* CONTAINER */}
                <ScrollView>
                    <View style={styles.container}>

                        <Text style={{fontSize: 30, color: '#fff'}}>parówa</Text>

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