import { DBConnect } from "./DBConnect";
import { loadSubjects, loadClasses } from "./Select";



const db = DBConnect();



export const editSubject = (oldSubjectName, newSubjectName) => {

    db.transaction(tx => {
        tx.executeSql(
            'UPDATE subjects SET subject_name = ? WHERE subject_name = ?',
            [newSubjectName, oldSubjectName],
            (txObj, resultSet) => {
                loadSubjects(setSubjects);
                console.log('DATA -- Subject updated successfully');
                navigation.goBack(); // Wróć do poprzedniego ekranu
            },
            (txObj, error) => {
                console.log('ERROR -- Subject updating failed -> ', error);
            }
        );
    });   
}

export const editClass = (classID, newClassName, navigation, setClasses) => {

    db.transaction(tx => {
        tx.executeSql(
            'UPDATE classes SET class_name = ? WHERE class_id = ?',
            [newClassName, classID],
            (txObj, resultSet) => {
                loadClasses(setClasses);
                console.log('DATA -- Class updated successfully');
                navigation.goBack(); // Wróć do poprzedniego ekranu
            },
            (txObj, error) => {
                console.log('ERROR -- Class updating failed -> ', error);
            }
        );
    });   
}

export const editNote = (currentTitle, currentNote, currentSubject, currentClass, noteID, navigation) => {

    db.transaction(tx => {
        tx.executeSql(
            'UPDATE notes SET title = ?, note = ?, subject_id = ?, class_id = ? WHERE note_id = ?',
            [currentTitle, currentNote, currentSubject, currentClass, noteID],
            (txObj, resultSet) => {
                console.log('DATA -- Note updated successfully');
                navigation.goBack();
            },
            (txObj, error) => console.log('ERROR -- Note updating failed -> ', error)
        )
    })
}