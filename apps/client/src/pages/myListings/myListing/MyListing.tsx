import { useParams } from "react-router-dom";
import { myListings } from "../../../samples";
import { useMemo } from "react";
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

const handleAccept = (id:number) => {
  console.log("Accepted", id);
  // Add your logic here for accept
};
const handleReject = (id:number) => {
  console.log("Rejected", id);
  // Add your logic here for reject
};
export const MyListing = () => {
  const { id } = useParams();
  const listing = useMemo(
    () => (id ? myListings[parseInt(id)] : myListings[0]),
    [id, myListings]
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl pt-10 text-center font-bold mb-8">
        Listing: {listing.location}
      </h1>
      <div className="flex justify-center">
        <img width="50%" src={listing.href} alt="Listing Image" />
      </div>
      <Formik
        initialValues={{ ...listing }}
        // onSubmit={}
      >
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
                  <CustomInput label={`Tag ${idx + 1}`} value={tag} disabled />
                </div>
              ))}
            </Form>
          </div>
        )}
      </Formik>
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Bingo</TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>Woof Woof!</TableCell>
            <TableCell>
              <button onClick={() => handleAccept(1)}
                className="text-white bg-green-500 hover:bg-green-700 px-3 py-1 rounded transition duration-300">
                Accept
              </button>
              <button onClick={() => handleReject(1)}
                className="text-white bg-red-500 hover:bg-red-700 ml-2 px-3 py-1 rounded transition duration-300">
                Reject
              </button>
            </TableCell>
          </TableRow>
          {/* Repeat the <TableRow> for other entries */}
        </TableBody>
      </Table>
      </div>
    </div>
  );
};
