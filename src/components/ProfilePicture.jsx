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
  Divider,
  Grid,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";

const ProfilePicture = ({ profilePic, onUpdateClick }) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  //   const [selectedImage, setSelectedImage] = useState(null);
  //   const [cropData, setCropData] = useState("");
  //   const [loading, setLoading] = useState(false);
  //   const [success, setSuccess] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(files);
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
            <Box mt={2} display={"flex"} alignItems={"center"}>
              {files.map((file, index) => {
                return (
                  <>
                    <img
                      key={index}
                      src={file.preview}
                      alt="Preview"
                      onClick={() => setSelectedImage(file)}
                      style={{
                        width: "100px",
                        height: "100px",
                        cursor: "pointer",
                      }}
                    />
                    <Typography key={index} variant="body2" noWrap>
                      {file.name}
                    </Typography>
                  </>
                );
              })}
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
              sx={{
                mt: 2,
                textTransform: "none",
              }}
            >
              Close
            </Button>
          </Paper>
        </Modal>
      </Box>
      {/* <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Avatar
          src={profilePic}
          alt="Profile Picture"
          sx={{ width: 100, height: 100 }}
        />
        <Button variant="outlined" onClick={onUpdateClick}>
          Update Picture
        </Button>
      </Box> */}
    </>
  );
};

export default ProfilePicture;
