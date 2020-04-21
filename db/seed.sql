CREATE TABLE bids (
   bid_id SERIAL PRIMARY KEY,
   user_id INT REFERENCES users(user_id),
   bid_name VARCHAR(150),
   job_number DECIMAL, 
   -- bid_description
   job_location VARCHAR(250)
);

CREATE TABLE bid (
  bid_line SERIAL PRIMARY KEY,
  bid_id INT REFERENCES bids(bid_id),
  material_id INT REFERENCES materials(material_id),
  task_id INT REFERENCES tasks(task_id),
  material_quantity INT
);

INSERT INTO bids (bid_id, material_id, task_id, material_quantity)
VALUES (1, 1, 3, 1000), (1, 2, 2, 2), (1, 3, 3, 1000);

CREATE TABLE materials (
   material_id SERIAL PRIMARY KEY,
   material_type VARCHAR(150),
   material_name VARCHAR(150),
   description VARCHAR(250),
   unit_cost DECIMAL
);

    INSERT INTO materials (material_id, material_type, material_name, description, unit_cost)
         VALUES (0, NULL, NULL, NULL, 0);

   INSERT INTO materials (material_type, material_name, unit_cost)
      VALUES ('Pipe', '1 1/2" PVC Pipe', 0.45), ('Controller', 'SL 4800 Controller', 425),
      ('Pipe', '2" PVC Pipe', 0.65);


CREATE TABLE materials_tasks (
   material_id INT REFERENCES materials(material_id),
   task_id INT REFERENCES tasks(task_id)
   );

      INSERT INTO materials_tasks ( material_id, task_id)
      VALUES (1, 1), (2, 2), (1, 3);

SELECT material_quantity, material_type, material_name, description,task_type, unit_cost FROM materials_tasks mt
   JOIN materials m ON m.material_id = mt.material_id
   JOIN tasks t ON t.task_id = mt.task_id
      WHERE t.task_type = 'Main Line Install';

      SELECT material_type, material_name, description,task_type, unit_cost FROM materials_tasks mt
   JOIN materials m ON m.material_id = mt.material_id
   JOIN tasks t ON t.task_id = mt.task_id
      WHERE mt.material_id = 1;

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    task_type VARCHAR(150)
    );
   INSERT INTO tasks (task_id, task_type)
         VALUES (0, NULL);
   INSERT INTO tasks (task_type)
         VALUES ('Main Line Install'), ('Controller Install');

CREATE TABLE tasks_production (
    task_id INT REFERENCES tasks(task_id),
    production_id INT REFERENCES production(production_id)
    );

    SELECT * FROM tasks_production tp
JOIN tasks t ON t.task_id = tp.task_id
JOIN production p ON p.production_id = tp.production_id
WHERE t.task_type = 'Main Line Install';

CREATE TABLE production (
    production_id SERIAL PRIMARY KEY,
    production_type VARCHAR(150),
    production_rate DECIMAL
    );
   
   INSERT INTO production (production_type, production_rate)
VALUES ('Trench', 100), ('Fit Pipe', 100), ('Backfill', 200),
('Mount', 1), ('Wire', 1), ('Program', 2),('System Test', 1);

--*********************************************** 
bid_id, material_type, material_name, description, unit_cost, material_quantity,task_type,production_type, production_rate
SELECT * FROM bids_Materials bm
    JOIN materials m ON m.material_id = bm.material_id
    JOIN materials_tasks mt ON mt.material_id = m.material_id
    JOIN tasks t ON t.task_id = mt.task_id
    JOIN tasks_production tp ON tp.task_id = t.task_id
    JOIN production p ON p.production_id = tp.production_id
WHERE bid_id = 1 AND material_name = '1 1/2" PVC Pipe';
--*********************************************** 

INSERT INTO bids ( user_id, job_number, location)
VALUES (1, 3250.001, 'Arizona');
 

SELECT * FROM bids b
JOIN users u ON b.user_id = u.user_id
WHERE location = 'Arizona';