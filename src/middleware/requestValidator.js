const pgPostRequestBodyValidator = (req, res, next) => {
  const { pg_name, pg_owner, pg_state, pg_country, pg_latitude, pg_longitude } =
    req.body;

  const errors = [];

  if (!pg_name) errors.push("pg_name is required");
  if (!pg_owner) errors.push("pg_owner is required");
  if (!pg_state) errors.push("pg_state is required");
  if (!pg_country) errors.push("pg_country is required");
  if (pg_latitude === undefined || pg_latitude === null || pg_latitude === "") {
    errors.push("pg_latitude is required");
  }
  if (pg_longitude === undefined || pg_longitude === null || pg_longitude === "") {
    errors.push("pg_longitude is required");
  }

  if (!Number.isFinite(Number(pg_latitude)) || Number(pg_latitude) < -90 || Number(pg_latitude) > 90) {
    errors.push("pg_latitude must be between -90 and 90");
  }

  if (!Number.isFinite(Number(pg_longitude)) || Number(pg_longitude) < -180 || Number(pg_longitude) > 180) {
    errors.push("pg_longitude must be between -180 and 180");
  }

  if (errors.length) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

module.exports = pgPostRequestBodyValidator;
