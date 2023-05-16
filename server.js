// Any code that is commented out was because my first attempt at building the project was using express instead of inquirer, but I did not want to delete my code after realizing mistake.
// Now I can switch back and forth for future references.

const mysql = require('mysql2');
// const express = require('express');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const PORT = 3001;

// app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
},
    console.log('Database successfully connected, good job!')
);

// const app = express()

// app.get('/api/department', (req, res) => {
//     db.query('SELECT * FROM department', (err, result) => {
//         if (err) {
//             console.log(err);
//             res.send(err);
//         } else {
//             res.send(result);
//         }
//     });
// });

// app.get('/api/role', (req, res) => {
//     db.query('SELECT * FROM role', (err, result) => {
//         if (err) {
//             console.log(err);
//             res.send(err);
//         } else {
//             res.send(result);
//         }
//     });
// });

// app.get('/api/employee', (req, res) => {
//     db.query('SELECT * FROM employee', (err, result) => {
//         if (err) {
//             console.log(err);
//             res.send(err);
//         } else {
//             res.send(result);
//         }
//     });
// });

// app.post('/api/add-department', (req, res) => {
//     db.query('INSERT INTO department (dep_name) VALUES (?);', req.body.dep_name, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.send(err);
//         } else {
//             res.send(result);
//         }
//     });
// });

// app.post('/api/add-role', (req, res) => {
//     db.query('INSERT INTO role (title) VALUES (?)', req.body.title, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.send(err);
//         } else {
//             res.send(result);
//         }
//     });
// });

// app.post('/api/add-employee', (req, res) => {
//     db.query('INSERT INTO employee (first_name) VALUES (?)', req.body.first_name, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.send(err);
//         } else {
//             res.send(result);
//         }
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Now listening on ${PORT}`)
// });

function start() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ],
        }).then((answer) => {
            switch (answer.action) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    db.end();
                    break;
            }
        });
}

function viewDepartments() {
    var query = "SELECT * FROM department";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the name of the department:",
            name: "dep_name"
        }
    ]).then(function (res) {
        var query = db.query(
            "INSERT INTO department SET ?",
            {
                dep_name: res.dep_name
            },
            function (err, res) {
                if (err) throw err;
                console.log('Department added succesfully');
                start();
            }
        )
    })
}

function viewRoles() {
    var query = "SELECT * FROM role";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the title of the role:",
            name: "title"
        },
        {
            type: "input",
            message: "Enter the salary of the role:",
            name: "salary"
        },
        {
            type: "input",
            message: "Enter the department ID this role belongs to:",
            name: "department_id"
        }
    ]).then(function (res) {
        var query = db.query(
            "INSERT INTO role SET ?",
            {
                title: res.title,
                salary: res.salary,
                department_id: res.department_id
            },
            function (err, res) {
                if (err) throw err;
                console.log('Role added successfully!');
                start();
            }
        )
    })
}

function viewEmployees() {
    var query = "SELECT * FROM employee";
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the first name of the employee:",
            name: "first_name"
        },
        {
            type: "input",
            message: "Enter the last name of the employee:",
            name: "last_name"
        },
        {
            type: "input",
            message: "Enter the role ID for this employee:",
            name: "role_id"
        },
        {
            type: "input",
            message: "If this employee has a manager, enter the manager's ID. If not, leave blank:",
            name: "manager_id"
        }
    ]).then(function (res) {
        if (res.manager_id === '') {
            res.manager_id = null;
        }
        var query = db.query(
            "INSERT INTO employee SET ?",
            {
                first_name: res.first_name,
                last_name: res.last_name,
                role_id: res.role_id,
                manager_id: res.manager_id
            },
            function (err, res) {
                if (err) throw err;
                console.log('Employee added successfully!');
                start();
            }
        )
    })
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the employee you wish to update:",
            name: "employee_id"
        },
        {
            type: "input",
            message: "Enter the new role ID for this employee:",
            name: "role_id"
        }
    ]).then(function (res) {
        var query = "UPDATE employee SET role_id = ? WHERE id = ?";
        db.query(query, [res.role_id, res.employee_id], function (err, res) {
            if (err) throw err;
            console.log('Employee updated successfully!');
            start();
        });
    });
}

start();
