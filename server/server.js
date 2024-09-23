//rLq2Nh4mE2k1FwjP

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth-route");
const adminRouter = require("./routes/admin-router");

mongoose
  .connect("mongodb+srv://am27043:rLq2Nh4mE2k1FwjP@cluster0.kc0s8.mongodb.net/")
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminRouter);

app.listen(PORT, () => {
  console.log(`server is now running on port ${PORT}`);
});
