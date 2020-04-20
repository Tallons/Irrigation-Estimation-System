SELECT job_number, bid_location, bid_name FROM bids
WHERE bid_id = $1;