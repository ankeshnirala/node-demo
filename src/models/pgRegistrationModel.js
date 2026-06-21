const mongoose = require("mongoose");

// pg_name, pg_owner, pg_status => active/inactive, pg_ratings,
// pg_type => MALE, FEMALE, BOTH, pg_state, pg_country, pg_latitude, pg_longitude
const registationSchema = new mongoose.Schema({
  pg_name: String,
  pg_owner: String,
  pg_status: { default: "active", type: String },
  pg_ratings: { default: "0.0", type: String },
  pg_type: { default: "MALE", type: String },
  pg_state: String,
  pg_country: String,
  pg_latitude: String,
  pg_longitude: String,
});

const RegistrationModel = mongoose.model("pg-registation", registationSchema);

module.exports = { RegistrationModel };
