import { Box, Container, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { NextPage } from "next";
import CButton from "../components/custom/CButton";
import CTextField from "../components/custom/CTextField";
import { User } from "../types";

const Login: NextPage = () => {
  const handleLogin = async (values: User) => {
    console.log(values);
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: "#f5f5f5" }}>
      <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => handleLogin(values)}>
        {() => (
          <Box
            component={Form}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Typography variant="h5">LOGIN</Typography>
            <Field as={CTextField} name="username" label="username" />
            <Field as={CTextField} name="password" label="password" type="password" />
            <CButton type="submit" label="LOGIN" />
          </Box>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
