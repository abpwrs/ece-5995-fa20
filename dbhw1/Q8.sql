-- Find the most helpful, highest rated review and the most helpful, lowest rated review for each product. 
-- Show the full  review (productid, userid, helpfulnessnumerator, helpfulnessdenominator, score, dposted, summary, review). 

-- best
SELECT DISTINCT ON (productid) productid, userid, helpfulnessnumerator, helpfulnessdenominator, score, dposted, summary, review
FROM reviews r
WHERE
    productid = 'B004JRKEH4' OR
    productid = 'B004X3VRLG' OR 
    productid = 'B0026RQTGE' OR
    productid = 'B001BM3C0Q' OR
    productid = 'B007K449CE'
ORDER BY productid,
CASE 
WHEN helpfulnessdenominator = 0 THEN 0
WHEN helpfulnessdenominator != 0 THEN helpfulnessnumerator::numeric/NULLIF(helpfulnessdenominator::numeric,0) 
END DESC NULLS LAST, score DESC NULLS LAST, helpfulnessdenominator DESC NULLS LAST;

-- worst
SELECT DISTINCT ON (productid) productid, userid, helpfulnessnumerator, helpfulnessdenominator, score, dposted, summary, review
FROM reviews r
WHERE
    productid = 'B004JRKEH4' OR
    productid = 'B004X3VRLG' OR 
    productid = 'B0026RQTGE' OR
    productid = 'B001BM3C0Q' OR
    productid = 'B007K449CE'
ORDER BY productid,
CASE 
WHEN helpfulnessdenominator = 0 THEN 0
WHEN helpfulnessdenominator != 0 THEN helpfulnessnumerator::numeric/NULLIF(helpfulnessdenominator::numeric,0) 
END DESC NULLS LAST, score ASC NULLS LAST, helpfulnessdenominator DESC NULLS LAST;
