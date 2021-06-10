(() => {
    var Utils = {
        addStudentToList: ({ tableBody, studentName, studentAge, studentHobbies }) => {
            const newRow = `<tr><td>${studentName}</td><td>${studentAge}</td><td>${studentHobbies}</td><td><button class="student_delete">Eliminar</button></td><td><button class="student_update">Actualizar</button></td></tr>`;
            tableBody.innerHTML += newRow;
        },
        initilizeData: ({tableBody, amountOfUsers=10}) => {
            // Initialize "database"
            for(let i=0; i<amountOfUsers; i++){
                Utils.addStudentToList({ 
                    tableBody,
                    studentName: i,
                    studentAge: i,
                    studentHobbies: i,
                });
            }
        }
    }
    window.document.Utils = Utils;
})();