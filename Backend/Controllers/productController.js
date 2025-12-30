const productModel=require('../Model/product') 

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    const formattedProducts = products.map(product => ({
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      discount: product.discount,
      rating: product.rating,
      reviews: product.reviews,
      image: product.image,
      category: product.category,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch products",
      success: false
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id; 
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false
      });
    }

    const formattedProduct = {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      discount: product.discount,
      rating: product.rating,
      reviews: product.reviews,
      image: product.image,
      category: product.category,
    };

    res.status(200).json(formattedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch product",
      success: false
    });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category; 
    const products = await productModel.find({ category });

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No Product Found For This Category",
        success: false
      });
    }

    const formattedProducts = products.map(product => ({
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      discount: product.discount,
      rating: product.rating,
      reviews: product.reviews,
      image: product.image,
      category: product.category,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch products",
      success: false
    });
  }
};

const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({
        message: "Query parameter 'q' is required",
        success: false
      });
    }

    const products = await productModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ]
    });

    const formattedProducts = products.map(product => ({
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      discount: product.discount,
      rating: product.rating,
      reviews: product.reviews,
      image: product.image,
      category: product.category,
    }));

    res.status(200).json(formattedProducts );
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch products",
      success: false
    });
  }
};
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({ isFeatured: true })
      .limit(8); // optional: homepage limit

    const formattedProducts = products.map(product => ({
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      discount: product.discount,
      rating: product.rating,
      reviews: product.reviews,
      image: product.image,
      category: product.category
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch featured products",
      success: false
    });
  }
};


module.exports = { getAllProducts, getProductById, getProductsByCategory, searchProducts,getFeaturedProducts };
