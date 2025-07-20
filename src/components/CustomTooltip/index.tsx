import { styled, Tooltip, TooltipProps } from "@mui/material";

interface CustomTooltipProps extends TooltipProps {
  className?: string;
  children: React.ReactElement;
  title: string | React.ReactElement;
}
const CustomTooltip = styled(
  ({ className, children, ...props }: CustomTooltipProps) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
      title={props.title}
      arrow
      placement={props.placement || "top"}
      PopperProps={{
        modifiers: [{ name: "offset", options: { offset: [0, -6] } }],
      }}
    >
      {children}
    </Tooltip>
  ),
)(() => ({
  "& .MuiTooltip-tooltip": {
    backgroundColor: "#000000BF",
    color: "#FFFFFF",
    borderRadius: "4px",
    padding: "6px 8px",
    fontSize: "12px",
    fontWeight: "400",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .MuiTooltip-arrow": {
    color: "#000000BF",
  },
}));

export default CustomTooltip;
