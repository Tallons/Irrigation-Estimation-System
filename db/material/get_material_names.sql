SELECT * FROM materials
WHERE material_type = $1
ORDER BY material_type ASC;