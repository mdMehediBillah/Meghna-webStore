import express from "express";
const categoriesRouter = express.Router();

// Import controller methods
import {
  // getProducts,
  // getProductById,
  createCategory,
  getCategories,
} from "../controlers/categoriesController.js";

// Define routes and their handlers
categoriesRouter.post("/", createCategory);
categoriesRouter.get("/", getCategories);

export default categoriesRouter;
