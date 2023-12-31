-- Drop the existing database if it exists. This is useful for resetting the database.
DROP DATABASE IF EXISTS janeausten_techco_employee_db;

-- Create a new database for the application.
CREATE DATABASE janeausten_techco_employee_db;

-- Select the newly created database for subsequent operations.
USE janeausten_techco_employee_db;

-- Create a table for departments.
-- Each department has a unique ID and a name.
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each department.
    department_name VARCHAR(255) NOT NULL       -- Name of the department.
);

-- Create a table for roles within the company.
-- Each role has an ID, title, salary, and is associated with a department.
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each role.
    title VARCHAR(255),                         -- Title of the role.
    salary DECIMAL(10,2),                       -- Salary for the role.
    department_id INT,                          -- ID of the department this role belongs to.
    FOREIGN KEY (department_id)                 -- Establishing a foreign key relationship with departments.
        REFERENCES departments(id)
        ON DELETE SET NULL                      -- If a department is deleted, set the department_id in roles to NULL.
);

-- Create a table for employees.
-- Each employee has an ID, first and last name, role, and a manager.
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each employee.
    first_name VARCHAR(30) NOT NULL,            -- Employee's first name.
    last_name VARCHAR(30) NOT NULL,             -- Employee's last name.
    role_id INT,                                -- ID of the employee's role.
    manager_id INT,                             -- ID of the employee's manager.
    FOREIGN KEY (role_id)                       -- Establishing a foreign key relationship with roles.
        REFERENCES roles(id)
        ON DELETE SET NULL,                     -- If a role is deleted, set the role_id in employee to NULL.
    FOREIGN KEY (manager_id)                    -- Establishing a foreign key relationship for the manager.
        REFERENCES employee(id)
        ON DELETE SET NULL                      -- If a manager is deleted, set the manager_id in employee to NULL.
);