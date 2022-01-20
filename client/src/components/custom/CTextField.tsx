import { BaseTextFieldProps, TextField } from "@mui/material";
import React from "react";

interface Props extends BaseTextFieldProps {}

const CTextField: React.FC<Props> = ({ ...props }) => {
  return <TextField {...props} variant="outlined" size="small" />;
};

export default CTextField;
