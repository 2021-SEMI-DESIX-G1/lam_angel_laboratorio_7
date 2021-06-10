const express = require('express');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const Data = [
    {
        name: 'Erick Agrazal',
        age: 30,
        status: 'active',
    },
    {
        name: 'José Muñoz',
        age: 34,
        status: 'active',
    },
    {
        name: 'Iván Betegón',
        age: 28,
        status: 'active',
    }
]

const Users = {
    getUsers: (req, res) => {
        res.json({
            model: 'Users',
            count: Data.length,
            data: Data,
        });
    },
    getUser: (req, res) => {
        res.json(Data[req.params.id]);
    },
    createUser: (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){ return res.json(errors);}
        const { name, age, status } = req.body;
        Data.push({ name, age, status });
        res.json({
            model: 'Users',
            count: Data.length,
            data: Data,
        });
    }
}

const UsersValidations = {
    createUser: [
        body('name', 'El nombre es incorrecto.').exists({checkNull: true, checkFalsy: true}),
        body('age', 'La edad es incorrecta.').isNumeric(),
        body('status', 'El estatus es incorrecto.').exists({checkNull: true, checkFalsy: true}).isIn(['active', 'inactive']),
    ]
}

app.get('/api/v1/users/', Users.getUsers);
app.get('/api/v1/users/:id', Users.getUser);
app.post('/api/v1/users/', UsersValidations.createUser, Users.createUser);
// app.put('/api/v1/users/:id', Users.getUser);
// app.patch('/api/v1/users/:id', Users.getUser);
// app.delete('/api/v1/users/:id', Users.getUser);

app.listen(port, () => {
    console.log(`Ejemplo escuchando en: http://localhost:${port}`)
})