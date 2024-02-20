import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { MyColors } from '../colors';
import { headerStyles } from '../styles/headerStyles';
import { globalStyles } from '../styles/globalStyles';

export default function addEventScreen() {
    return (
        <>
            <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
            <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

                <StatusBar barStyle='light-content' />

                {/* HEADER */}
                <View style={headerStyles.headerBackground}>
                    <Text style={headerStyles.headerText}>Kalendarz</Text>
                </View>

                {/* CONTAINER */}
                <ScrollView>
                    <View style={styles.container}>



                    </View>
                </ScrollView>

            </SafeAreaView>
        </>
    )
}