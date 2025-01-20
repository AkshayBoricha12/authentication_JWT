const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Connection = require("./database/Db");
const PORT = 3000;
const authRoute = require("./routes/Route");

Connection();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", authRoute);
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
