SELECT bm.bid_id, bm.material_id, material_type, material_name, description, unit_cost FROM bids_materials bm
JOIN bids b ON b.bid_id = bm.bid_id
JOIN materials m ON m.material_id = bm.material_id
WHERE bm.bid_id = $1;