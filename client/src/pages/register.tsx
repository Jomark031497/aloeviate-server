import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { NextPage } from "next";
import { registerUser } from "../redux/features/auth/registerSlice";
import { User } from "../types";

const Register: NextPage = () => {
  const handleRegister = async (values: User) => {
    try {
      console.log(values);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: "#f5f5f5", minHeight: "93vh" }}>
      <Formik initialValues={{ username: "", email: "", password: "" }} onSubmit={(values) => handleRegister(values)}>
        {() => (
          <Box component={Form} sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: "6rem" }}>
            <Typography variant="h5">REGISTER</Typography>
            <Field
              as={TextField}
              type="email"
              name="email"
              label="email"
              size="small"
              sx={{ width: "70%", my: "0.5rem" }}
            />
            <Field as={TextField} name="username" label="username" size="small" sx={{ width: "70%", my: "0.5rem" }} />
            <Field
              as={TextField}
              name="password"
              label="password"
              type="password"
              size="small"
              sx={{ width: "70%", my: "0.5rem" }}
            />
            <Button type="submit" variant="contained" sx={{ width: "40%" }}>
              REGISTER
            </Button>
          </Box>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
