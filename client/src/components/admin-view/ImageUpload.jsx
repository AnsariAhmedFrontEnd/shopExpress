import React, { useState, useRef, useEffect } from "react";
import { CloudUpload, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const ImageUpload = ({
  imageFile,
  setImageFile,
  UploadedImageUrl,
  setUploadedImageUrl,
  imageLoding,
  setImageLoading,
}) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null); // State to store the image preview URL
  

  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Set the preview URL
    }
  };

  // Drag and drop functions
  const dragFileHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const dropFileHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = event.dataTransfer.files?.[0];
    if (droppedFiles) {
      setImageFile(droppedFiles);
      setPreviewUrl(URL.createObjectURL(droppedFiles)); // Set the preview URL
    }
  };

  const removeFileHandler = () => {
    setImageFile(null);
    setPreviewUrl(null); // Clear the preview
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the file input field
    }
  };

  const uploadedImagetoCloudinary = async () => {
    setImageLoading(true);
    try {
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.data?.success) {
        console.log(response.data.url)
        setUploadedImageUrl(response.data.url);
      } else {
        console.log(response.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) {
      uploadedImagetoCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full">
      <label className="font-semibold text-lg">Upload image</label>
      <div
        onDragOver={dragFileHandler}
        onDrop={dropFileHandler}
        className="border-2 border-dashed rounded-lg p-4 mt-2"
      >
        <input
          id="image"
          name="image"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />

        {!imageFile ? (
          <label
            htmlFor="image"
            className="flex flex-col justify-center items-center gap-4 hover:cursor-pointer"
          >
            <CloudUpload className="size-10" />
            <p>Drag and drop or click to upload image</p>
          </label>
        ) : imageLoding ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black border-solid"></div>
          </div>
        ) : (
          <div className="relative flex justify-center">
            {/* Image Preview */}
            {previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Uploaded Preview"
                  className="max-h-48 object-contain"
                />
                <X
                  className="absolute top-2 right-2 bg-white rounded-full hover:cursor-pointer hover:bg-gray-200 p-1"
                  onClick={removeFileHandler}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
