import {alpha, styled, Switch, SwitchProps} from "@mui/material";

const GlobalSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({theme}) => ({
  "transitionDuration": "300ms",
  "& .MuiSwitch-switchBase": {
    "color": "#CECECE",
    "&:hover": {
      backgroundColor: alpha("#33333340", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked": {
    "color": "#FF4319",
    "&:hover": {
      backgroundColor: alpha("#FF4319", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#979797",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#FF4319",
  },
}));

export default GlobalSwitch;
