const express = require("express");
const app = express();
const mongoose = require("mongoose");
const AuthRouter = require("./routes/auth");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

const EmloyeeRouter = require("./routes/employee");
const ProductRouter = require("./routes/product");

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "14MB" }));
app.use("/uploads", express.static("uploads"));

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECT_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", function () {
    console.log("Mongo Database connected!!!");
  })
  .on("error", function (error) {
    console.error("Could not connect to MongoDB: " + error);
  });

app.use("/api/employee", EmloyeeRouter);
app.use("/api/product", ProductRouter);
app.use("/api", AuthRouter);

app.get("/", function (req, res) {
  res.send("hello");
  //res.render("home");
});

app.listen(process.env.PORT, function () {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
