import React, { useState, useEffect } from "react";
import UploadImage from "../../components/admin-view/ImageUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { setProducts } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/admin-view/ProductsLIst";

const Products = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //States for Upload Image component
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoding, setImageLoading] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.auth);

  //States for form input
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [totalStock, setTotalStock] = useState("");

  //Fetch all products
  const fetchAllProducts = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/products/get"
    );
    console.log(response.data.data);
    dispatch(setProducts(response.data.data));
  };

  //Add Products
  const addProductsHandler = async (event) => {
    event.preventDefault();
    const newProduct = {
      image: uploadedImageUrl,
      title,
      description,
      category,
      brand,
      price,
      totalStock,
    };

    console.log(newProduct)
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/add",
        newProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);
      if (response.data?.success) {
        setImageFile(null);
        setTitle("");
        setDescription("");
        setCategory("");
        setBrand("");
        setPrice("");
        setTotalStock("");
        setIsSidebarOpen(false);
        fetchAllProducts();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add products, pleas try again.");
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      {/* Trigger button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add New Product
      </button>
      {/* Product list */}
      <div className="flex flex-wrap gap-6 m-4 justify-start">
        {products.map((product) => (
          <ProductList
            key={product._id}
            product={product}
            setIsSidebarOpen={setIsSidebarOpen}
            fetchAllProducts={fetchAllProducts}
          />
        ))}
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <>
          {/* Overlay to dim the background */}
          <div
            className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Sidebar content */}
          <div className="fixed top-0 right-0 w-full md:w-96 p-6 bg-white shadow-lg transition-transform duration-300 transform translate-x-0 overflow-y-auto h-full">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 text-gray-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form className="space-y-4" onSubmit={addProductsHandler}>
              {/* Image Upload */}
              <UploadImage
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                imageLoding={imageLoding}
                setImageLoading={setImageLoading}
              />
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter product title"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter product description"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="clothing">Clothing</option>
                  <option value="electronics">Electronics</option>
                  <option value="home_appliances">Home Appliances</option>
                </select>
              </div>

              {/* Brand */}
              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium mb-1"
                >
                  Brand
                </label>
                <select
                  id="brand"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="nike">Nike</option>
                  <option value="apple">Apple</option>
                  <option value="samsung">Samsung</option>
                </select>
              </div>

              {/* Product Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium mb-1"
                >
                  Product Price
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Enter product price"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>

              {/* Total Stock */}
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium mb-1"
                >
                  Total Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  placeholder="Enter total stock"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={totalStock}
                  onChange={(e) => {
                    setTotalStock(e.target.value);
                  }}
                />
              </div>

              {/* Add Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md"
              >
                Add Product
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
