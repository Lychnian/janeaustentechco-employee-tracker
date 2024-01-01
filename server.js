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
            case "Exit":
                console.log("Goodbye! Have a nice day!");
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

