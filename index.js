const express = require("express");
const app = require("express")();
const mongoose = require("mongoose");

const pgRegistrationRouter = require("./src/routes/index");
const pgPostRequestBodyValidator = require("./src/middleware/requestValidator");

app.use(express.json());
app.use("/", pgPostRequestBodyValidator, pgRegistrationRouter);

mongoose
  .connect(
    "mongodb+srv://ankesh:ankesh123@ankesh.g5iur.mongodb.net/?appName=ankesh",
    { dbName: "test-db" },
  )
  .then(() => {
    console.log("database connected succesfully!!");
  })
  .catch((err) => {
    console.log("database connection error: ", err);
  });

app.listen(3005, () => {
  console.log(`Application is running on http://localhost:3005`);
});
