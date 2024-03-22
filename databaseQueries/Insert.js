import { DBConnect } from "./DBConnect";



const db = DBConnect();



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