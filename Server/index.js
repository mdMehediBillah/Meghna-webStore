import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./database/index.js"; // Ensure this path correctly points to your database connection file

dotenv.config(); // Load environment variables

const app = express(); // Initialize the Express app

// Use CORS middleware
app.use(cors({ origin: "*" })); // Change to cors() for all origins if needed

app.use(express.json()); // Parse JSON request bodies

// Import Routers
import productRouter from "./routes/productRoutes.js";
import categoriesRouter from "./routes/categoriesRouter.js";

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoriesRouter);

// Testing route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Catch-all route for invalid endpoints
app.get("/*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// App listening port
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
