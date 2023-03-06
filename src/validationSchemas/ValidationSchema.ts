import * as yup from "yup";

export const signupSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

export const signInSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});
