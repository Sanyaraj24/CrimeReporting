"use client"

import { CldImage } from 'next-cloudinary';
import { useState, useRef,useEffect } from 'react';

const MAX_FILES = 4;
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // Convert MB to bytes

const UploadImage = ({ onImagesSelected, onImagesUploaded ,resetImages}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [btn,setBtn]=useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    if (resetImages) {
      // Clear all image-related states
      setSelectedFiles([]);
      setPreviewUrls([]);
      setUploadedImages([]);
      setUploadSuccessMessage("");
      setError("");
      setBtn(true);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  }, [resetImages]);
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setError("");
    
    if (selectedFiles.length + files.length > MAX_FILES) {
      setError(`You can only upload a maximum of ${MAX_FILES} images`);
      return;
    }
    
    // Check file sizes
    const oversizedFiles = files.filter(file => file.size > MAX_SIZE_BYTES);
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed the maximum size of ${MAX_SIZE_MB}MB.`);
      return;
    }
    
    // Create preview URLs
    //takes each file and converts it to a temporary local preview URL 
    //Each URL is unique and temporary, used only within that session.
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    
    //[previewUrl]--temporary urls
    //[selectedFile]--exact files
    setSelectedFiles(prev => [...prev, ...files]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);

    
    // Pass selected files to parent component if needed
    if (onImagesSelected) {
      onImagesSelected([...selectedFiles, ...files]);
    }
  };
  
  const removeFile = (index) => {
    //It tells the browser to release the memory for that preview URL (freeing up resources) when it's no longer needed
    URL.revokeObjectURL(previewUrls[index]); //When you create a temporary preview URL for a file
    
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    
    // Pass updated selected files to parent component if needed
    if (onImagesSelected) {
      onImagesSelected(selectedFiles.filter((_, i) => i !== index));
    }
  };
  
  const uploadToCloudinary = async () => {
    if (selectedFiles.length === 0) return [];
  
    const uploadedIds = [];
    setError(""); // Clear any previous errors
    setUploadSuccessMessage(""); 
    try {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "crime-report");
  
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dzxhgjre3/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
  
        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }
  
        const data = await response.json();
        uploadedIds.push(data.public_id);
      }

      setUploadedImages(uploadedIds);
      setUploadSuccessMessage("✅ Images uploaded successfully!");
      setPreviewUrls([]); // Clear preview URLs
      setSelectedFiles([]); // Clear selected files
      setBtn(false);
      setUploading(false); 
      fileInputRef.current.value = null;
      if (onImagesUploaded) {
        onImagesUploaded(uploadedIds);
      }
  
      return uploadedIds;
    } catch (err) {
      setError(`Failed to upload images: ${err.message}`);
      setUploadSuccessMessage(`❌ Upload failed: ${err.message}`);
      setUploading(false); 
      return [];
    }
  };
  
  
  return (
    <>
    <label className="block text-gray-700 font-medium mb-2"
    htmlFor="estimated_loss">
    Select the images for the title of CrimeReport
  </label>
  <p className="text-gray-700 text-sm mb-2">
  Upload images for your crime report post. <br />
  <span className="font-semibold">Note:</span> The first image will be used as the <span className="font-semibold text-red-600">title image</span>, and the rest will appear in the gallery.
</p>
    <div className="space-y-4">
      {/* Preview area */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img 
                src={url} 
                alt={`Preview ${index}`} 
                className="w-full h-40 object-cover rounded-lg"
              />
              {btn && (<button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
              >
                ✕
              </button>)}
            </div>
          ))}
        </div>
      )}
      
      {/* Uploaded images */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {uploadedImages.map((publicId, index) => (
            <CldImage
              key={index}
              src={publicId}
              alt={`Uploaded ${index}`}
              width="300"
              height="180"
              className="rounded-lg"
            />
          ))}
        </div>
      )}
     
     
      
      {/* File input and select button */}
      <div className="flex items-center space-x-4">
      {!uploading && btn && (
        <>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          ref={fileInputRef}
        />
        <button
          className="bg-blue-600 p-3 rounded-lg text-white"
          onClick={(e) => {
            e.preventDefault();
            fileInputRef.current.click();
          }}
          disabled={selectedFiles.length >= MAX_FILES || !btn}
        >
          Select Images ({selectedFiles.length}/{MAX_FILES})
        </button>
        </>
        )}
        <button
          className="bg-green-600 p-3 rounded-lg text-white"
          onClick={(e) => {
            e.preventDefault();
            uploadToCloudinary();
          }}
          disabled={uploading || !btn}
        >
          Upload 
        </button>
        
      </div>
      <br></br>
      <p className="text-gray-700 text-sm mb-2">
        <span className="font-semibold">Note:</span> Once Image is uploaded,you can not make changes to it.
        </p>
      {/* Error display */}
      {error && (
        <p className="text-red-500">{error}</p>
      )}
    </div>
    {uploadSuccessMessage && (
    <p className="text-green-600 font-medium">{uploadSuccessMessage}</p>
  )}
    </>
  );
};

export default UploadImage;