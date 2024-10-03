import express from "express";
const categoriesRouter = express.Router();

// Import controller methods
import {
  // getProducts,
  // getProductById,
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} from "../controlers/categoriesController.js";

// Define routes and their handlers
categoriesRouter.post("/", createCategory);
categoriesRouter.get("/", getCategories);
categoriesRouter.get("/:id", getCategoryById);
categoriesRouter.delete("/:id", deleteCategory);
categoriesRouter.put("/:id", updateCategory);

export default categoriesRouter;
