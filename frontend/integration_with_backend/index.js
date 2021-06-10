(() => {
    var App = {
        htmlElements: {
            userForm: document.getElementById('user_form'),
            userList: document.getElementById('user_list')
        },
        init: () => {
            App.bindEvents();
            App.initializeData.users();
        },
        bindEvents: () => {
            App.htmlElements.userForm.addEventListener('submit', App.events.onUserFormSubmit)
        },
        initializeData: {
            users: async () => {
                const { count, data } = await App.endpoints.getUsers();
                data.forEach(user => {
                    App.utils.addUserToTable(user);
                });
            }
        },
        events: {
            onUserFormSubmit: (e) => {
                e.preventDefault();
                const { 
                    name,
                    age,
                    status
                } = e.target.elements;
                const userName = name.value;
                const userAge = age.value;
                const userStatus = status.value;
                // 
            }
        },
        endpoints: {
            getUsers: () => {
                return App.utils.fetch("http://localhost:3000/api/v1/users/", "GET");
            },
            postUsers: (payload) => {
                return App.utils.fetch("http://localhost:3000/api/v1/users/", "POST", payload);
            }
        },
        utils: {
            fetch: async (url, method, payload) => {
                const requestOptions = { method };
                const response = await fetch(url, requestOptions);
                return response.json();
            },
            addUserToTable: ({ name, age, status }) => {
                App.htmlElements.userList.innerHTML += `<tr><td>${name}</td><td>${age}</td><td>${status}</td></tr>`;
            }
        }
    };
    App.init()
})();