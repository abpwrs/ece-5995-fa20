--  The number of users' birthdays per month 
SELECT date_part('month', dob) AS  dob_month, COUNT(userid) AS user_count
FROM users
GROUP BY dob_month
ORDER BY dob_month ASC;

