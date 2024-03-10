import { DBConnect } from "./DBConnect"

export const deleteTableSubjects = () => {

    const db = DBConnect();

    db.transaction(tx => {
      tx.executeSql(
          'DROP TABLE IF EXISTS subjects',
          null,
          (txObj, resultSet) => {
            console.log('udalo sie usunac tabele SUBJECTS')
          },
          (txObj, resultSet) => console.log('nie udalo sie usunac tabeli SUBJECTS')
      )
    })
}

export const deleteSubjects = () => {

    const db = DBConnect();

    db.transaction(tx => {
      tx.executeSql(
          'DELETE FROM subjects',
          null,
          (txObj, resultSet) => {
            console.log('udalo sie usunac dane z SUBJECTS')
          },
          (txObj, resultSet) => console.log('nie udalo sie usunac danych z SUBJECTS')
      )
    })
}

export const deleteTableClasses = () => {

    const db = DBConnect();

    db.transaction(tx => {
      tx.executeSql(
          'DROP TABLE IF EXISTS classes',
          null,
          (txObj, resultSet) => {
            console.log('udalo sie usunac tabele CLASSES')
          },
          (txObj, resultSet) => console.log('nie udalo sie usunac tabeli CLASSES')
      )
    })
}

export const deleteClasses = () => {

    const db = DBConnect();

    db.transaction(tx => {
      tx.executeSql(
          'DELETE FROM classes',
          null,
          (txObj, resultSet) => {
            console.log('udalo sie usunac dane z CLASSES')
          },
          (txObj, resultSet) => console.log('nie udalo sie usunac danych z CLASSES')
      )
    })
}

export const deleteTableNotes = () => {

    const db = DBConnect();

    db.transaction(tx => {
      tx.executeSql(
          'DROP TABLE IF EXISTS notes',
          null,
          (txObj, resultSet) => {
            console.log('udalo sie usunac tabele NOTES')
          },
          (txObj, error) => console.log('nie udalo sie usunac tabeli NOTES -> ' + error)
      )
    })
}

export const deleteNotes = () => {

    const db = DBConnect();

    db.transaction(tx => {
      tx.executeSql(
          'DELETE FROM notes',
          null,
          (txObj, resultSet) => {
            console.log('udalo sie usunac dane z NOTES')
          },
          (txObj, error) => console.log('nie udalo sie usunac danych z NOTES -> ' + error)
      )
    })
}

// export const deleteSubject = (oldSubjectName) => {

//     const db = DBConnect();

//     db.transaction(tx => {
//         tx.executeSql(
//             'UPDATE subjects SET is_deleted = 1 WHERE subject_name = ?',
//             [oldSubjectName],
//             (txObj, resultSet) => {
//                 loadSubjects(setSubjects);
//                 console.log('Przedmiot został usuniety');
//                 navigation.goBack(); // Wróć do poprzedniego ekranu
//             },
//             (txObj, error) => {
//                 console.log('Nie udało się usunac przedmiotu:', error);
//             }
//         );
//     }); 
// }

// export const deleteClass = (oldClassName) => {

//     const db = DBConnect();

//     db.transaction(tx => {
//         tx.executeSql(
//             'UPDATE classes SET is_deleted = 1 WHERE class_name = ?',
//             [oldClassName],
//             (txObj, resultSet) => {
//                 loadClasses(setClasses);
//                 console.log('Zajecie zostalo usuniete');
//                 navigation.goBack(); // Wróć do poprzedniego ekranu
//             },
//             (txObj, error) => {
//                 console.log('Nie udalo się usunac zajecia:', error);
//             }
//         );
//     }); 
// }