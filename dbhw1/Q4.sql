--Who writes the most helpful reviews? (Full name, email, gender, age, helfulnessrate, and helpfuldenum) - break the ties using the helpfulDenum.
SELECT CONCAT(firstname, ' ', lastname) AS fullname, email, AGE(dob) as u_age, helpfulnessRate, helpfulDenum
FROM users INNER JOIN user_stats ON (users.userid = user_stats.userid)
ORDER BY helpfulnessrate DESC NULLS LAST, helpfulDenum DESC
LIMIT 1;
