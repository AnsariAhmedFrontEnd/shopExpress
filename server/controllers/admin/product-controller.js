const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    return res.status(200).json({
      success: true,
      url: req.file.path,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

//Add products
const addProduct = async (req, res) => {
  try {
    const { image, title, description, category, brand, price, totalStock } =
      req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      totalStock,
    });

    await newProduct.save();
    return res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error ocurred",
    });
  }
};

//Fetch products
const fetchProduct = async (req, res) => {
  try {
    const products = await Product.find({});
   return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error ocurred",
    });
  }
};

//Edit products
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error ocurred",
    });
  }
};

//Delet products
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error ocurred",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchProduct,
  editProduct,
  deleteProduct,
};
