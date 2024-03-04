import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('studynote.db');

export const loadSubjects = (setSubjects) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM subjects WHERE is_deleted = 0', 
      null,
      (txObj, resultSet) => {
        setSubjects(resultSet.rows._array),
        // const subjects = resultSet.rows._array;
        console.log('Przedmioty zostały odświeżone');
      },
      (txObj, error) => console.log(error)
    );
  });
};