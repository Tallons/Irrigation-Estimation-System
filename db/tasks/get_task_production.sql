SELECT material_id, task_type, p.production_id, production_type, production_rate FROM tasks t
   JOIN materials_tasks mt ON mt.task_id = t.task_id
   JOIN tasks_production tp ON tp.task_id = t.task_id
   JOIN production p ON p.production_id = tp.production_id
      WHERE t.task_id = $1;