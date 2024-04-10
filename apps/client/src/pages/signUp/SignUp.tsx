import { Button } from "client/src/@/components/ui/button";
import "../../index.css";
import { Form, Formik } from "formik";
import waveEmoji from "../../assets/waving-hand-sign.svg";
import { default as spinner } from "../../assets/spinner.svg";
import { signupSchema } from "./utils";
import { FormError } from "../../components/formError/FormError";
import axios from "axios";
import CustomInput from "../../components/customInput/CustomInput";
import { useToast } from "client/src/@/components/ui/toast/use-toast";
import { Routes } from "../../utils";

interface ISignUp {
  name: string;
  email: string;
  password: string;
}
export const SignUp = () => {
  const { toast } = useToast();

  return (
    <Formik
      initialValues={{ email: "", password: "", name: "" } as ISignUp}
      validationSchema={signupSchema}
      onSubmit={(values, { setSubmitting }) => {
        axios.post("http://localhost:4000/user", { ...values }).then((res) => {
          setSubmitting(false);
          toast({
            title: "Signed Up!",
            description: "Signed up successfully! Log in to get started!",
          });
        });
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <div className="w-full h-screen flex justify-center items-center">
          <Form className="p-10 rounded-2xl	bg-gray-300 md:w-2/4 w-3/4">
            <h1 className="text-xl flex font-bold justify-center items-center gap-2 mb-4">
              Join Now! <img className="w-10" src={waveEmoji} />
            </h1>
            <p className="text-md text-center mb-8">
              Join Now to Meet New Roommates!
            </p>
            <div className="mb-4">
              <CustomInput name="name" label="Name" placeholder="John Doe" />
              <FormError name="name" />
            </div>
            <div className="mb-4">
              <CustomInput
                name="email"
                label="Email"
                type="email"
                placeholder="john@email.com"
              />
              <FormError name="email" />
            </div>
            <div className="mb-6">
              <CustomInput
                label="Password"
                name="password"
                type="password"
                placeholder="******"
              />
              <FormError name="password" />
            </div>
            <div className="mb-6 text-md italic underline text-center">
              <a href={Routes.LOGIN}>Already Signed Up? Sign In Instead</a>
            </div>
            <div className="text-center">
              <Button
                type="submit"
                onClick={() => handleSubmit()}
                className="w-1/2 h-10"
              >
                {isSubmitting && <img src={spinner} />}
                {isSubmitting ? "Signing you up..." : "Sign Up"}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
