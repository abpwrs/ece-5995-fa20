
-- create user_stats table
CREATE TABLE IF NOT EXISTS homework.user_stats (
    userid character(20) NOT NULL,
    ageGroup character(6), -- groupX
    averageRating decimal,
    reviewCount integer,
    lastPosted date,
    helpfulNum integer,
    helpfulDenum integer,
    helpfulnessRate decimal
);

-- create rule to update the user_stats table
CREATE
OR REPLACE FUNCTION update_user_stats(
    input_userid character(20)
) RETURNS boolean AS $did_insert$ 
DECLARE 
did_insert boolean := false;
the_user_id text;
the_user_age integer;
local_ageGroup character(6); -- groupX
local_averageRating decimal;
local_reviewCount integer;
local_lastPosted date;
local_helpfulNum integer;
local_helpfulDenum integer;
local_helpfulnessRate decimal;
BEGIN
    -- determine if the user is already in the user_stats table
    SELECT userid INTO the_user_id
    FROM user_stats u
    WHERE u.userid = input_userid
    LIMIT 1;

    -- compute all of the attributes
    -- compute ageGroup
    SELECT date_part('year', age(dob)) INTO the_user_age
    FROM users u
    WHERE u.userid = input_userid
    LIMIT 1;

    IF the_user_age < 30 THEN
        local_ageGroup := 'group1';
    ELSEIF 30 <= the_user_age AND the_user_age <= 50 THEN
        local_ageGroup := 'group2';
    ELSEIF the_user_age > 50 THEN
        local_ageGroup := 'group3';
    ELSE
        local_ageGroup := NULL;
    END IF;

    -- NOTE: THERE IS 1000000% a better way to do this than repeatedly querying the reviews table
    -- TODO: if time return and consolidate computation of user_stats

    -- compute averageRating
    SELECT AVG(score) INTO local_averageRating
    FROM reviews r
    WHERE r.userid = input_userid;

    -- compute reviewCount
    SELECT COUNT(*) INTO local_reviewCount
    FROM reviews r
    WHERE r.userid = input_userid;

    -- compute lastPosted
    SELECT dposted INTO local_lastPosted
    FROM reviews r
    WHERE r.userid = input_userid
    ORDER BY dposted DESC
    LIMIT 1;

    -- compute helpfulNumiewCount
    SELECT SUM(helpfulnessnumerator) INTO local_helpfulNum
    FROM reviews r
    WHERE r.userid = input_userid;

    -- compute helpfulDenum
    SELECT SUM(helpfulnessdenominator) INTO local_helpfulDenum
    FROM reviews r
    WHERE r.userid = input_userid;

    if local_helpfulDenum = 0 THEN 
        local_helpfulnessRate := 0;
    ELSE
        local_helpfulnessRate := local_helpfulNum::NUMERIC / local_helpfulDenum::NUMERIC;
    END IF;


    IF the_user_id IS NULL THEN -- create new user_stats
        INSERT INTO
            user_stats (userid, ageGroup, averageRating, reviewCount, lastPosted, helpfulNum, helpfulDenum, helpfulnessRate)
        VALUES
            (input_userid, local_ageGroup, local_averageRating, local_reviewCount, local_lastPosted, local_helpfulNum, local_helpfulDenum, local_helpfulnessRate) RETURNING userid INTO the_user_id;

        did_insert := true;

    ELSE -- update existing user_stats
        UPDATE 
            user_stats
        SET ageGroup = local_ageGroup, averageRating = local_averageRating, reviewCount = local_reviewCount, lastPosted = local_lastPosted, helpfulNum = local_helpfulNum, helpfulDenum = local_helpfulDenum, helpfulnessRate = local_helpfulnessRate
        WHERE
            userid = input_userid;
    END IF;

    RETURN did_insert;

END;

$did_insert$ LANGUAGE plpgsql;

SELECT update_user_stats(userid) from users;
