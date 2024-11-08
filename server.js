const express = require("express");

const connectDB = require("./db");
connectDB();

const app = express();
app.use(express.json({ extended: false }));

const cors = require("cors");
app.use(cors());

//routes
const user = require("./routes/userRoute");
//using
app.use(user);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
