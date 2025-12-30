const categoryModel = require('../Model/category');


const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    if (!categories || categories.length === 0) {
      return res.status(404).json([]);
    }

    const formattedCategories = categories.map(cat => ({
      id: cat._id.toString(),
      name: cat.name,
      image: cat.image
    }));

    res.status(200).json(formattedCategories);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};


const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      id: category._id.toString(),
      name: category.name,
      image: category.image
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById
};
