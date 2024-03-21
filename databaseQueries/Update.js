import { DBConnect } from "./DBConnect";
import { loadSubjects, loadClasses } from "./Select";


export const editSubject = (oldSubjectName, newSubjectName) => {

    const db = DBConnect();

    db.transaction(tx => {
        tx.executeSql(
            'UPDATE subjects SET subject_name = ? WHERE subject_name = ?',
            [newSubjectName, oldSubjectName],
            (txObj, resultSet) => {
                loadSubjects(setSubjects);
                console.log('Przedmiot został zaktualizowany');
                navigation.goBack(); // Wróć do poprzedniego ekranu
            },
            (txObj, error) => {
                console.log('Nie udało się zaktualizować przedmiotu:', error);
            }
        );
    });   
};

export const editClass = (classID, newClassName, navigation, setClasses) => {

    const db = DBConnect();

    db.transaction(tx => {
        tx.executeSql(
            'UPDATE classes SET class_name = ? WHERE class_id = ?',
            [newClassName, classID],
            (txObj, resultSet) => {
                loadClasses(setClasses);
                console.log('Zajecie zostalo zaktualizowane');
                navigation.goBack(); // Wróć do poprzedniego ekranu
            },
            (txObj, error) => {
                console.log('Nie udalo se zaktualizowac zajecia:', error);
            }
        );
    });   
};