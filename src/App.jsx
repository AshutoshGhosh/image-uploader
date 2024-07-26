import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProfilePicture from './components/ProfilePicture';
import ImageUploader from './components/ImageUploader';

const App = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [showUploader, setShowUploader] = useState(false);

  const handleUpdateClick = () => {
    setShowUploader(true);
  };

  const handleImageSelect = (imageUrl) => {
    setProfilePic(imageUrl);
    setShowUploader(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <ProfilePicture profilePic={profilePic} onUpdateClick={handleUpdateClick} />
      {showUploader && (
        <ImageUploader onClose={() => setShowUploader(false)} onImageSelect={handleImageSelect} />
      )}
    </Box>
  );
};

export default App;
