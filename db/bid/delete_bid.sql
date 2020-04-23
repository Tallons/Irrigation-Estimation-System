DELETE FROM bids
WHERE bid_id = $1;
DELETE FROM bid
WHERE bid_id = $1;