import { Button, ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  label: string;
}

const CButton: React.FC<Props> = ({ ...props }) => {
  return (
    <Button {...props} size="small">
      {props.label}
    </Button>
  );
};

export default CButton;
