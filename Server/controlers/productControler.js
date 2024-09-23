// import createError from "http-errors";
import Product from "../models/productModel/index.js";
import Category from "../models/categoryModel/index.js";
import mongoose from "mongoose";

// @desc Get all products
// @route GET /api/v1/products
// @access Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// @desc Get a single product by ID
// @route GET /api/v1/products/:id
// @access Public
export const getProductById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// @desc Create a new product
// @route POST /api/v1/products
// @access Private (requires authentication, to be implemented later)
export const createProduct = async (req, res) => {
  try {
    // Extract product details from request body
    const {
      brandName,
      title,
      description,
      category,
      sizes,
      stock,
      image,
      isNewArrival,
      isWeeklyOffer,
      isVegan,
      isLactosFree,
      isGlutenFree,
      offer,
    } = req.body;

    // Validate sizes
    if (!Array.isArray(sizes) || sizes.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one size must be provided." });
    }

    // Calculate discount price if discount percentage is given
    let calculatedDiscountPrice = 0;

    if (offer.discountPercentage > 0) {
      const lowestSizePrice = Math.min(...sizes.map((size) => size.price));
      calculatedDiscountPrice =
        (lowestSizePrice * (100 - offer.discountPercentage)) / 100;
      calculatedDiscountPrice = parseFloat(calculatedDiscountPrice.toFixed(2)); // Round to 2 decimal places
    }

    // Create new product instance
    const newProduct = new Product({
      brandName,
      title,
      description,
      category,
      sizes: sizes.map((size) => ({
        value: size.value,
        unit: size.unit,
        price: size.price,
      })),
      stock,
      image,
      isNewArrival,
      isWeeklyOffer,
      isVegan,
      isLactosFree,
      isGlutenFree,
      offer: {
        discountPercentage: offer.discountPercentage,
        discountprice:
          offer.discountPercentage > 0
            ? calculatedDiscountPrice
            : offer.discountprice,
        startDate: offer.startDate,
        endDate: offer.endDate,
      },
    });

    // Save product to database
    await newProduct.save();

    // Respond with the newly created product
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ message: "Failed to create product. Please try again." });
  }
};

// @desc Update a product
// @route PUT /api/v1/products/:id
// @access Private (requires authentication, to be implemented later)
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  // Validate the product ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    // Extract product details from request body
    const {
      brandName,
      title,
      description,
      category,
      sizes,
      stock,
      image,
      isNewArrival,
      isWeeklyOffer,
      isVegan,
      isLactosFree,
      isGlutenFree,
      offer = {}, // Default to empty object if not provided
    } = req.body;

    // Validate sizes
    if (!Array.isArray(sizes) || sizes.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one size must be provided." });
    }

    // Calculate discount price if discount percentage is given
    let calculatedDiscountPrice = 0;
    if (offer.discountPercentage > 0) {
      const lowestSizePrice = Math.min(...sizes.map((size) => size.price));
      calculatedDiscountPrice =
        (lowestSizePrice * (100 - offer.discountPercentage)) / 100;
      calculatedDiscountPrice = parseFloat(calculatedDiscountPrice.toFixed(2)); // Round to 2 decimal places
    }

    // Construct the update object for Product
    const updateData = {
      brandName,
      title,
      description,
      category,
      sizes: sizes.map((size) => ({
        value: size.value,
        unit: size.unit,
        price: size.price,
      })),
      stock,
      image,
      isNewArrival,
      isWeeklyOffer,
      isVegan,
      isLactosFree,
      isGlutenFree,
      // Only update the offer fields if they are provided in the request
      ...(offer && {
        "offer.discountPercentage": offer.discountPercentage || 0,
        "offer.discountprice":
          offer.discountPercentage > 0
            ? calculatedDiscountPrice
            : offer.discountprice || 0,
        "offer.startDate": offer.startDate || null,
        "offer.endDate": offer.endDate || null,
      }),
    };

    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updateData }, // Use $set to only update specified fields
      { new: true, runValidators: true } // Options to return updated document and run validators
    );

    // Check if the product was found
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Respond with the updated product
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Failed to update product. Please try again." });
  }
};

// @desc Delete a product
// @route DELETE /api/v1/products/:id
// @access Private (requires authentication, to be implemented later)
export const deleteProduct = async (req, res) => {
  try {
    // Find the product by ID and delete it
    const product = await Product.findByIdAndDelete(req.params.id);

    // If the product is not found, return a 404 status with a message
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If deletion is successful, return a 200 status with a success message
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    // Handle any errors and return a 500 status with an error message
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
