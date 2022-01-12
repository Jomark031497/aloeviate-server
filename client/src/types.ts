import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface Task {
  id: string;
  name: string;
  duration: string;
  elapsed: string;
  isCompleted: boolean;
  icon: JSX.Element | OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}
