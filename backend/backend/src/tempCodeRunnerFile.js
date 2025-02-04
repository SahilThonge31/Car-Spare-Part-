const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 6000;
app.listen(port, (error) => {
  if (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
  console.log(`Server running at http://localhost:${port}`);
});