const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const PORT = 3001;

app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
},
    console.log('Database successfully connected, good job!')
);

const app = express()

app.get('/api/department', (req, res) => {
    db.query('SELECT * FROM department', (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/api/role', (req, res) => {
    db.query('SELECT * FROM role', (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/api/employee', (req, res) => {
    db.query('SELECT * FROM employee', (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/api/add-department', (req, res) => {
    db.query('INSERT INTO department (dep_name) VALUES (?);', req.body.dep_name, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/api/add-role', (req, res) => {
    db.query('INSERT INTO role (title) VALUES (?)', req.body.title, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/api/add-employee', (req, res) => {
    db.query('INSERT INTO employee (first_name) VALUES (?)', req.body.first_name, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Now listening on ${PORT}`)
});