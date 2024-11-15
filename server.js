const express = require("express");

const connectDB = require("./db");
connectDB();

const app = express();
app.use(express.json({ extended: false }));

const cors = require("cors");
app.use(cors());

//routes
const user = require("./routes/userRoute");
const verify = require("./routes/verifyRoute");
const project = require("./routes/projectRoute");
const tag = require("./routes/tagRoute");
const vnpay = require("./routes/vnpayRoute");
//using
app.use(user);
app.use(verify);
app.use(project);
app.use(tag);
app.use(vnpay);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
