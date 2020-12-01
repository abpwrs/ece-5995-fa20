-- create prod_review table
CREATE TABLE prod_review (
    productid character(20),
    allreviews text,
    numreviews int,
    processed text,
    metaphone_processed text,
    wordlist tsvector,
    tags varchar []
);
-- start populating prod_review table
INSERT INTO prod_review (productid, numreviews, allreviews)
SELECT productid,
    count(*) AS numreviews,
    STRING_AGG (
        r.summary || ' ' || r.review,
        ','
        ORDER BY r.summary,
            r.review
    ) AS allreviews
FROM reviews r
GROUP BY productid;
UPDATE prod_review
SET processed = REGEXP_REPLACE(allreviews, '[^\w\s]', ' ', 'g');
UPDATE prod_review
SET metaphone_processed = REGEXP_REPLACE(processed, '[^\w\s]', ' ', 'g');
-- create and configure dictionary
CREATE TEXT SEARCH DICTIONARY simple_english (
    template = snowball,
    language = english,
    stopwords = english
);
CREATE TEXT SEARCH CONFIGURATION simple_english (copy = english);
-- create wordlist
UPDATE prod_review
SET wordlist = to_tsvector('simple_english', processed);
-- create word stats
CREATE TABLE word_stats AS
SELECT *
FROM ts_stat('SELECT wordlist FROM prod_review')
ORDER BY ndoc DESC,
    nentry DESC,
    word;
-- creat tags
UPDATE prod_review
SET tags = ARRAY(
        SELECT word
        FROM ts_stat(
                'SELECT wordlist
            FROM prod_review psd
            WHERE productid = ''' || productid || ''''
            )
        ORDER BY nentry DESC,
            ndoc DESC,
            word
        LIMIT 5
    );
-- create coffee_prods table
CREATE TABLE coffee_prods (productid character(20), allreviews text);
-- query for coffee related products store in coffee_prods
INSERT INTO coffee_prods (productid, allreviews)
SELECT productid,
    allreviews
FROM prod_review
WHERE to_tsvector(tags::text) @@ to_tsquery('english', '(coffe | coffee | decaf) & ! tea');

-- Task 2
-- coffe avg query
SELECT ageGroup,
    gender,
    SUM(reviewCount) AS review_count,
    AVG(score) as avg_rating
FROM coffee_prods
    INNER JOIN reviews ON (reviews.productid = coffee_prods.productid)
    INNER JOIN user_stats ON (user_stats.userid = reviews.userid)
    INNER JOIN users ON (users.userid = user_stats.userid)
GROUP BY ageGroup,
    gender;
-- all products avg query
SELECT ageGroup,
    gender,
    SUM(reviewCount) AS review_count,
    AVG(score) as avg_rating
FROM reviews
    INNER JOIN user_stats ON (user_stats.userid = reviews.userid)
    INNER JOIN users ON (users.userid = user_stats.userid)
GROUP BY ageGroup,
    gender;

-- Task 3
-- group by dposted year month
select *
from crosstab(
        'SELECT date_part(''year'', dposted) AS year, date_part(''month'', dposted) AS month, SUM(id) AS review_count
    FROM reviews
    GROUP BY date_part(''year'', dposted), date_part(''month'', dposted)
    ORDER BY 1',
        'select m from generate_series(1,12) m'
    ) as (
        year int,
        "Jan" int,
        "Feb" int,
        "Mar" int,
        "Apr" int,
        "May" int,
        "Jun" int,
        "Jul" int,
        "Aug" int,
        "Sep" int,
        "Oct" int,
        "Nov" int,
        "Dec" int
    );