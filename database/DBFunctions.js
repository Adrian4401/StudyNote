import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('studynote.db');

export const loadSubjects = (setSubjects) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM subjects WHERE is_deleted = 0', 
      null,
      (txObj, resultSet) => {
        setSubjects(resultSet.rows._array),
        console.log('Przedmioty zostały odświeżone');
      },
      (txObj, error) => console.log(error)
    );
  });
};

export const loadClasses = (setClasses) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM classes WHERE is_deleted = 0', 
      null,
      (txObj, resultSet) => {
        setClasses(resultSet.rows._array),
        console.log('Zajecia zostały odswiezone');
      },
      (txObj, error) => console.log(error)
    );
  });
};