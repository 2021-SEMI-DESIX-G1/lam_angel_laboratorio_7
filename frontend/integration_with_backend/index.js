(() => {
  var App = {
    htmlElements: {
      userForm: document.getElementById("user_form"),
      userList: document.getElementById("user_list"),
      submitButton: document.getElementById("submit"),
      updateButton: document.getElementById("update"),
    },
    init: () => {
      App.bindEvents();
      App.initializeData.users();
    },
    bindEvents: () => {
      App.htmlElements.userForm.addEventListener(
        "submit",
        App.events.onUserFormSubmit
      );
      App.htmlElements.userList.addEventListener(
        "click",
        App.utils.studentRowOnDelete
      );
      App.htmlElements.updateButton.addEventListener(
        "click",
        App.utils.studentRowOnUpdate
      );
    },
    initializeData: {
      users: async () => {
        const { data } = await App.endpoints.getUsers();
        data.forEach((user) => {
          App.utils.addUserToTable(user);
        });
      },
    },
    events: {
      onUserFormSubmit: (e) => {
        e.preventDefault();
        const { name, age, status } = e.target.elements;
        const userName = name.value;
        const userAge = parseInt(age.value);
        const userStatus = status.value;
        App.endpoints.postUsers({
          name: userName,
          age: userAge,
          status: userStatus,
        });
        App.utils.addUserToTable({
          name: userName,
          age: userAge,
          status: userStatus,
        });
      },
    },
    endpoints: {
      getUsers: () => {
        return App.utils.fetch("http://localhost:3000/api/v1/users/", "GET");
      },
      postUsers: (payload) => {
        return App.utils.fetch(
          "http://localhost:3000/api/v1/users/",
          "POST",
          payload
        );
      },
      putUsers: (id, payload) => {
        return App.utils.fetchMutate(
          "http://localhost:3000/api/v1/users/",
          "PUT",
          id,
          payload
        );
      },
      deleteUsers: (id) => {
        return App.utils.fetchMutate(
          "http://localhost:3000/api/v1/users/",
          "DELETE",
          id
        );
      },
    },
    utils: {
      fetch: async (url, method, payload) => {
        const requestOptions = {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };
        const response = await fetch(url, requestOptions);
        return response.json();
      },
      fetchMutate: async (url, method, id, payload) => {
        const requestOptions = {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };
        const response = await fetch(url + id, requestOptions);
        return response.json();
      },
      findUserId: (list, event) => {
        for (let i = 0; i < list.length; i++) {
          if (
            list[i].parentElement.parentElement.children[0].innerText ===
            event.target.parentElement.parentElement.children[0].innerText
          ) {
            return i;
          }
        }
      },
      addUserToTable: ({ name, age, status }) => {
        App.htmlElements.userList.innerHTML += `<tr><td>${name}</td><td>${age}</td><td>${status}</td><td><button class="student_update">Update</button></td><td><button class="student_delete">Delete</button></td></tr>`;
        App.htmlElements.userForm.elements.name.value = "";
        App.htmlElements.userForm.elements.age.value = "";
        App.htmlElements.userForm.elements.status.value = "active";
      },
      studentRowOnDelete: (event) => {
        if (!event.target) {
          return;
        }

        if (event.target.className === "student_delete") {
          const studentList = document.getElementsByClassName("student_delete");
          App.endpoints.deleteUsers(App.utils.findUserId(studentList, event));
          event.target.parentElement.parentElement.remove();
        } else if (event.target.className === "student_update") {
          const studentList = document.getElementsByClassName("student_update");
          App.htmlElements.userForm.elements.name.value =
            event.target.parentElement.parentElement.children[0].innerText;
          App.htmlElements.userForm.elements.age.value =
            event.target.parentElement.parentElement.children[1].innerText;
          App.htmlElements.userForm.elements.status.value =
            event.target.parentElement.parentElement.children[2].innerText;
          App.htmlElements.submitButton.style.display = "none";
          App.htmlElements.updateButton.style.display = "inline-block";
          App.htmlElements.updateButton.id = App.utils.findUserId(
            studentList,
            event
          );
        }
      },
      studentRowOnUpdate: () => {
        const studentList = document.getElementsByClassName("student_update");
        const id = App.htmlElements.updateButton.id;
        studentList[id].parentElement.parentElement.children[0].innerText =
          App.htmlElements.userForm.elements.name.value;
        studentList[id].parentElement.parentElement.children[1].innerText =
          App.htmlElements.userForm.elements.age.value;
        studentList[id].parentElement.parentElement.children[2].innerText =
          App.htmlElements.userForm.elements.status.value;

        App.endpoints.putUsers(id, {
          name: App.htmlElements.userForm.elements.name.value,
          age: App.htmlElements.userForm.elements.age.value,
          status: App.htmlElements.userForm.elements.status.value,
        });

        App.htmlElements.submitButton.style.display = "inline-block";
        App.htmlElements.updateButton.style.display = "none";
        App.htmlElements.userForm.elements.name.value = "";
        App.htmlElements.userForm.elements.age.value = "";
        App.htmlElements.userForm.elements.status.value = "active";
      },
    },
  };
  App.init();
})();
