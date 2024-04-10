import { Button } from "client/src/@/components/ui/button";
import "../../index.css";
import { Input } from "client/src/@/components/ui/input";
import { Label } from "client/src/@/components/ui/label";
import { Formik } from "formik";

export const Login = () => {
  return (
    <div className="w-full flex justify-center">
      <form className="p-10 rounded-2xl	bg-gray-300 w-2/4">
        <h1>Join Now!</h1>
        <p>Create a new account below!</p>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="name" placeholder="John DOe" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="Email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" placeholder="******" />
        </div>
        <div>
          <a href="">Already Signed Up? Sign In Instead</a>
        </div>
        <Button>Sign Up</Button>
      </form>
    </div>
  );
};
