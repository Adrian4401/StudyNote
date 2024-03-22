import { useState } from "react";
import { DBConnect } from "./DBConnect";



const db = DBConnect();



export const selectEditedNote = (setSubjects, setClasses, noteID, setCurrentTitle, setCurrentNote, setCurrentSubject, setCurrentClass) => {

  // loadSubjectsAndClasses(setSubjects, setClasses);
  loadSubjects(setSubjects)
  loadClasses(setClasses)
  selectNote(noteID, setCurrentTitle, setCurrentNote, setCurrentSubject, setCurrentClass)

}

export const loadSubjectsAndClasses = (setSubjects, setClasses) => {

  loadSubjects(setSubjects);
  loadClasses(setClasses);

}

export const selectAllNotesWithSubjects = (setSubjects, setData) => {

  loadSubjects(setSubjects)
  selectAllNotes(setData)

}



export const loadSubjects = (setSubjects) => {
    
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
}



export const loadClasses = (setClasses) => {

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

}



export const selectAllNotes = (setData) => {

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
        (txObj, error) => console.log('ERROR -- Select chosen note failed -> ' + error)
      )  
    )
  } else {
    selectAllNotes(setData);
  }

}



export const selectNote = (noteID, setCurrentTitle, setCurrentNote, setCurrentSubject, setCurrentClass) => {

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
      'WHERE notes.note IS NOT NULL AND notes.is_deleted = 0 '+
      'AND note_id = ?',
      [noteID],
      (_, {rows}) => {
        const row = rows.item(0);
        setCurrentTitle(row.title);
        setCurrentNote(row.note);
        setCurrentSubject(row.subject_id);
        setCurrentClass(row.class_id);
      },
      (txObj, error) => console.log('ERROR -- Loading note failed -> ' + error)
    )  
  )

}

export const selectNoteToRead = (noteID, setTitle, setNote, setSubject, setMyclass, setCreateDay) => {

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
    'WHERE notes.note IS NOT NULL AND notes.is_deleted = 0 '+
    'AND note_id = ?',
    [noteID],
    (_, {rows}) => {
        const note = rows.item(0);
        setTitle(note.title);
        setNote(note.note);
        setSubject(note.subject_name);
        setMyclass(note.class_name);
        setCreateDay(note.create_day);
    },
    (txObj, error) => console.log('ERROR -- Loading note failed -> ' + error)
    )  
)
}