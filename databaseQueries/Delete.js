import { DBConnect } from "./DBConnect";
import { loadSubjects, loadClasses } from "./Select";

export const deleteSubject = (oldSubjectName) => {

    const db = DBConnect();

    db.transaction(tx => {
        tx.executeSql(
            'UPDATE subjects SET is_deleted = 1 WHERE subject_name = ?',
            [oldSubjectName],
            (txObj, resultSet) => {
                loadSubjects(setSubjects);
                console.log('Przedmiot został usuniety');
                navigation.goBack(); // Wróć do poprzedniego ekranu
            },
            (txObj, error) => {
                console.log('Nie udało się usunac przedmiotu:', error);
            }
        );
    }); 
}

export const deleteClass = (oldClassName) => {

    const db = DBConnect();

    db.transaction(tx => {
        tx.executeSql(
            'UPDATE classes SET is_deleted = 1 WHERE class_name = ?',
            [oldClassName],
            (txObj, resultSet) => {
                loadClasses(setClasses);
                console.log('Zajecie zostalo usuniete');
                navigation.goBack(); // Wróć do poprzedniego ekranu
            },
            (txObj, error) => {
                console.log('Nie udalo się usunac zajecia:', error);
            }
        );
    }); 
}