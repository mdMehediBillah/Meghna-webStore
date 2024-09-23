import express from "express";
const productRouter = express.Router();

// Import controller methods
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controlers/productControler.js";

// Define routes and their handlers
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
