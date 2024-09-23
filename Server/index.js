import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./database/index.js"; // Ensure this path correctly points to your database connection file

// Import Routers
import productRouter from "./routes/productRoutes.js";
import categoriesRouter from "./routes/categoriesRouter.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoriesRouter);

// Testing route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Catch-all route for invalid endpoints
app.get("/*", (req, res) => {
  res.status(404).send("Wrong URL");
});

// App listening port
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
