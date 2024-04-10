import { Button } from "client/src/@/components/ui/button";
import "../../index.css";
import { Input } from "client/src/@/components/ui/input";
import { Label } from "client/src/@/components/ui/label";
import { Formik } from "formik";

export const Login = () => {
  return (
    <div className="w-full flex justify-center">
      <form className="p-10 rounded-2xl	bg-gray-300 w-2/4">
        <h1>Login Now!</h1>
        <p>Login to your existing account</p>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="Email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" placeholder="******" />
        </div>
        <div>
          <a href="">No Account? Sign Up Instead</a>
        </div>
        <Button>Log In</Button>
      </form>
    </div>
  );
};
