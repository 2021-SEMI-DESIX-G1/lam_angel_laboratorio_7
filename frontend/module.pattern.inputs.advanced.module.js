((Utils) => {
    var App = {
        DEBUG: true,
        htmlElements: {
            studentForm: document.getElementById('student_form'),
            studentsList: document.getElementById('students_list'),
        },
        init: () => {
            App.bindEvents();
        },
        bindEvents: () => {
            // Bind events
            App.htmlElements.studentForm.addEventListener('submit', App.events.studentFormOnSubmit);

            // Might get slow if too many students exists, although... This type of event binding is
            // much more faster than binding one by one if the list starts to get huge.
            App.htmlElements.studentsList.addEventListener('click', App.events.studentRowOnDelete);

            // Initializes data for testing
            if(App.DEBUG){
                Utils.initilizeData({ tableBody: App.htmlElements.studentsList });
            }
        },
        events: {
            studentFormOnSubmit: (event) => {
                event.preventDefault();
                const { 
                    student_name: studentNameInput,
                    student_age: studentAgeInput,
                    student_hobbies: studentHobbiesInput
                } = event.target.elements;
                const studentName = studentNameInput.value;
                const studentAge = studentAgeInput.value;
                const studentHobbies = studentHobbiesInput.value;
                Utils.addStudentToList({ 
                    tableBody: App.htmlElements.studentsList,
                    studentName,
                    studentAge,
                    studentHobbies,
                });
            },
            studentRowOnDelete: (event) => {
                if(!event.target){ return; }
                if(event.target.className === 'student_delete'){
                    event.target.parentElement.parentElement.remove();
                } else if(event.target.className === 'student_update'){
                    App.htmlElements.studentForm.elements.student_name.value = 100;
                    App.htmlElements.studentForm.elements.student_age.value = 100;
                    App.htmlElements.studentForm.elements.student_hobbies.value = 100;
                }
            }
        }
    }
    App.init();
})(window.document.Utils);