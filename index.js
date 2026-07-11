const express = require("express");
const app = express();

const adminRouter = require("./src/routes/admin.routes.js");
const signupRouter = require("./src/routes/register.routes.js");
const pgRouter = require("./src/routes/pg.routes.js");
const { authenticationMiddleware } = require("./src/middleware/authMiddleware.js");

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(authenticationMiddleware);
app.use("/auth", signupRouter);
app.use("/admin", adminRouter);
app.use("/pg", pgRouter);

const connectiondb = require('./connection');

connectiondb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
