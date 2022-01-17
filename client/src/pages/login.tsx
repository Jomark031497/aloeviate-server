import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { login } from "../redux/features/auth/loginUserSlice";
import { useAppDispatch } from "../redux/store";
import { User } from "../types";

const Login: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = async (values: User) => {
    try {
      await dispatch(login(values));
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: "#f5f5f5", minHeight: "93vh" }}>
      <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => handleLogin(values)}>
        {() => (
          <Box component={Form} sx={{ display: "flex", flexDirection: "column", py: "5rem" }}>
            <Typography variant="h5" align="center">
              Login
            </Typography>
            <Field as={TextField} name="username" label="username" size="small" />
            <Field as={TextField} type="password" name="password" label="password" size="small" />
            <Button type="submit" size="small" sx={{ alignSelf: "center" }}>
              Login
            </Button>
          </Box>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
