const mongoose = require("mongoose");
const { RegistrationModel } = require("./../models/pgRegistrationModel");

const pgRegistrationController = () => async (req, res) => {
  // fetch pg_name, pg_owner, pg_status => active/inactive, pg_ratings,
  // pg_type => MALE, FEMALE, BOTH, pg_state, pg_country, pg_latitude, pg_longitude
  const validateData = req.body;
  try {
    const model = await RegistrationModel.create(validateData);

    await model.save();

    res.send({ data: model });

    return;
  } catch (error) {
    res.status(500).json({ errorCode: "500", message: error.message });
    return;
  }
};

const pgListAllController = () => async (req, res) => {
  try {
    const model = mongoose.model("pg-registation");

    const pgResult = await model.find();

    return res.send({ data: pgResult });
  } catch (error) {
    return res.status(500).json({ errorCode: "500", message: error.message });
  }
};

const pgViewController = () => async (req, res) => {
  //   try {
  //     // const stmt = await openDb.run("SELECT * FROM pg_listings;", (stmt, err) => {
  //     //   console.log(stmt);
  //     // });
  //     const rows = await openDb.all("SELECT * FROM pg_listings");
  //     const count = await openDb.get("SELECT COUNT(*) as total FROM pg_listings");
  //     const tables = await openDb.all(`
  //   SELECT name
  //   FROM sqlite_master
  //   WHERE type='table'
  // `);
  //     console.log(tables, "TTT");
  //     console.log(count, "FFF");
  //     // const result = await stmt.run([]);
  //     // await stmt.finalize();
  //     console.log(rows, "stmt");
  //     res.send({ data: rows });
  //     return;
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ errorCode: "500", message: error.message });
  //     return;
  //   }
};

module.exports = {
  pgRegistrationController,
  pgViewController,
  pgListAllController,
};
