SELECT bid_id, bid_name, job_number, bid_location FROM bids
WHERE user_id = $1
ORDER BY bid_id ASC;