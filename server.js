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