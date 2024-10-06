const express = require("express");
const dotenv = require("dotenv").config();
require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes")
const userRoute = require("./routes/userRoutes")


const app = express();

//Middleware
app.use(express.json());

//Routes
app.use('/',authRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoute);

//Start the server
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
