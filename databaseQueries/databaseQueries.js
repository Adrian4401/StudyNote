import { DBConnect } from "./DBConnect";

const db = DBConnect();




// THE ORDER OF QUERIES:
// 1. CREATE
// 2. SELECT
// 3. INSERT
// 4. UPDATE
// 5. DELETE





// ===== CREATE TABLES =====


export function Create() {

    db.transaction(tx => 
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS subjects ('+
                'subject_id INTEGER PRIMARY KEY AUTOINCREMENT,'+ 
                'subject_name TEXT,'+
                'is_deleted INTEGER DEFAULT 0)',
            [],
            (_, result) => console.log('DB -- Connected to table SUBJECTS'),
            (error) => console.log('DB ERROR -- Connection failed to table SUBJECTS -> ' + error)
        )
    );


    db.transaction(tx => 
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS classes ('+
                'class_id INTEGER PRIMARY KEY AUTOINCREMENT,'+
                'class_name TEXT,'+
                'is_deleted INTEGER DEFAULT 0)',
            [],
            (_, result) => console.log('DB -- Connected to table CLASSES'),
            (error) => console.log('DB ERROR -- Connection failed to table CLASSES -> ' + error)
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
                'create_day DATE,'+
                'is_deleted INTEGER DEFAULT 0,'+
                'FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),'+
                'FOREIGN KEY (class_id) REFERENCES classes(class_id))',
            [],
            (_, result) => console.log('DB -- Connected to table NOTES'),
            (error) => console.log('DB ERROR -- Connection failed to table NOTES -> ' + error)
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
                'deadline DATETIME,'+
                'FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),'+
                'FOREIGN KEY (class_id) REFERENCES classes(class_id))',
            [],
            (_, result) => console.log('DB -- Connected to table EVENTS'),
            (error) => console.log('DB ERROR -- Connection failed to table EVENTS -> ' + error)
        )  
    ) 
    

    db.transaction(tx =>
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS notesToEvent ('+
                'id INTEGER PRIMARY KEY AUTOINCREMENT,'+
                'event_id INTEGER,'+
                'note_id INTEGER,'+
                'FOREIGN KEY (event_id) REFERENCES events(event_id),'+
                'FOREIGN KEY (note_id) REFERENCES notes(note_id))',
            [],
            (_, result) => console.log('DB -- Connected to table NOTEStoEVENT'),
            (error) => console.log('DB ERROR -- Connection failed to table NOTEStoEVENT -> ' + error)
        )
    )

}




// ===== SELECT QUERIES =====


export const selectEditedNote = (setSubjects, setClasses, noteID, setCurrentTitle, setCurrentNote, setCurrentSubject, setCurrentClass) => {

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
            [],
            (txObj, resultSet) => {
                setSubjects(resultSet.rows._array),
                console.log('DATA -- Subjects loaded');
                // console.log(resultSet.rows._array);
            },
            (txObj, error) => console.log('ERROR -- Subjects loading failed' + error)
        );
    });
}
  
  
export const loadClasses = (setClasses) => {
  
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM classes WHERE is_deleted = 0', 
            [],
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
    }

}


export const selectNotesToEvent = (eventID, setNotesData) => {
  
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
            'classes.class_name, '+
            'notesToEvent.event_id '+
        'FROM notes '+
        'JOIN subjects ON notes.subject_id = subjects.subject_id '+
        'JOIN classes ON notes.class_id = classes.class_id '+
        'JOIN notesToEvent ON notes.note_id = notesToEvent.note_id '+
        'WHERE notes.note IS NOT NULL '+
            'AND notes.is_deleted = 0 '+
            'AND notesToEvent.event_id = ? ',
        [eventID],
        (_, {rows}) => {
            const data = rows._array;
            setNotesData(data);
        },
        (txObj, error) => console.log('ERROR -- Select notes to event failed -> ' + error)
        )  
    )

}


