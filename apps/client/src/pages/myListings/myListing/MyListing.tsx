import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import CustomInput from "../../../components/customInput/CustomInput";
import { Textarea } from "client/src/@/components/ui/textarea";
import { Label } from "client/src/@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "client/src/@/components/ui/table";
import axios from "axios";

export const MyListing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState();
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      axios.get(`http://localhost:4000/listing/${id}`).then((res) => {
        setListing(res.data);
      });
      axios
        .get(`http://localhost:4000/listing/${id}/applicants`)
        .then((res) => {
          setApplicants(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl pt-10 text-center font-bold mb-8">
        Listing: {listing?.location}
      </h1>
      <div className="flex justify-center">
        <img width="50%" src={listing?.imageUrl} alt="Listing Image" />
      </div>
      {listing && (
        <Formik initialValues={{ ...listing }}>
          {({ handleSubmit, isSubmitting, values }) => (
            <div className="w-full mt-20 mb-10 flex justify-center items-center">
              <Form className="p-10 rounded-2xl bg-gray-300 w-3/4 ">
                <h1 className="text-xl flex font-bold justify-center items-center gap-2 mb-4">
                  Listing's Info
                </h1>
                <div className="mb-4">
                  <CustomInput
                    required
                    name="location"
                    label="Address*"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <Label>Description*</Label>
                  <Textarea
                    name="description"
                    disabled
                    value={values.description}
                  />
                </div>
                <div className="mb-4">
                  <CustomInput label="Price*" name="price" disabled />
                </div>
                {values.tags.map((tag, idx) => (
                  <div className="mb-4" key={idx}>
                    <CustomInput
                      label={`Tag ${idx + 1}`}
                      value={tag}
                      disabled
                    />
                  </div>
                ))}
              </Form>
            </div>
          )}
        </Formik>
      )}
      <div className="flex flex-col w-3/4 mb-10 justify-center mt-8">
        <h1 className="text-xl font-bold text-center gap-2 mb-4">
          Applications
        </h1>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Phone #</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Bingo</TableCell>
              <TableCell>1234567890</TableCell>
              <TableCell>Woof Woof!</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
