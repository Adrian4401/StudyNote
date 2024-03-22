import { useEffect } from 'react';
import { DBConnect } from './DBConnect';



const db = DBConnect();



export function Create() {

    useEffect(() => {

        db.transaction(tx => 
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS subjects ('+
                    'subject_id INTEGER PRIMARY KEY AUTOINCREMENT,'+ 
                    'subject_name TEXT,'+
                    'is_deleted INTEGER DEFAULT 0)',
                [],
                (txObj, resultSet) => console.log('DB -- Connected to table SUBJECTS'),
                (txObj, error) => console.log('DB ERROR -- Connection failed to table SUBJECTS -> ' + error)
            )
        );

        db.transaction(tx => 
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS classes ('+
                    'class_id INTEGER PRIMARY KEY AUTOINCREMENT,'+
                    'class_name TEXT,'+
                    'is_deleted INTEGER DEFAULT 0)',
                [],
                (txObj, resultSet) => console.log('DB -- Connected to table CLASSES'),
                (txObj, error) => console.log('DB ERROR -- Connection failed to table CLASSES -> ' + error)
            )
        );

        db.transaction(tx => 
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS notes ('+
                    'note_id INTEGER PRIMARY KEY AUTOINCREMENT,'+
                    'title TEXT,'+
                    'note TEXT,'+
                    'subject_id INTEGER,'+
                    'class_id INTEGER,'+
                    'create_day TEXT,'+
                    'is_deleted INTEGER DEFAULT 0,'+
                    'FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),'+
                    'FOREIGN KEY (class_id) REFERENCES classes(class_id))',
                [],
                (txObj, resultSet) => console.log('DB -- Connected to table NOTES'),
                (txObj, error) => console.log('DB ERROR -- Connection failed to table NOTES -> ' + error)
            )  
        )

        db.transaction(tx => 
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS events ('+
                    'event_id INTEGER PRIMARY KEY AUTOINCREMENT,'+
                    'title TEXT,'+
                    'description TEXT,'+
                    'subject_id INTEGER,'+
                    'class_id INTEGER,'+
                    'create_day TEXT,'+
                    'FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),'+
                    'FOREIGN KEY (class_id) REFERENCES classes(class_id))',
                [],
                (txObj, resultSet) => console.log('DB -- Connected to table EVENTS'),
                (txObj, error) => console.log('DB ERROR -- Connection failed to table EVENTS -> ' + error)
            )  
        )
    })
}