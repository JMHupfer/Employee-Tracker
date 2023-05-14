INSERT INTO department(id, dep_name)
VALUES (1, 'Sacred Heart Hospital');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Surgeon', 120000.00, 1),
       (2, 'Medical Doctor', 110000.00, 1),
       (3, 'Nurse', 70000.00, 1),
       (4, 'Lawyer', 45000.00, 1),
       (5, 'Janitor', 30000.00, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Christopher', 'Turk', 1, NULL),
       (2, 'The', 'Todd', 1, NULL),
       (3, 'John', 'Dorian', 2, NULL),
       (4, 'Perry', 'Cox', 2, 1),
       (5, 'Carla', 'Espinoza', 3, 1),
       (6, 'Laverne', 'Robers', 3, NULL),
       (7, 'Tedd', 'Buckland', 4, NULL),
       (8, 'Janitor', '', 5, NULL);