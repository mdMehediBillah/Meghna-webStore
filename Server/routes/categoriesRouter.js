import express from "express";
const categoriesRouter = express.Router();

// Import controller methods
import {
  // getProducts,
  // getProductById,
  createCategory,
  getCategories,
  getCategoryById,
} from "../controlers/categoriesController.js";

// Define routes and their handlers
categoriesRouter.post("/", createCategory);
categoriesRouter.get("/", getCategories);
categoriesRouter.get("/:id", getCategoryById);

export default categoriesRouter;
