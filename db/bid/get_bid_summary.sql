
SELECT bid_id, material_type, material_quantity, unit_cost, task_type, production_type, production_rate FROM bid b
   JOIN materials m ON m.material_id = b.material_id
   JOIN materials_tasks mt ON mt.material_id = m.material_id
   JOIN tasks t ON t.task_id = mt.task_id
   JOIN tasks_production tp ON tp.task_id = t.task_id
   JOIN production p ON p.production_id = tp.production_id
      WHERE bid_id = $1;