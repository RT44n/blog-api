const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const compression = require("compression");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();

// Mongoose configuration
mongoose.set("strictQuery", false);
const dev_db_url = process.env.MONGO_DB_DEV;
const prod_db_url = process.env.MONGO_DB_PROD;

const mongoDB = prod_db_url || dev_db_url;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB)
}

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cors());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);

// Define API routes
app.use("/api", indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

app.listen(3000, () => console.log("App listening on port 3000!"));
