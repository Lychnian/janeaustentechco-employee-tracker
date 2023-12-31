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
