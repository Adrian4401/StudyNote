import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Button } from 'react-native';

import { MyColors } from '../../colors';

import { headerStyles } from '../../styles/headerStyles';
import { globalStyles } from '../../styles/globalStyles';

import { GoBackButton, MakeButton } from '../../components/customButtons';


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

                        <Text style={{fontSize: 30, color: '#fff'}}>Dodawanie przedmiotu</Text>

                    </View>
                </ScrollView>

                <View style={globalStyles.bottomButtonsView}>
                    <GoBackButton />
                    <MakeButton />
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
