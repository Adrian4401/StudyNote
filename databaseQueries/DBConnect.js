import * as SQLite from 'expo-sqlite';

export const DBConnect = () => {
    const db = SQLite.openDatabase('studynote.db');

    return db;
}