require("dotenv").config();
const source = process.env.DB;
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset.js");
const updateProfileRoutes = require("./routes/updateProfile.js");
const cropRecommendationRoutes = require("./routes/cropRec.js");
const notesRoutes = require("./routes/notes.js");


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/update-profile", updateProfileRoutes);
app.use("/api/crop-recommendation", cropRecommendationRoutes);
app.use("/api/notes", notesRoutes);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));


