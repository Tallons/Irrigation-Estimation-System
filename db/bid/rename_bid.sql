UPDATE bids
SET bid_name = $1, job_number = $2, bid_location = $3
WHERE bid_id = $4;