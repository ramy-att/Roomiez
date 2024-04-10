import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  email: Yup.string().email("Invalid email").required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});
