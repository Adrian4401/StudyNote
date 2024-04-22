import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DropDownPicker from 'react-native-dropdown-picker';

import { MyColors } from '../../colors';

import { FontAwesome5 } from '@expo/vector-icons';

import { headerStyles } from '../../styles/headerStyles';
import { globalStyles } from '../../styles/globalStyles';

import { GoBackButton, MakeButton } from '../../components/customButtons';

import { loadClasses, loadSubjects, selectChosenNotes, addEvent } from '../../databaseQueries/databaseQueries.js';

import DateTimePicker from '@react-native-community/datetimepicker';

import Checkbox from 'expo-checkbox';





export default function AddEventScreen() {

    const navigation = useNavigation();

    const [openSubjects, setOpenSubjects] = useState(false);
    const [openClasses, setOpenClasses] = useState(false);

    const [currentTitle, setCurrentTitle] = useState('');
    const [currentDescription, setCurrentDescription] = useState('');
    const [currentClass, setCurrentClass] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [valueSubjects, setValueSubjects] = useState(null);
    
    const [data, setData] = useState([]);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('');
    const [show, setShow] = useState(false);

    const [dateText, setDateText] = useState('Dzień');
    const [timeText, setTimeText] = useState('Godzina');

    const [checkedNotes, setCheckedNotes] = useState([]);

    const [checkedNoteIDs, setCheckedNoteIDs] = useState([]);



    useEffect(() => {
        const loadData = navigation.addListener('focus', () => {
            loadSubjects(setSubjects),
            loadClasses(setClasses)
        })

        selectChosenNotes(valueSubjects, setData);

        setCheckedNotes(new Array(data.length).fill(false))
        
        return loadData;
    }, [navigation, valueSubjects, setData, data.length])



    const subjectItems = subjects.map(subject => {
        return { label: subject.subject_name, value: subject.subject_id.toString() };
    });

    const classesItems = classes.map(myclass => {
        return { label: myclass.class_name, value: myclass.class_id.toString() };
    })



    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }


    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
    
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);

        let tempDate = new Date(currentDate);

        setDate(tempDate);

        console.log(tempDate.toLocaleString());
    }



    const handleNoteCheckboxChange = (index) => {
        const newCheckedNotes = [...checkedNotes];
        newCheckedNotes[index] = !newCheckedNotes[index];
        setCheckedNotes(newCheckedNotes);

        const newCheckedNoteIDs = [...checkedNoteIDs];
        if (newCheckedNotes[index]) {
            newCheckedNoteIDs.push(data[index].note_id);
        } else {
            const noteIDIndex = newCheckedNoteIDs.indexOf(data[index].note_id);
            if (noteIDIndex !== -1) {
                newCheckedNoteIDs.splice(noteIDIndex, 1);
            }
        }
        setCheckedNoteIDs(newCheckedNoteIDs);
    }
    

    const selectedDate = formatDate(date);



    const renderItem = ({item}) => {
        if(item.type === 'goBackButton') {
            return(
                <View style={{width: '100%', marginTop: 20}}>
                    <GoBackButton />
                </View>
            )
        } else if(item.type === 'titleTextInput') {
            return(
                <TextInput 
                    value={currentTitle}
                    onChangeText={setCurrentTitle}
                    placeholder='Dodaj tytuł wydarzenia...'
                    placeholderTextColor={MyColors.appLightGray}
                    maxLength={100}
                    multiline
                    style={{
                        color: 'white',
                        fontSize: 25,
                        borderWidth: 2,
                        borderColor: MyColors.appOrange,
                        borderRadius: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginTop: 30,
                        backgroundColor: MyColors.appDark
                    }}
                />
            )
        } else if(item.type === 'subjectsPicker') {
            return(
                <DropDownPicker
                    placeholder='Wybierz przedmiot'
                    open={openSubjects}
                    value={valueSubjects}
                    items={subjectItems}
                    setOpen={setOpenSubjects}
                    setValue={setValueSubjects}
                    setItems={setSubjects}
                    ScrollView={false}
                    style={{...styles.style, marginBottom: 10, marginTop: 10}}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    textStyle={styles.textStyle}
                    arrowIconContainerStyle={styles.arrowIconContainerStyle}
                />
            )
        } else if(item.type === 'classesPicker') {
            return(
                <DropDownPicker
                    placeholder='Wybierz zajęcia'
                    open={openClasses}
                    value={currentClass}
                    items={classesItems}
                    setOpen={setOpenClasses}
                    setValue={setCurrentClass}
                    setItems={setClasses}
                    ScrollView={false}
                    style={{...styles.style, marginTop: 10}}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    textStyle={styles.textStyle}
                    arrowIconContainerStyle={styles.arrowIconContainerStyle}
                />
            )
        } else if(item.type === 'descriptionTextInput') {
            return(
                <TextInput 
                    value={currentDescription}
                    onChangeText={setCurrentDescription}
                    placeholder='Dodaj krótki opis...'
                    placeholderTextColor={MyColors.appLightGray}
                    multiline={true}
                    style={{
                        color: 'white',
                        flex: 1,
                        fontSize: 18,
                        borderWidth: 2,
                        borderColor: MyColors.appOrange,
                        borderRadius: 10,
                        padding: 10,
                        marginVertical: 20,
                        height: 100,
                        backgroundColor: MyColors.appGray,
                        flexWrap: 'wrap'
                    }}
                />
            )
        } else if(item.type === 'dateTimePickers') {
            if(Platform.OS === 'android') {
                return(
                    <View style={{marginBottom: 20, alignItems: 'center'}}>

                        <Text style={{...globalStyles.littleText, marginBottom: 5}}>Wybierz termin</Text>

                        <TouchableOpacity onPress={() => showMode('date')} style={styles.dateTimeButtons}>
                            <Text style={{fontSize: 20, color: 'white'}}>{dateText}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => showMode('time')} style={styles.dateTimeButtons}>
                            <Text style={{fontSize: 20, color: 'white'}}>{timeText}</Text>
                        </TouchableOpacity>

                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
                            <Text style={{fontSize: 20, color: 'white'}}>Wybrany termin:</Text>
                            <Text style={{fontSize: 20, color: 'white'}}>{selectedDate}</Text>
                        </View>

                        
    
    
                        {show && (
                            <DateTimePicker
                                mode={mode}
                                value={date}
                                is24Hour={true}
                                onChange={onChange}
                                minuteInterval={5}
                                locale='pl-PL'
                                themeVariant='dark'
                            />
                        )}
                    </View>
                )
            } else if(Platform.OS === 'ios') {
                return (
                    <View style={{
                        alignItems: 'center'
                    }}>

                        <Text 
                            style={{
                                fontSize: 20,
                                color: MyColors.appLightGray,
                                textTransform: 'uppercase',
                                marginVertical: 10
                            }}>
                            Wybierz termin
                        </Text>

                        <DateTimePicker
                            mode='datetime'
                            value={date}
                            is24Hour={true}
                            onChange={onChange}
                            minuteInterval={5}
                            locale='pl-PL'
                            themeVariant='dark'
                            display='inline'
                            timeZoneName={'Europe/Warsaw'}
                            style={{marginBottom: 40}}
                        />

                    </View>
                )
            }
            
            
        } else if(item.type === 'notes') {
            return data.map((element, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate('ReadNoteScreen', { noteID: element.note_id })} style={styles.noteStyle}>
        
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Checkbox
                            value={checkedNotes[index]}
                            onValueChange={() => handleNoteCheckboxChange(index)}
                            color={checkedNotes[index] ? MyColors.appOrange : undefined }
                        />
                    </View>

                    <View style={{flex: 8}}>
                        <View>
                        <Text style={globalStyles.headlineText}>{element.title}</Text>
                        </View>
            
                        <View style={{flex: 1, backgroundColor: MyColors.appLightGray, height: 1, marginBottom: 10}} />
            
                        <View style={styles.infoView}>
                        <FontAwesome5 name="book" size={18} color="#fff" style={{flex: 1}}/>
                        <Text style={styles.infoText}>{element.subject_name}</Text>
                        </View>
            
                        <View style={styles.infoView}>
                        <FontAwesome5 name="info-circle" size={18} color="#fff" style={{flex: 1}} />
                        <Text style={styles.infoText}>{element.class_name}</Text>
                        </View>
            
                        <View style={styles.noteDataView}>
                            <Text style={styles.noteDataText}>{element.create_day}</Text>
                        </View>
                    </View>

                  </TouchableOpacity>
                )
              })
        } else if(item.type === 'addButton') {
            return(
                <MakeButton onPress={() => addEvent(navigation, currentTitle, currentDescription, date, valueSubjects, currentClass, checkedNoteIDs)}/>
                // <MakeButton onPress={() => console.log('Zaznaczone notatki: ', checkedNoteIDs)} />
            )
        }
    }





    return (
        <>
            <SafeAreaView edges={['top']} style={{flex: 0, backgroundColor: '#000'}}/>
            <View edges={['left', 'right', 'bottom']} style={{flex: 1, backgroundColor: MyColors.appBackground}}>

                {/* HEADER */}
                <View style={headerStyles.headerBackground}>
                    <Text style={headerStyles.headerText}>Dodaj wydarzenie</Text>
                </View>

                <View style={styles.container}>
                    <FlatList 
                        data={[
                            { type: 'addButton' },
                            { type: 'notes' },
                            { type: 'dateTimePickers' },
                            { type: 'descriptionTextInput' },
                            { type: 'subjectsPicker' },
                            { type: 'classesPicker' },
                            { type: 'titleTextInput' },
                            { type: 'goBackButton' }
                        ]}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{flexDirection: 'column-reverse', paddingBottom: 50}}
                    />
                </View>

            </View>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MyColors.appBackground,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    style: {
        backgroundColor: MyColors.appDark,
        borderWidth: 1,
        borderColor: MyColors.appOrange
    },
    dropDownContainerStyle: {
        backgroundColor: MyColors.appDark,
        borderWidth: 1,
        borderColor: MyColors.appOrange
    },
    textStyle: {
        color: MyColors.appLightGray
    },
    dateTimeButtons: {
        height: 50,
        backgroundColor: MyColors.appOrange,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        borderRadius: 20,
        width: '100%'
    },
    arrowIconContainerStyle: {
        backgroundColor: MyColors.appOrange,
        borderRadius: 5
    },
    noteStyle: {
        width: '100%',
        backgroundColor: MyColors.appDark,
        borderRadius: 20,
        padding: 12,
        marginBottom: 20, 
        borderColor: MyColors.appLightGray, 
        borderWidth: 1,
        flexDirection: 'row'
    },
    infoView: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 5
    },
    infoText: {
        fontSize: 16,
        color: '#fff',
        flex: 10
    },
    noteDataView: {
        alignItems: 'flex-end',
        marginTop: 2,
        paddingHorizontal: 5
    },
    noteDataText: {
        fontSize: 12,
        color: MyColors.appLightGray,
        textTransform: 'uppercase',
        flex: 15
    },
});