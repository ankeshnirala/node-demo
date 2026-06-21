const PG_LISTINGS_POST_QUERY = `
    INSERT INTO pg_listings (pg_name,pg_owner,pg_status,pg_ratings,pg_type, pg_state, pg_country, pg_latitude, pg_longitude)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
`;

const PG_LISTINGS_GET_QUERY = `
SELECT * FROM pg_listings;
`;

module.exports = { PG_LISTINGS_POST_QUERY };
