import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField as MuiTextField } from '@mui/material';
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

// Yup validation schema
const validationSchema = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  location: Yup.string().required('Location is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .integer('Price must be an integer'),
  tags: Yup.array().min(1, 'At least one tag is required'),
  file: Yup.mixed().required('A file is required')
});

const CreateListingModal = ({ open, onClose }) => {
  const predefinedTags = [
    "Furnished",
    "Utilities Included",
    "Near Public Transport",
    "Pet-Friendly",
    "Non-Smoking"
  ];

  return (
    <Formik
      initialValues={{
        description: '',
        location: '',
        price: '',
        tags: [],
        file: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        onClose(); // Close modal after submission
        setSubmitting(false);
      }}
    >
      {({ errors, touched, handleChange, setFieldValue, handleSubmit }) => (
        <Modal open={open} onClose={onClose}>
          <Form onSubmit={handleSubmit}>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 800, // Adjust as needed
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              pt: 2,
              pb: 2
            }}>
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Create Listing
              </Typography>
              <MuiTextField
                name="description"
                label="Description"
                fullWidth
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                sx={{ mb: 2 }}
              />
              <MuiTextField
                name="location"
                label="Location"
                fullWidth
                onChange={handleChange}
                error={touched.location && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ mb: 2 }}
              />
              <MuiTextField
                name="price"
                label="Price"
                type="number"
                fullWidth
                onChange={handleChange}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                sx={{ mb: 2 }}
              />
              <FormGroup>
                {predefinedTags.map(tag => (
                  <FormControlLabel
                    key={tag}
                    control={
                      <Field as={Checkbox} type="checkbox" name="tags" value={tag} />
                    }
                    label={tag}
                  />
                ))}
              </FormGroup>
              <label htmlFor="contained-button-file">
                <InputFile
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
                <Button variant="contained" component="span" sx={{ mb: 2 }}>
                  Upload File
                </Button>
              </label>
              {errors.file && touched.file ? (
                <Typography color="error" variant="body2">{errors.file}</Typography>
              ) : null}
              {values.file && (
                <Paper variant="outlined" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <InsertDriveFileIcon />
                  <Typography>{values.file.name}</Typography>
                </Paper>
              )}
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                <Button type="button" variant="contained" color="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </Stack>
            </Box>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default CreateListingModal;
