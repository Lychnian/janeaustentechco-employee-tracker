// Importing required modules
const inquirer = require("inquirer");
const mysql = require('mysql2/promise'); // Using promise-based mysql2
const cfonts = require('cfonts');

// Async function to initialize the database connection
async function initializeDatabase() {
    try {
        return await mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Lychnian",
            database: "janeausten_techco_employee_db",
        });
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
}

// Function to start the application and display options
async function start() {
    try {
        const answer = await inquirer.prompt({
            type: "list",
            name: "action",
            message: "Welcome to the Jane Austen Tech Co Employee Tracker. What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "EXIT"
            ]
        });

        switch (answer.action) {
            case "View all departments":
                await viewAllDepartments();
                break;
            case "View all roles":
                await viewAllRoles();
                break;
            case "View all employees":
                await viewAllEmployees();
                break;
            case "Add a department":
                await addDepartment();
                break;
            case "Add a role":
                await addRole();
                break;
            case "Add an employee":
                await addEmployee();
                break;
            case "Update an employee role":
                await updateEmployeeRole();
                break;
            case "EXIT":
                console.log("Farewell, and may your day be most delightful!");
                connection.end();
                return;
        }

        await start();
    } catch (err) {
        console.error('Error during operation:', err);
        await start();
    }
}

// Async function to view all departments
async function viewAllDepartments() {
    try {
        const query = "SELECT * FROM departments";
        const [rows] = await connection.query(query);
        console.table(rows);
    } catch (err) {
        console.error('Error fetching departments:', err);
    }
}

// Async function to view all roles
async function viewAllRoles() {
    try {
        const query = "SELECT roles.title, roles.id, departments.department_name, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id";
        const [rows] = await connection.query(query);
        console.table(rows);
    } catch (err) {
        console.error('Error fetching roles:', err);
    }
}

// Async function to view all employees
async function viewAllEmployees() {
    try {
        const query = `
            SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, 
            CONCAT(m.first_name, ' ', m.last_name) AS manager_name
            FROM employee e
            LEFT JOIN roles r ON e.role_id = r.id
            LEFT JOIN departments d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id`;
        const [rows] = await connection.query(query);
        console.table(rows);
    } catch (err) {
        console.error('Error fetching employees:', err);
    }
}

// Async function to add a department
async function addDepartment() {
    try {
        const answer = await inquirer.prompt({
            type: "input",
            name: "name",
            message: "Enter the name of the new department:"
        });

        const query = `INSERT INTO departments (department_name) VALUES (?)`;
        await connection.query(query, [answer.name]);
        console.log(`Added department ${answer.name} to the database!`);
    } catch (err) {
        console.error('Error adding department:', err);
    }
}

// Async function to add a role
async function addRole() {
    try {
        const [departments] = await connection.query("SELECT * FROM departments");
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Enter the title of the new role:"
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the salary of the new role:"
            },
            {
                type: "list",
                name: "department",
                message: "Select the department for the new role:",
                choices: departments.map(dept => dept.department_name)
            }
        ]);

        const department = departments.find(dept => dept.department_name === answers.department);
        const query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
        await connection.query(query, [answers.title, answers.salary, department.id]);
        console.log(`Added role ${answers.title} to the database!`);
    } catch (err) {
        console.error('Error adding role:', err);
    }
}

// Async function to add an employee
async function addEmployee() {
    try {
        const [roles] = await connection.query("SELECT id, title FROM roles");
        const rolesChoices = roles.map(role => ({ name: role.title, value: role.id }));

        const [managers] = await connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
        const managerChoices = [{ name: "No Manager", value: null }].concat(
            managers.map(manager => ({ name: manager.name, value: manager.id }))
        );

        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "Enter the employee's first name:"
            },
            {
                type: "input",
                name: "lastName",
                message: "Enter the employee's last name:"
            },
            {
                type: "list",
                name: "roleId",
                message: "Select the employee's role:",
                choices: rolesChoices
            },
            {
                type: "list",
                name: "managerId",
                message: "Select the employee's manager:",
                choices: managerChoices
            }
        ]);

        const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        await connection.query(sql, [answers.firstName, answers.lastName, answers.roleId, answers.managerId || null]);
        console.log("Employee added successfully");
    } catch (err) {
        console.error('Error adding employee:', err);
    }
}

// Async function to update an employee role
async function updateEmployeeRole() {
    try {
        const [employees] = await connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee");
        const [roles] = await connection.query("SELECT id, title FROM roles");

        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Select the employee to update:",
                choices: employees.map(emp => ({ name: emp.name, value: emp.id }))
            },
            {
                type: "list",
                name: "roleId",
                message: "Select the new role:",
                choices: roles.map(role => ({ name: role.title, value: role.id }))
            }
        ]);

        const updateQuery = "UPDATE employee SET role_id = ? WHERE id = ?";
        await connection.query(updateQuery, [answers.roleId, answers.employeeId]);
        console.log('Employee role updated successfully.');
    } catch (err) {
        console.error('Error updating employee role:', err);
    }
}

// Starting the application with a connection to the database
initializeDatabase().then(connection => {
    global.connection = connection; // Making connection globally available
    cfonts.say('Jane Austen Tech Co\nEmployee Tracker', {
        font: 'chrome',
        align: 'left',
        colors: ['red'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
        gradient: false,
        independentGradient: false,
        transitionGradient: false,
        env: 'node'
    });
    start();
}).catch(err => {
    console.error('Failed to start application:', err);
});