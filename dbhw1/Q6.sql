-- Find the review count and averageRating per ageGroup for each product. 
-- Show productid, ageGroup, reviewCount, and averageRating.
SELECT productid, ageGroup, SUM(reviewCount) AS review_count, AVG(score) AS avg_rating
FROM reviews INNER JOIN user_stats ON (reviews.userid = user_stats.userid)
WHERE
    productid = 'B004JRKEH4' OR
    productid = 'B004X3VRLG' OR 
    productid = 'B0026RQTGE' OR
    productid = 'B001BM3C0Q' OR
    productid = 'B007K449CE'
GROUP BY productid, ageGroup;