import { useNavigation } from "@react-navigation/native";
import { DBConnect } from "./DBConnect"



const db = DBConnect();



export const deleteTableSubjects = () => {

    db.transaction(tx => {
      tx.executeSql(
          'DROP TABLE IF EXISTS subjects',
          null,
          (_, resultSet) => {
            console.log('DATA -- Subjects table deleted')
          },
          (error) => console.log('ERROR -- Deleting subjects table failed -> ', error)
      )
    })
}

export const deleteSubjects = () => {

    db.transaction(tx => {
      tx.executeSql(
          'DELETE FROM subjects',
          null,
          (_, resultSet) => {
            console.log('DATA -- Data from table subjects deleted')
          },
          (error) => console.log('ERROR -- Deleting data from subjects table failed -> ', error)
      )
    })
}

export const deleteTableClasses = () => {

    db.transaction(tx => {
      tx.executeSql(
          'DROP TABLE IF EXISTS classes',
          null,
          (_, resultSet) => {
            console.log('DATA -- Classes table deleted')
          },
          (error) => console.log('ERROR -- Deleting classes table failed -> ', error)
      )
    })
}

export const deleteClasses = () => {

    db.transaction(tx => {
      tx.executeSql(
          'DELETE FROM classes',
          null,
          (_, resultSet) => {
            console.log('DATA -- Data from table classes deleted')
          },
          (error) => console.log('ERROR -- Deleting data from classes table failed -> ', error)
      )
    })
}

export const deleteTableNotes = () => {

    db.transaction(tx => {
      tx.executeSql(
          'DROP TABLE IF EXISTS notes',
          null,
          (_, resultSet) => {
            console.log('DATA -- Notes table deleted')
          },
          (error) => console.log('ERROR -- Deleting note table failed -> ' + error)
      )
    })
}

export const deleteNotes = () => {

    db.transaction(tx => { 
      tx.executeSql(
          'DELETE FROM notes',
          null,
          (_, resultSet) => {
            console.log('DATA -- Data from table notes deleted')
          },
          (error) => console.log('ERROR -- Deleting data from note table failed -> ' + error)
      )
    })
}



export const deleteNote = (noteID, navigation) => {

  db.transaction(tx =>
      tx.executeSql(
          'UPDATE notes SET is_deleted = 1 WHERE note_id = ?',
          [noteID],
          (_, resultSet) => {
              console.log('DATA -- Note deleted'),
              navigation.goBack();
          },
          (error) => console.log('ERROR -- Deleting note failed -> ' + error)
      )    
  )
}