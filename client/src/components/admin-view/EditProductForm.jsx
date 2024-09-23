import React, { useState, useEffect } from "react";
import { setProducts } from "@/store/auth-slice";
import axios from "axios";
import { useDispatch } from "react-redux";
// import UploadImage from "../admin-view/ImageUpload";
import { toast } from "react-toastify";

const EditProductForm = ({ product, isEditFormOpen, setIsEditFormOpen }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [totalStock, setTotalStock] = useState("");
  const dispatch = useDispatch();

  //Fetch all products
  const fetchAllProducts = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/products/get"
    );
    console.log(response.data.data);
    dispatch(setProducts(response.data.data));
  };

  //Add Products
  const updateProductHandler = async (event) => {
    event.preventDefault();
    const updatedProduct = {
      //   image: uploadedImageUrl,
      title,
      description,
      category,
      brand,
      price,
      totalStock,
    };
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/products/edit/${product._id}`,
        updatedProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);
      if (response.data?.success) {
        setTitle("");
        setDescription("");
        setCategory("");
        setBrand("");
        setPrice("");
        setTotalStock("");
        setIsEditFormOpen(false);
        fetchAllProducts();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add products, pleas try again.");
    }
  };

  // Use useEffect to set the initial values from the product prop when the component mounts
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setCategory(product.category);
      setBrand(product.brand);
      setPrice(product.price);
      setTotalStock(product.totalStock);
    }
  }, [product]);

  return (
    <div>
      {isEditFormOpen && (
        <>
          {/* Overlay to dim the background */}
          <div
            className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300"
            onClick={() => setIsEditFormOpen(false)}
          ></div>

          {/* Form content */}
          <div className="fixed top-0 right-0 w-50 md:w-96 p-6 bg-white shadow-lg transition-transform duration-300 transform translate-x-0 overflow-y-auto h-full">
            <button
              onClick={() => setIsEditFormOpen(false)}
              className="absolute top-4 right-4 text-gray-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form className="space-y-4" onSubmit={updateProductHandler}>
              {/* Image Upload */}
              {/* <UploadImage
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                imageLoding={imageLoding}
                setImageLoading={setImageLoading}
              /> */}
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
                  value={title} // Use local state value
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
                  value={description} // Use local state value
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
                  value={category} // Use local state value
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
                  value={brand} // Use local state value
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
                  value={price} // Use local state value
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
                  value={totalStock} // Use local state value
                  onChange={(e) => {
                    setTotalStock(e.target.value);
                  }}
                />
              </div>

              {/* Update Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md"
              >
                Update Product
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default EditProductForm;
