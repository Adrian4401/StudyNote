import { useEffect } from 'react';
import { DBConnect } from './DBConnect';

export function Create() {

    const db = DBConnect();

    useEffect(() => {
        
        db.transaction(tx => 
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS subjects (subject_id INTEGER PRIMARY KEY AUTOINCREMENT, subject_name TEXT, is_deleted INTEGER DEFAULT 0)',
                null,
                (txObj, resultSet) => console.log('Polaczono z tabela SUBJECTS'),
                (txObj, error) => console.log('Nie udalo sie polaczyc z tabela SUBJECTS')
                )
            );

        db.transaction(tx => 
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS classes (class_id INTEGER PRIMARY KEY AUTOINCREMENT, class_name TEXT, is_deleted INTEGER DEFAULT 0)',
                null,
                (txObj, resultSet) => console.log('Polaczono z tabela CLASSES'),
                (txObj, error) => console.log('Nie udalo sie polaczyc z tabela CLASSES')
            )
        );
    })
}