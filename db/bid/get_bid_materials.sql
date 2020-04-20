SELECT b.bid_id, bid_line, b.material_id, b.task_id, task_type, material_quantity, material_type, material_name, description, unit_cost FROM bid b
JOIN bids bi ON bi.bid_id = b.bid_id
JOIN materials m ON m.material_id = b.material_id
JOIN tasks t ON t.task_id = b.task_id
WHERE b.bid_id = $1;