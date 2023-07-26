const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const loginRoute = require("./Routes/loginRoute");
const { isAuthenticated } = require("./config/helper")

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/auth', loginRoute)

app.get("/protected", isAuthenticated, (req, res) => {
  res.json({
    success: true, msg: "Welcome user!!", email: req.email
  });
});


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const server = app.listen(port, () => {
  console.log(`Server is running: ${port}`);
});


module.exports = { app };