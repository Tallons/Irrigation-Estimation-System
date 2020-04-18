INSERT INTO bids (user_id, bid_name)
VALUES ( $1, 'New Bid')
RETURNING bid_id;
