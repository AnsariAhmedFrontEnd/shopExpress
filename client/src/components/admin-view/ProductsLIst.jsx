import React, { useState } from "react";
import EditProductForm from "./EditProductForm";
import axios from "axios";
import { toast } from "react-toastify";

const ProductList = ({ product, fetchAllProducts }) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  //Edit product
  const editProductHandler = async () => {
    setIsEditFormOpen(true);
  };

  const delteProductHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/products/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);
      if (response.data?.success) {
        fetchAllProducts();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete products, pleas try again.");
    }
  };
  return (
    <>
      <EditProductForm
        product={product}
        isEditFormOpen={isEditFormOpen}
        setIsEditFormOpen={setIsEditFormOpen}
      />
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white w-60">
        {/* Image at the top */}
        <img
          className="w-90 h-48 object-cover"
          src={product.image}
          alt={product.title}
        />

        {/* Product info */}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product.title}</div>
          <p className="text-gray-700 text-base">${product.price}</p>
        </div>

        {/* Footer with Edit/Delete buttons */}
        <div className="px-6 pt-4 pb-2 flex justify-between border-t">
          <button
            className="bg-black hover:opacity-80 text-white font-bold py-2 px-4 rounded"
            onClick={editProductHandler}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => delteProductHandler(product._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductList;
