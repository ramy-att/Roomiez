import { Button } from "client/src/@/components/ui/button";
import "../../index.css";
import { Input } from "client/src/@/components/ui/input";
import { Label } from "client/src/@/components/ui/label";
import { Form, Formik } from "formik";
import waveEmoji from "../../assets/waving-hand-sign.svg";
import spinner from "../../assets/spinner.svg";
import { signinSchema } from "./utils";
import { FormError } from "../../components/formError/FormError";

interface ISignIn {
  email: string;
  password: string;
}

export const Login = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" } as ISignIn}
      validationSchema={signinSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <div className="w-full h-screen flex justify-center items-center">
          <Form className="p-10 rounded-2xl	bg-gray-300 md:w-2/4 w-3/4">
            <h1 className="text-xl flex font-bold justify-center items-center gap-2 mb-4">
              Login Now! <img className="w-10" src={waveEmoji} />
            </h1>
            <p className="text-md text-center mb-8">
              Log in to your existing account!
            </p>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="Email" />
              <FormError name="email" />
            </div>
            <div className="mb-6">
              <Label htmlFor="password">Password</Label>
              <Input type="password" placeholder="******" />
              <FormError name="password" />
            </div>
            <div className="mb-6 text-md italic underline text-center">
              <a href="">No Account? Sign Up Instead</a>
            </div>
            <div className="text-center">
              <Button onClick={() => handleSubmit()} className="w-1/2 h-10">
                {isSubmitting && spinner}
                {isSubmitting ? "Logging In..." : "Log In"}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
