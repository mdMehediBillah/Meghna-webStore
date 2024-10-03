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

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// @desc Update a category
// @route PUT /api/v1/categories/:id
// @access Private (requires authentication, to be implemented later)
export const updateCategory = async (req, res) => {
  try {
    // Validate request body
    const { name, image } = req.body;

    // Simple validation
    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if category exists
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update the category
    category.name = name;
    category.image = image;

    // Save the updated category
    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// @desc Delete a category
// @route DELETE /api/v1/categories/:id
// @access Private (requires authentication, to be implemented later)
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  console.log("Received ID:", id);

  try {
    const deletedCategory = await Category.findByIdAndDelete(id); // Find and remove category
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    console.error("Error in deleteCategory:", err); // Log the error for debugging
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
