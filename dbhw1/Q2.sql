-- The number of males/females users per age group. 
SELECT ageGroup, gender, count(*)
FROM users INNER JOIN user_stats ON (users.userid = user_stats.userid)
GROUP BY ageGroup, gender;
