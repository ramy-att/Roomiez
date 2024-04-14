import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { styled } from '@mui/material/styles';

const InputFile = styled('input')({
  display: 'none',
});

const CreateListingModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    price: '',
    tags: [],
    file: null
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      tags: checked
        ? [...prevState.tags, name]
        : prevState.tags.filter(tag => tag !== name)
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      file: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose(); // Close modal after submission
  };

  const predefinedTags = [
    "Furnished",
    "Utilities Included",
    "Near Public Transport",
    "Pet-Friendly",
    "Non-Smoking"
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, // Set the width to your preference
        maxWidth: '90%', // Use a percentage to ensure it's responsive
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        pt: 2,
        pb: 2, // Control the padding to affect the height
      }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Create Listing
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="description"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={(e) => handleChange(e)}
            sx={{ mb: 2 }}
          />
          <TextField
            name="location"
            label="Location"
            fullWidth
            value={formData.location}
            onChange={(e) => handleChange(e)}
            sx={{ mb: 2 }}
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={formData.price}
            onChange={(e) => handleChange(e)}
            sx={{ mb: 2 }}
          />
          <FormGroup>
            {predefinedTags.map((tag) => (
              <FormControlLabel
                control={<Checkbox checked={formData.tags.includes(tag)} onChange={handleCheckboxChange} name={tag} />}
                label={tag}
                key={tag}
                sx={{ mb: 1 }}
              />
            ))}
          </FormGroup>
          <Stack direction="column" spacing={2} alignItems="start">
            <label htmlFor="contained-button-file">
              <InputFile
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
              />
              <Button variant="contained" component="span">
                Upload File
              </Button>
            </label>
            {formData.file && (
              <Paper variant="outlined" sx={{ mt: 2, p: 1, display: 'flex', alignItems: 'center' }}>
                <InsertDriveFileIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle1">{formData.file.name}</Typography>
              </Paper>
            )}
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={onClose} variant="contained" color="secondary">
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
  };

export default CreateListingModal;
