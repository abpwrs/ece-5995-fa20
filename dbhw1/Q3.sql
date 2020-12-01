-- Who had posted the most reviews? (Full name, email, gender, age, reviewcount)
SELECT CONCAT(firstname, ' ', lastname) AS fullname, email, AGE(dob) as u_age, reviewCount
FROM users INNER JOIN user_stats ON (users.userid = user_stats.userid)
ORDER BY reviewCount DESC
LIMIT 1;