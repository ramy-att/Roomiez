import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useToast } from "client/src/@/components/ui/toast/use-toast";
import { useSelector } from "react-redux";
import CustomInput from "../../components/customInput/CustomInput";
import { FormError } from "../../components/formError/FormError";
import { Tag } from "../../components/tag/Tag";
import { Button } from "client/src/@/components/ui/button";

const tagValues = [
  "Drinking",
  "Smoking",
  "PetFriendly",
  "Gym",
  "Walking",
  "Football",
  "Reading",
  "Cooking",
  "Gaming",
  "Nature",
];

// Yup validation schema
const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .integer("Price must be an integer"),
  furnished: Yup.boolean(),
  utilitiesIncluded: Yup.boolean(),
  nearPublicTransport: Yup.boolean(),
  petFriendly: Yup.boolean(),
  nonSmoking: Yup.boolean(),
  image: Yup.mixed().required("An image is required"),
});

const CreateListingModal = ({ open, onClose }) => {
  const { toast } = useToast();
  const userId = useSelector((state) => state.auth.id);

  return (
    <Formik
      initialValues={{
        description: "",
        location: "",
        price: "",
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
        formData.append("description", values.description);
        formData.append("location", values.location);
        formData.append("price", values.price.toString());
        if (values.image) {
          formData.append("image", values.image);
        }

        // Collect tags based on checkbox values
        const tags = [];
        if (values.furnished) tags.push("Furnished");
        if (values.utilitiesIncluded) tags.push("Utilities Included");
        if (values.nearPublicTransport) tags.push("Near Public Transport");
        if (values.petFriendly) tags.push("Pet Friendly");
        if (values.nonSmoking) tags.push("Non Smoking");

        // Append each tag to the formData
        tags.forEach((tag) => formData.append("tags", tag));

        axios
          .post("http://localhost:4000/listing", { ...formData, owner: userId })
          .then((response) => {
            toast({
              title: "Success",
              description: "Created listing successfully",
            });
          })
          .catch((error) => {
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
      {({
        handleChange,
        setFieldValue,
        handleSubmit,
        errors,
        touched,
        values,
      }) => (
        <Modal open={open} onClose={onClose}>
          <Form onSubmit={handleSubmit}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 800,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                pt: 2,
                pb: 2,
              }}
            >
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Create Listing
              </Typography>
              <div className="mb-4 flex-grow">
                <CustomInput
                  name="description"
                  label="Description"
                  placeholder="Big apartment"
                />
                <FormError name="phone" />
              </div>
              <div className="mb-4 flex-grow">
                <CustomInput
                  name="location"
                  label="Location"
                  placeholder="523 Rue Avenue"
                />
                <FormError name="phone" />
              </div>
              <div className="mb-4 flex-grow">
                <CustomInput
                  name="price"
                  type="number"
                  label="Price"
                  placeholder="750"
                />
                <FormError name="phone" />
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {tagValues.map((value) => (
                  <Tag
                    key={value}
                    value={value}
                    text={value}
                    state={values[value]}
                    onClick={(state) => setFieldValue(value, state)}
                  />
                ))}
              </div>
              <div className="flex w-full justify-end	 gap-10">
                <Button type="button" color="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </Box>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default CreateListingModal;
