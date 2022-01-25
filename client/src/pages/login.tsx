import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { NextPage } from "next";

const Login: NextPage = () => {
  const handleLogin = async (values: any) => {
    try {
      console.log(values);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: "#f5f5f5", minHeight: "93vh" }}>
      <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => handleLogin(values)}>
        {() => (
          <Box component={Form} sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: "6rem" }}>
            <Typography variant="h5">LOGIN</Typography>
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
              Login
            </Button>
          </Box>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
