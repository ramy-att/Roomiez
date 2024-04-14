import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

interface CreateListingModalProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CreateListingModal: React.FC<CreateListingModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    price: '',
    tags: []
  });
  const [customTag, setCustomTag] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      tags: checked ? [...prevState.tags, value] : prevState.tags.filter(tag => tag !== value)
    }));
  };

  const handleCustomTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTag(e.target.value);
  };

  const addCustomTag = () => {
    if (customTag && !formData.tags.includes(customTag)) {
      setFormData(prevState => ({
        ...prevState,
        tags: [...prevState.tags, customTag]
      }));
      setCustomTag('');  // Clear the input after adding
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCustomTag();  // Ensure custom tag is added if user presses enter on the form submit
    console.log(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-title" variant="h6">Create Listing</Typography>
        <form onSubmit={handleSubmit}>
          <TextField name="description" label="Description" fullWidth margin="normal" value={formData.description} onChange={handleChange} />
          <TextField name="location" label="Location" fullWidth margin="normal" value={formData.location} onChange={handleChange} />
          <TextField name="price" label="Price" type="number" fullWidth margin="normal" value={formData.price} onChange={handleChange} />
          <FormGroup>
            {formData.tags.map(tag => (
              <FormControlLabel key={tag} control={<Checkbox checked={true} onChange={(e, checked) => handleTagChange(e, !checked)} value={tag} />} label={tag} />
            ))}
          </FormGroup>
          <TextField name="customTag" label="Add Custom Tag" fullWidth margin="normal" value={customTag} onChange={handleCustomTagChange} />
          <Button onClick={addCustomTag} variant="contained" color="primary">Add Tag</Button>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
          <Button onClick={onClose} variant="contained" color="secondary">Cancel</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateListingModal;
