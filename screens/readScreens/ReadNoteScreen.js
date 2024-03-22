import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Button, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { MyColors } from '../../colors';

import { headerStyles } from '../../styles/headerStyles';

import { GoBackButton } from '../../components/customButtons';

import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import { deleteNote } from '../../databaseQueries/Delete';
import { selectNoteToRead } from '../../databaseQueries/Select';


export default function ReadNoteScreen() {

    const navigation = useNavigation();

    const route = useRoute();

    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [myclass, setMyclass] = useState('');
    const [createDay, setCreateDay] = useState('');
    const [note, setNote] = useState('');
    const [noteID, setNoteID] = useState(null);
    const [isDeleted, setIsDeleted] = useState(null);

    useEffect(() => {
        const { noteID } = route.params;
        setNoteID(noteID)

        const loadData = navigation.addListener('focus', () => {
            selectNoteToRead(noteID, setTitle, setNote, setSubject, setMyclass, setCreateDay)
        })

        return loadData;
    }, [navigation])



    const alertDeleteNote = (noteID) => {
        Alert.alert('Usuwanie notatki', 'Czy na pewno chcesz usunąć notatkę?', [
            {
                text: 'Anuluj',
                onPress: () => console.log('Anuluj'),
                style: 'cancel'
            },
            {
                text: 'Usuń',
                onPress: () => deleteNote(noteID, navigation)
            }
        ])
    }

    return (
        <>
            <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
            <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

                <StatusBar barStyle='light-content' />

                {/* HEADER */}
                <View style={headerStyles.headerBackground}>
                    <Text style={headerStyles.headerText}>Notatka</Text>
                </View>

                {/* CONTAINER */}
                <ScrollView>
                    <View style={styles.container}>

                        <View style={styles.topPanel}>
                            <GoBackButton />
                            <View style={styles.topPanelIcons}>
                                <TouchableOpacity onPress={() => alertDeleteNote(noteID)}>
                                    <MaterialIcons name="delete" size={30} color='white'/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('EditNoteScreen', { noteID: noteID })}>
                                    <MaterialIcons name="edit" size={30} color="white"/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* <View style={styles.line} /> */}
                        
                        <View style={{
                            width: '100%',
                            alignItems: 'flex-start'
                        }}>

                            

                            <View style={{
                                marginVertical: 25
                            }}>
                                <View style={styles.noteDataView}>
                                    <Text style={styles.noteDataText}>{createDay}</Text>
                                </View>
                                <View style={styles.infoView}>
                                    <FontAwesome5 name="book" size={18} color="#fff" style={{flex: 1}}/>
                                    <Text style={styles.infoText}>{subject}</Text>
                                </View>
                                <View style={styles.infoView}>
                                    <FontAwesome5 name="info-circle" size={18} color="#fff" style={{flex: 1}} />
                                    <Text style={styles.infoText}>{myclass}</Text>
                                </View>
                            </View>
                            
                            <View style={{marginVertical: 5}}>
                                <Text style={{fontSize: 30, color: '#fff'}}>{title}</Text>
                            </View>
                            

                        </View>

                        <View style={styles.line} />

                        <View style={{width: '100%'}}>
                            <Text style={{color: 'white', fontSize: 17}}>{note}</Text>
                        </View>
                        

                    </View>
                </ScrollView>

                


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
    },
    topPanel: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: MyColors.eventBlue,
        marginBottom: 20,
        borderRadius: 20,
        paddingHorizontal: 10
    },
    topPanelIcons: {
        flex: 0.35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: MyColors.appOrange,
        marginVertical: 20
    },
    infoView: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 5
    },
    infoText: {
        fontSize: 18,
        color: '#fff',
        flex: 10
    },
    noteDataView: {
        marginTop: 5,
        paddingHorizontal: 5
    },
    noteDataText: {
        fontSize: 12,
        color: MyColors.appLightGray,
        textTransform: 'uppercase'
    },
})
