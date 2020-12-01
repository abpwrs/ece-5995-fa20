-- Find the review count and averageRating per gender for each product. 
-- Show productid, gender, count, and average rating.

SELECT productid, gender, SUM(reviewCount) AS review_count, AVG(score) AS avg_rating
FROM reviews 
INNER JOIN user_stats ON (reviews.userid = user_stats.userid)
INNER JOIN users ON (reviews.userid = users.userid)
WHERE
    productid = 'B004JRKEH4' OR
    productid = 'B004X3VRLG' OR 
    productid = 'B0026RQTGE' OR
    productid = 'B001BM3C0Q' OR
    productid = 'B007K449CE'
GROUP BY productid, gender;