export const selectAllNotesEvent = () => {
  
    db.transaction(tx => 
        tx.executeSql(
            'SELECT * FROM notesToEvent',
            [],
            (_, {rows}) => {
                const data = rows._array;
                console.log(data)
            },
            (txObj, error) => console.log('ERROR -- Ni ma polaczen -> ' + error)
        )  
    )
  
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
  
  
export const selectAllEvents = (setData) => {
  
    db.transaction(tx => 
        tx.executeSql(
            'SELECT '+ 
                'events.event_id,'+
                'events.title,'+
                'events.description,'+
                'events.subject_id,'+
                'events.class_id,'+
                'substr(events.deadline, 1, 10) AS deadlineDate,'+
                'substr(events.deadline, 12, 5) AS deadlineTime,'+
                'subjects.subject_name, '+
                'classes.class_name '+
            'FROM events '+
            'RIGHT JOIN subjects ON events.subject_id = subjects.subject_id '+
            'RIGHT JOIN classes ON events.class_id = classes.class_id '+
            'WHERE events.title IS NOT NULL '+
            'ORDER BY events.deadline ',
            [],
            (_, {rows}) => {
                const data = rows._array;
                console.log(data);
                setData(data);
                console.log('DATA -- Events loaded')
            },
            (error) => console.log('ERROR -- Events loading failed' + error)
        )  
    )
}


export const selectEventToRead = (eventID, setTitle, setDescription, setSubject, setMyclass, setDeadlineDate, setDeadlineTime) => {
  
    db.transaction(tx => 
        tx.executeSql(
            'SELECT '+ 
                'events.event_id,'+
                'events.title,'+
                'events.description,'+
                'events.subject_id,'+
                'events.class_id,'+
                'substr(events.deadline, 1, 10) AS deadlineDate,'+
                'substr(events.deadline, 12, 5) AS deadlineTime,'+
                'subjects.subject_name, '+
                'classes.class_name '+
            'FROM events '+
            'RIGHT JOIN subjects ON events.subject_id = subjects.subject_id '+
            'RIGHT JOIN classes ON events.class_id = classes.class_id '+
            'WHERE events.title IS NOT NULL '+
            'AND events.event_id = ?',
            [eventID],
            (_, {rows}) => {
                const event = rows.item(0);
                setTitle(event.title);
                setDescription(event.description);
                setSubject(event.subject_name);
                setMyclass(event.class_name);
                setDeadlineDate(event.deadlineDate);
                setDeadlineTime(event.deadlineTime);
            },
            (error) => console.log('ERROR -- Events loading failed' + error)
        )  
    )
}


// export const selectNotesToEvent = (eventID) => {

//     db.transaction(tx => {
//         tx.executeSql(
//             'SELECT '
//         )
//     })
// }




// ===== INSERT QUERIES =====


export const addSubject = async (currentSubject, setCurrentSubject, subjects, setSubjects) => {

    if(currentSubject && typeof currentSubject === "string" && currentSubject.trim() !== "") {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO subjects (subject_name) VALUES (?)', 
                [currentSubject],
                (_, resultSet) => {
                    let existingSubjects = [...subjects];
                    existingSubjects.push({subject_id: resultSet.insertId, subject_name: currentSubject});
                    setSubjects(existingSubjects);
                    setCurrentSubject(undefined);
                    console.log('DATA -- Subject added successfully');
                },
                (error) => console.log('ERROR -- Adding subject failed -> ' + error)
            );
        });
    }
    else {
        console.log('Nie mozna dodac pustego przedmiotu')
    }

}



const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}



