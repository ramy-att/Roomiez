import { useNavigate, useParams } from "react-router-dom";
import { listings } from "../../../samples";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "client/src/@/components/ui/table";
import { Tag } from "../../../components/listingCard/ListingCard";
import { useSelector } from "react-redux";
import { Routes } from "../../../utils";
import { Textarea } from "client/src/@/components/ui/textarea";
import { Label } from "client/src/@/components/ui/label";
import { Button } from "client/src/@/components/ui/button";
import { useToast } from "client/src/@/components/ui/toast/use-toast";

export const Listing = () => {
  const auth = !!useSelector((state) => state.auth.token);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const listing = useMemo(
    () => (id ? listings[parseInt(id)] : listings[0]),
    [id, listings]
  );

  const handleSubmission = () => {
    setMessage("");
    toast({
      title: "Success!",
      description: "Candidate application sent successfully!",
    });
    navigate(Routes.LISTINGS);
  };

  return (
    <div className="flex justify-center items-center flex-col w-3/4 mx-auto mt-10 px-6">
      <div className="flex flex-col items-center mb-8">
        <img src={listing.href} alt="Listing Image" className="mb-4 max-h-96	" />
        <div className="flex gap-3">
          {listing.tags.map((tag, idx) => (
            <Tag key={idx} text={tag} />
          ))}
        </div>
      </div>
      <div className=" mb-8">
        <h1 className="text-2xl text-center font-bold mb-4">Description</h1>
        <p>{listing.description}</p>
      </div>
      <Table className="w-full bg-gray-100 mb-10">
        <TableBody>
          <TableRow>
            <TableCell className="px-4 font-medium">Location</TableCell>
            <TableCell className="px-4">{listing.location}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 font-medium">Price</TableCell>
            <TableCell className="px-4">{listing.price}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className=" mb-8">
        <h1 className="text-2xl text-center font-bold mb-4">Let's do it!</h1>
        {!auth ? (
          <h2
            onClick={() => navigate(Routes.LOGIN)}
            className="text-lg underline text-center font-bold mb-4 cursor-pointer hover:text-blue-400"
          >
            Woah there! You've got to sign in first!
          </h2>
        ) : (
          <div className="flex flex-row mt-10 items-center gap-20 mb-4">
            <div>
              <Label>Send a message!</Label>
              <p>You don't have to, but it's recommended!</p>
              <Textarea
                name="message"
                placeholder="Hello! Let's live together."
                value={message}
              />
            </div>
            <Button onClick={handleSubmission}>Apply</Button>
          </div>
        )}
      </div>
    </div>
  );
};
