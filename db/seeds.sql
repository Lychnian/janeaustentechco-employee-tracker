-- Inserting data into the 'departments' table
-- This will create four departments: Executive, Engineering, Development, and Machine Learning.
INSERT INTO departments (department_name)
VALUES
    ("Executive"),              -- CEO Jane Austen's department
    ("Engineering"),            -- Engineering department
    ("Development"),            -- Development department
    ("Machine Learning");       -- Machine Learning department

-- Inserting data into the 'roles' table
-- This section creates various roles within the company, assigns them a salary, and associates them with a department.
-- The 'department_id' field is used to link each role to a specific department.
INSERT INTO roles (title, salary, department_id)
VALUES
    ("Chief Executive Officer", 650000, 1),                                 -- Jane Austen
    ("Vice President of Computer Engineering and Development", 500000, 1),  -- Fitzwilliam Darcy
    ("Director of Engineering", 300000, 2),                                 -- Elizabeth Bennet
    ("Director of Development", 300000, 3),                                 -- Edward Ferrars
    ("Director of Machine Learning", 350000, 4),                            -- Elinor Dashwood
    ("Manager of Engineering", 200000, 2),                                  -- George Knightley
    ("Manager of Development", 200000, 3),                                  -- Emma Woodhouse
    ("Manager of Machine Learning Engineering", 250000, 4),                 -- Colonel Brandon
    ("Sr. Software Engineer", 160000, 2),                                   -- Marianne Dashwood
    ("Sr. Software Developer", 160000, 3),                                  -- John Willoughby
    ("Sr. Machine Learning Engineer", 185000, 4),                           -- Catherine de Bourgh
    ("Software Engineer", 125000, 2),                                       -- Charles Bingley
    ("Software Engineer", 125000, 2),                                       -- Jane Bennet 
    ("Software Developer", 125000, 3),                                      -- William Collins
    ("Software Developer", 125000, 3),                                      -- Charlotte Lucas 
    ("Machine Learning Engineer", 140000, 4),                               -- Frank Churchill
    ("Machine Learning Engineer", 140000, 4),                               -- Jane Fairfax 
    ("Jr. Software Engineer", 85000, 2),                                    -- Thomas Palmer
    ("Jr. Software Engineer", 85000, 2),                                    -- Lucy Steele 
    ("Jr. Front-End Developer", 85000, 3),                                  -- Robert Martin
    ("Jr. Back-End Developer", 85000, 3),                                   -- Harriet Smith
    ("Jr. Machine Learning Engineer", 100000, 4),                           -- Philip Elton
    ("Jr. Machine Learning Engineer", 100000, 4);                           -- Anne Taylor 

-- Inserting data into the 'employee' table
-- This adds employees with their first and last names, assigns them a role and a manager.
-- 'role_id' links the employee to a specific role in the 'roles' table.
-- 'manager_id' indicates who manages this employee, referencing another employee's ID.
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Jane", "Austen", 1, NULL),            -- Chief Executive Officer with no manager, so manager_id is NULL
    ("Fitzwilliam", "Darcy", 2, 1),         -- Vice President of Computer Engineering and Development, Manager Jane Austen
    ("Elizabeth", "Bennet", 3, 2),          -- Director of Engineering, Manager Fitzwilliam Darcy
    ("Edward", "Ferrars", 4, 2),            -- Director of Development, Manager Fitzwilliam Darcy
    ("Elinor", "Dashwood", 5, 2),           -- Director of Machine Learning, Manager Fitzwilliam Darcy
    ("George", "Knightley", 6, 3),          -- Manager of Engineering, Manager Elizabeth Bennet
    ("Emma", "Woodhouse", 7, 4),            -- Manager of Development, Manager Edward Ferrars
    ("Colonel", "Brandon", 8, 5),           -- Manager of Machine Learning Engineering, Manager Elinor Dashwood
    ("Marianne", "Dashwood", 9, 6),         -- Sr. Software Engineer, Manager George Knightley
    ("John", "Willoughby", 10, 7),         -- Sr. Software Developer, Manager Edward Ferrars
    ("Catherine", "de Bourgh", 11, 8),     -- Sr. Machine Learning Engineer, Manager Elinor Dashwood
    ("Charles", "Bingley", 12, 6),         -- Software Engineer, Manager George Knightley
    ("Jane", "Bennet", 13, 6),             -- Software Engineer, Manager George Knightley
    ("William", "Collins", 14, 7),         -- Software Developer, Manager Emma Woodhouse
    ("Charlotte", "Lucas", 15, 7),         -- Software Developer, Manager Emma Woodhouse
    ("Frank", "Churchill", 16, 8),         -- Machine Learning Engineer, Manager Colonel Brandon
    ("Jane", "Fairfax", 17, 8),            -- Machine Learning Engineer, Manager Colonel Brandon
    ("Thomas", "Palmer", 18, 6),           -- Jr. Software Engineer, Manager George Knightley
    ("Lucy", "Steele", 19, 6),             -- Jr. Software Engineer, Manager George Knightley
    ("Robert", "Martin", 20, 7),           -- Jr. Front-End Developer, Manager Emma Woodhouse
    ("Harriet", "Smith", 21, 7),           -- Jr. Back-End Developer, Manager Emma Woodhouse
    ("Philip", "Elton", 22, 8),            -- Jr. Machine Learning Engineer, Manager Colonel Brandon
    ("Anne", "Taylor", 23, 8);             -- Jr. Machine Learning Engineer, Manager Colonel Brandon