export const addEvent = (navigation, currentTitle, currentDescription, date, valueSubjects, currentClass, checkedNoteIDs) => {

    const formattedDate = formatDate(date);
    console.log('Sformatowana data: ', formattedDate)

    db.transaction(tx =>
        tx.executeSql(
            'INSERT INTO events (title, description, deadline, subject_id, class_id) values(?,?,?,?,?)',
            [currentTitle, currentDescription, formattedDate, valueSubjects, currentClass],
            (_, result) => {
                const eventID = parseInt(result.insertId);

                addNotesToEvent(eventID, checkedNoteIDs);

                console.log('Udalo sie dodac wydarzenie');
                navigation.goBack();
                console.log(result)
            },
            (error) => console.log('Nie udalo sie dodac wydarzenia -> ' + error)
        )
    )

    // console.log('ID wydarzenia: ', eventID);

}


const addNotesToEvent = (eventID, checkedNoteIDs) => {

    checkedNoteIDs.forEach(noteID => {

        const parsedNoteID = parseInt(noteID)

        db.transaction(tx =>
            tx.executeSql(
                'INSERT INTO notesToEvent (event_id, note_id) values(?,?)',
                [eventID, parsedNoteID],
                (_, result) => {
                    console.log('Udalo sie dodac notatki do wydarzenia');
                    console.log(result);
                },
                (error) => console.log('Nie udalo sie dodac notatek do wydarzenia -> ' + error)
            )
        );
    });
}


// ===== UPDATE QUERIES =====


export const editSubject = (oldSubjectName, newSubjectName) => {

    db.transaction(tx => {
        tx.executeSql(
            'UPDATE subjects SET subject_name = ? WHERE subject_name = ?',
            [newSubjectName, oldSubjectName],
            (txObj, resultSet) => {
                loadSubjects(setSubjects);
                console.log('DATA -- Subject updated successfully');
                navigation.goBack(); // Wróć do poprzedniego ekranu
            },
            (txObj, error) => {
                console.log('ERROR -- Subject updating failed -> ', error);
            }
        );
    });   
}


export const editClass = (classID, newClassName, navigation, setClasses) => {

    db.transaction(tx => {
        tx.executeSql(
            'UPDATE classes SET class_name = ? WHERE class_id = ?',
            [newClassName, classID],
            (txObj, resultSet) => {
                loadClasses(setClasses);
                console.log('DATA -- Class updated successfully');
                navigation.goBack(); // Wróć do poprzedniego ekranu
            },
            (txObj, error) => {
                console.log('ERROR -- Class updating failed -> ', error);
            }
        );
    });   
}


export const editNote = (currentTitle, currentNote, currentSubject, currentClass, noteID, navigation) => {

    db.transaction(tx => {
        tx.executeSql(
            'UPDATE notes SET title = ?, note = ?, subject_id = ?, class_id = ? WHERE note_id = ?',
            [currentTitle, currentNote, currentSubject, currentClass, noteID],
            (txObj, resultSet) => {
                console.log('DATA -- Note updated successfully');
                navigation.goBack();
            },
            (txObj, error) => console.log('ERROR -- Note updating failed -> ', error)
        )
    })
}




// ===== DELETE QUERIES =====


export const deleteAllData = () => {

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

    db.transaction(tx => {
        tx.executeSql(
            'DROP TABLE IF EXISTS events',
            null,
            (_, resultSet) => {
              console.log('DATA -- Events table deleted')
            },
            (error) => console.log('ERROR -- Deleting events table failed -> ' + error)
        )
    })

    db.transaction(tx => {
        tx.executeSql(
            'DROP TABLE IF EXISTS notesToEvent',
            null,
            (_, resultSet) => {
              console.log('DATA -- NOTEStoEVENT table deleted')
            },
            (error) => console.log('ERROR -- Deleting NOTEStoEVENT table failed -> ' + error)
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


export const deleteEvent = (eventID, navigation) => {

    db.transaction(tx =>
        tx.executeSql(
            // 'UPDATE events SET is_deleted = 1 WHERE event_id = ?',
            'DELETE FROM events WHERE event_id = ?',
            [eventID],
            (_, resultSet) => {
                console.log('DATA -- Event deleted'),
                navigation.goBack();
            },
            (error) => console.log('ERROR -- Deleting event failed -> ' + error)
        )    
    )
  }