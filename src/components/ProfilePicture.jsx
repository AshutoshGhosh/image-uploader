import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Modal,
  Paper,
  IconButton,
  LinearProgress,
  Badge,
  Grid,
  Radio,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import CropIcon from "@mui/icons-material/Crop";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ProfilePicture = ({ profilePic, onUpdateClick }) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length + files.length > 5) {
        setError("You've reached the image limit");
        return;
      }
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          progress: 100,
          uploaded: true,
          url: file.preview,
        })
      );
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      // setTimeout(() => {
      //   const newFiles = acceptedFiles.map((file) =>
      //     Object.assign(file, {
      //       preview: URL.createObjectURL(file),
      //       progress: 100,
      //       uploaded: true,
      //       url: file.preview,
      //     })
      //   );
      //   setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      // }, 2000);
      setError("");
    },
    maxFiles: 5,
    maxSize: 5242880,
    onDropRejected: (fileRejections) => {
      const errorMsg = fileRejections[0].errors[0].message;
      setError(errorMsg);
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = (fileToDelete) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="background.default"
      >
        <Card sx={{ width: "100%", maxWidth: 768 }}>
          <CardContent sx={{ p: 0 }}>
            <Grid container>
              <Grid item xs={12} position={"relative"}>
                <img
                  src="https://placehold.co/600x200"
                  alt="Cover Image"
                  style={{
                    width: "100%",
                    height: "132px",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                    width: "100%",
                    px: 2,
                  }}
                >
                  <Avatar
                    src={profilePic}
                    alt="Profile Picture"
                    sx={{ width: 100, height: 100, border: "4px solid white" }}
                  />
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleOpen}
                    sx={{
                      textTransform: "none",
                      bgcolor: "inherit.main",
                      "&:hover": {
                        bgcolor: "inherit.dark",
                      },
                    }}
                  >
                    Update picture
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} py={5} px={3}>
                <Typography variant="h5" py={2}>
                  Jack Smith
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  @kingjack • Senior Product Designer at{" "}
                  <span style={{ color: "#1976D2" }}>Webflow</span> • He/Him
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Modal open={open} onClose={handleClose}>
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 500,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              outline: "none",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Upload image(s)</Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography color="text.secondary" mb={2}>
              You may upload up to 5 images
            </Typography>
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed",
                borderColor: "text.secondary",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              <img
                aria-hidden="true"
                alt="upload-icon"
                src="https://openui.fly.dev/openui/24x24.svg?text=📤"
                style={{ margin: "0 auto 8px" }}
              />
              <Typography color="text.secondary">
                Click or drag and drop to upload
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PNG, or JPG (Max 5MB)
              </Typography>
            </Box>
            <Box mt={2} sx={{ overflowX: "auto", maxHeight: "12rem" }}>
              {files.map((file, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <Avatar
                    src={file.preview}
                    alt="Preview"
                    sx={{
                      width: 56,
                      height: 56,
                      mr: 2,
                      border: "none",
                      borderRadius: "20%",
                    }}
                  />
                  <Box flexGrow={1}>
                    <Typography
                      variant="body2"
                      sx={{ whiteSpace: "break-spaces" }}
                    >
                      {file.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Math.round(file.size / 1024)} KB
                    </Typography>
                    {file.uploaded && (
                      <Box display="flex" alignItems="center" gap={1}>
                        <Button size="small">
                          <CropIcon /> Crop image
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDelete(file)}
                        >
                          <DeleteIcon fontSize="small" /> Delete
                        </Button>
                      </Box>
                    )}
                  </Box>
                  <Box position="relative" width={100}>
                    {!file.uploaded && (
                      <>
                        <LinearProgress
                          variant="determinate"
                          value={file.progress}
                        />
                        <IconButton
                          size="small"
                          sx={{ position: "absolute", right: 0, top: 0 }}
                          onClick={() => handleDelete(file)}
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </>
                    )}
                    {/* {file.uploaded && (
                      <Badge
                        badgeContent={<CheckCircleIcon color="success" />}
                        color="default"
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Upload success!
                        </Typography>
                      </Badge>
                    )} */}
                  </Box>
                  <Radio
                    checked={selectedImage === file}
                    onChange={() => setSelectedImage(file)}
                    value={file}
                    name="selected-image"
                  />
                </Box>
              ))}
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancel
              </Button>
              {files.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (selectedImage) {
                      console.log(
                        "Selected Image URL: ",
                        selectedImage.preview
                      );
                      // handleClose();
                    }
                  }}
                >
                  Select image
                </Button>
              )}
            </Box>
          </Paper>
        </Modal>
      </Box>
    </>
  );
};

export default ProfilePicture;
