SELECT mt.material_id, m.material_name, m. material_type, task_type FROM materials_tasks mt
   JOIN materials m ON m.material_id = mt.material_id
   JOIN tasks t ON t.task_id = mt.task_id
      WHERE mt.material_id = $1;