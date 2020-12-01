-- Who posted last? (Full name, email, gender, age, and lastposted)
SELECT CONCAT(firstname, ' ', lastname) AS fullname, email, AGE(dob) as u_age, lastPosted
FROM users INNER JOIN user_stats ON (users.userid = user_stats.userid)
ORDER BY lastPosted DESC NULLS LAST
LIMIT 1;
