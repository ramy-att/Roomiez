import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
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
import Box from '@mui/material/Box';
import { useToast } from "client/src/@/components/ui/toast/use-toast";

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
  furnished: Yup.boolean(),
  utilitiesIncluded: Yup.boolean(),
  nearPublicTransport: Yup.boolean(),
  petFriendly: Yup.boolean(),
  nonSmoking: Yup.boolean(),
  image: Yup.mixed().required('An image is required')
});

const CreateListingModal = ({ open, onClose }) => {
  const {toast} = useToast()
  return (
    <Formik
      initialValues={{
        description: '',
        location: '',
        price: '',
        furnished: false,
        utilitiesIncluded: false,
        nearPublicTransport: false,
        petFriendly: false,
        nonSmoking: false,
        image: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('description', values.description);
        formData.append('location', values.location);
        formData.append('price', values.price.toString());
        // formData.append('owner',)
        if (values.image) {
          formData.append('image', values.image);
        }

        // Collect tags based on checkbox values
        const tags = [];
        if (values.furnished) tags.push('Furnished');
        if (values.utilitiesIncluded) tags.push('Utilities Included');
        if (values.nearPublicTransport) tags.push('Near Public Transport');
        if (values.petFriendly) tags.push('Pet Friendly');
        if (values.nonSmoking) tags.push('Non Smoking');

        // Append each tag to the formData
        tags.forEach(tag => formData.append('tags', tag));

        axios.post('http://localhost:4000/listing', formData)
          .then(response => {
            toast({
              title: "Success",
              description: "Created listing successfully",
            });
          })
          .catch(error => {
            toast({
              title: "Failure",
              description: error,
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ handleChange, setFieldValue, handleSubmit, errors, touched, values }) => (
        <Modal open={open} onClose={onClose}>
          <Form onSubmit={handleSubmit}>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 800,
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
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ mb: 2 }}
              />
              <MuiTextField
                name="location"
                label="Location"
                fullWidth
                onChange={handleChange}
                error={touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ mb: 2 }}
              />
              <MuiTextField
                name="price"
                label="Price"
                type="number"
                fullWidth
                onChange={handleChange}
                error={touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ mb: 2 }}
              />
              <FormGroup>
                {[
                  { name: 'furnished', label: 'Furnished' },
                  { name: 'utilitiesIncluded', label: 'Utilities Included' },
                  { name: 'nearPublicTransport', label: 'Near Public Transport' },
                  { name: 'petFriendly', label: 'Pet Friendly' },
                  { name: 'nonSmoking', label: 'Non Smoking' }
                ].map(field => (
                  <FormControlLabel
                    key={field.name}
                    control={<Field as={Checkbox} type="checkbox" name={field.name} />}
                    label={field.label}
                  />
                ))}
              </FormGroup>
              <label htmlFor="contained-button-file">
                <InputFile
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
                <Button variant="contained" component="span">
                  Upload File
                </Button>
              </label>
              {values.image && (
                <Paper variant="outlined" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <InsertDriveFileIcon />
                  <Typography>{values.image.name}</Typography>
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
