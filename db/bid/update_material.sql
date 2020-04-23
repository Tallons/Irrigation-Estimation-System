
-- UPDATE bid
-- SET $1 = $2
-- WHERE bid_line = $3;

DO
$$
BEGIN
EXECUTE
    format('UPDATE bid SET %I = %L WHERE bid_line = %L', $1,  $2, $3);
END;
$$ LANGUAGE plpgsql;
