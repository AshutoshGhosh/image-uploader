import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageUploader = ({ onClose, onImageSelect }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropData, setCropData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const cropperRef = useRef(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setImages(files);
    },
    maxFiles: 5,
    maxSize: 5242880,
    onDropRejected: (fileRejections) => {
      const errorMsg = fileRejections[0].errors[0].message;
      setError(errorMsg);
    },
  });

  const handleCrop = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", cropData);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData
      );
      setSuccess(true);
      onImageSelect(response.data.secure_url);
    } catch (err) {
      setError("An error occurred during the upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Typography>
          Drag and drop some files here, or click to select files
        </Typography>
      </Box>
      {images.length > 0 && (
        <Box>
          {images.map((file, index) => {
            debugger;
            return (
              <img
                key={index}
                src={file.preview}
                alt="Preview"
                onClick={() => setSelectedImage(file)}
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
              />
            );
          })}
        </Box>
      )}
      {selectedImage && (
        <Box>
          <Cropper
            ref={cropperRef}
            src={selectedImage.preview}
            style={{ height: 400, width: "100%" }}
            aspectRatio={1}
            guides={false}
            crop={handleCrop}
          />
          <Button onClick={handleCrop}>Crop</Button>
        </Box>
      )}
      {cropData && (
        <Box>
          <img src={cropData} alt="Cropped" />
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Confirm"}
          </Button>
        </Box>
      )}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Changes saved successfully</Alert>
      </Snackbar>
    </Box>
  );
};

export default ImageUploader;
