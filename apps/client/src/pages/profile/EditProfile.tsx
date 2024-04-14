import { Button } from "client/src/@/components/ui/button";
import { Form, Formik } from "formik";
import waveEmoji from "../../assets/waving-hand-sign.svg";
import spinner from "../../assets/spinner.svg";
import { FormError } from "../../components/formError/FormError";
import CustomInput from "../../components/customInput/CustomInput";
import axios from "axios";
import { Routes } from "../../utils";
import { useDispatch } from "react-redux";
import { useToast } from "client/src/@/components/ui/toast/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { profileSchema } from "./profileUtils";
import { useEffect, useRef, useState } from "react";
import { Tag } from "../../components/tag/Tag";

interface Profile {
  name: string;
  email: string;
  newPassword: string;
  phone: string;
  age: number;
  description: string;
  Drinking: boolean;
  Smoking: boolean;
  PetFriendly: boolean;
  Gym: boolean;
  Walking: boolean;
  Football: boolean;
  Reading: boolean;
  Cooking: boolean;
  Gaming: boolean;
  Nature: boolean;
}

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

export const EditProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>();
  const inputRef = useRef(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/user/${id}`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch profile:", err);
          toast({
            title: "Error loading profile",
            description: "Failed to load user profile.",
          });
        })
        .finally(() => {});
    }
  }, [id, toast]);

  // if (!profile) {
  //   return <div>No profile data</div>; // Handle case where no profile data is available
  // }
  return (
    <Formik
      initialValues={
        {
          name: profile?.name ?? "",
          email: profile?.email ?? "",
          newPassword: "",
          phone: profile?.phone ?? "",
          age: profile?.age ?? "",
          description: profile?.description ?? "",
          Drinking: profile?.Drinking ?? false,
          Smoking: profile?.Smoking ?? false,
          PetFriendly: profile?.PetFriendly ?? false,
          Gym: profile?.Gym ?? false,
          Walking: profile?.Walking ?? false,
          Football: profile?.Football ?? false,
          Reading: profile?.Reading ?? false,
          Cooking: profile?.Cooking ?? false,
          Gaming: profile?.Gaming ?? false,
          Nature: profile?.Nature ?? false,
        } as Profile
      }
      validationSchema={profileSchema}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting }) => {
        axios
          .patch(`http://localhost:4000/user/${id}`, { ...values })
          .then((res) => {
            setProfile(res.data);
            toast({
              title: "Profile Updated!",
              description: "Profile updated successfully!",
            });
          })
          .catch((e) => {
            toast({
              title: "Could not update",
              description: e.response.data.message,
            });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
        <div className="w-full mt-10 flex justify-center items-center">
          <Form className="p-10 rounded-2xl	bg-gray-300 md:w-2/4 w-3/4">
            <div className="flex justify-center">
              <img
                src={profile?.imageUrl}
                alt="Image"
                className="h-36 w-36 cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-50"
                onClick={() => {
                  // When the image is clicked, trigger the file input click event
                  inputRef.current && inputRef.current?.click?.();
                }}
              />
              <input
                ref={inputRef}
                type="file"
                onChange={(e) => console.log(e)}
                style={{ display: "none" }}
              />
            </div>
            <div className="mb-4">
              <CustomInput
                name="name"
                label="Name"
                type="name"
                placeholder="John Doe"
              />
              <FormError name="name" />
            </div>
            <div className="flex w-full gap-2">
              <div className="mb-4 flex-grow">
                <CustomInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="email@email.com"
                />
                <FormError name="email" />
              </div>
              <div className="mb-4 flex-grow">
                <CustomInput
                  label="New Password"
                  name="newPassword"
                  type="password"
                  placeholder="******"
                />
                <FormError name="newPassword" />
              </div>
            </div>
            <div className="flex w-full gap-2">
            <div className="mb-4 flex-grow">
                <CustomInput
                  name="age"
                  label="Age"
                  type="number"
                  placeholder="18"
                />
                <FormError name="age" />
              </div>
              <div className="mb-4 flex-grow">
                <CustomInput
                  name="phone"
                  label="Phone Number"
                  type="number"
                  placeholder="1234567890"
                />
                <FormError name="phone" />
              </div>
            </div>
            <div className="mb-5">
              <CustomInput
                name="description"
                label="Description"
                placeholder="I am batman"
              />
              <FormError name="description" />
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
            <div className="text-center">
              <Button
                onClick={() => handleSubmit()}
                className="gap-1 w-1/2 h-10"
              >
                {isSubmitting && (
                  <img className="animate-spin w-4" src={spinner} />
                )}
                {isSubmitting ? "Updatting..." : "Submit"}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
