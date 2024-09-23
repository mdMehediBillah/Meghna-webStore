import Category from "../models/categoryModel/index.js";

// @desc Create a new category
// @route POST /api/v1/categories
// @access Private (requires authentication, to be implemented later)
export const createCategory = async (req, res) => {
  try {
    // Validate request body
    const { name, image } = req.body;

    // Simple validation
    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if category already exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create a new category instance
    const newCategory = new Category({
      name,
      image,
    });

    // Save the category to the database
    const category = await newCategory.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getCategories = async (req, res) => {
  // res.status(200).json({ message: "Categories route works" });
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
