import { useState } from "react";
import { DBConnect } from "./DBConnect";

export const loadSubjects = (setSubjects) => {

  const db = DBConnect();

  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM subjects WHERE is_deleted = 0', 
      null,
      (txObj, resultSet) => {
        setSubjects(resultSet.rows._array),
        console.log('DATA -- Subjects loaded');
        console.log(resultSet.rows._array);
      },
      (txObj, error) => console.log('ERROR -- Subjects loading failed' + error)
    );
  });

};

export const loadClasses = (setClasses) => {

  const db = DBConnect();

  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM classes WHERE is_deleted = 0', 
      null,
      (txObj, resultSet) => {
        setClasses(resultSet.rows._array),
        console.log('DATA -- Classes loaded');
      },
      (txObj, error) => console.log('ERROR -- Classes loading failed' + error)
    );
  });
};

export const selectAllNotes = (setData) => {

  const db = DBConnect();

  db.transaction(tx => 
    tx.executeSql(
      'SELECT '+ 
        'notes.note_id,'+
        'notes.title,'+
        'notes.note,'+
        'notes.create_day,'+
        'notes.subject_id,'+
        'notes.class_id,'+
        'notes.is_deleted,'+
        'subjects.subject_name, '+
        'classes.class_name '+
      'FROM notes '+
      'RIGHT JOIN subjects ON notes.subject_id = subjects.subject_id '+
      'RIGHT JOIN classes ON notes.class_id = classes.class_id '+
      'WHERE notes.note IS NOT NULL AND notes.is_deleted = 0 ',
      [],
      (_, {rows}) => {
        const data = rows._array;
        console.log(data);
        setData(data);
        console.log('DATA -- Notes loaded')
      },
      (txObj, error) => console.log('ERROR -- Notes loading failed' + error)
    )  
  )
}

export const selectChosenNotes = (valueSubjects, setData) => {
  
  const db = DBConnect();

  if (valueSubjects !== null) {
    db.transaction(tx => 
      tx.executeSql(
        'SELECT '+ 
          'notes.note_id,'+
          'notes.title,'+
          'notes.note,'+
          'notes.create_day,'+
          'notes.subject_id,'+
          'notes.class_id,'+
          'notes.is_deleted,'+
          'subjects.subject_name, '+
          'classes.class_name '+
        'FROM notes '+
        'RIGHT JOIN subjects ON notes.subject_id = subjects.subject_id '+
        'RIGHT JOIN classes ON notes.class_id = classes.class_id '+
        'WHERE notes.note IS NOT NULL AND notes.is_deleted = 0 AND notes.subject_id = ? ',
        [valueSubjects],
        (_, {rows}) => {
          const data = rows._array;
          setData(data);
        },
        (txObj, error) => console.log('Nie udalo sie wypisac notatek dla wybranego przedmiotu -> ' + error)
      )  
    )
  } else {
    selectAllNotes(setData);
  }

}