import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import ListenMode from "./components/ListenMode";
import LanguageMode from "./components/LanguageMode";
import useWindowWidth from "@hooks/useWindowWidth";
interface SettingModalProps {
  open: boolean;
  onClose: () => void;
}
interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, index, value } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: "20px" }}>{children}</Box>}
    </div>
  );
}

export default function SettingModal({ open, onClose }: SettingModalProps) {
  const [value, setValue] = useState(0);
  const screenWidth = useWindowWidth();
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      slotProps={{
        paper: {
          sx: {
            width: "calc(100% - 40px)",
            maxWidth: "900px",
            minHeight: "420px",
            height: "auto",
            backgroundColor: "#151515",
            color: "white",
            borderRadius: "16px",
          },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h6">General settings</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          width: "100%",
          maxWidth: "900px",
          padding: "0px",
          borderColor: "rgb(84, 84, 84)",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: screenWidth < 568 ? "column" : "row",
          }}
        >
          <Box
            sx={{
              borderRight: screenWidth < 568 ? 0 : 1,
              borderColor: "rgb(84, 84, 84)",
              width: screenWidth < 568 ? "100%" : "32%",
            }}
          >
            <Tabs
              aria-label="basic tabs example"
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              orientation={screenWidth < 568 ? "horizontal" : "vertical"}
              sx={{
                "& .MuiTabs-indicator": {
                  display: "none",
                },
              }}
            >
              <Tab
                label="Listening mode"
                sx={{
                  "textTransform": "capitalize",
                  "color": "#ffffffa1",
                  "&.Mui-selected": {
                    color: "white",
                  },
                  "textAlign": screenWidth < 568 ? "center" : "left",
                  "display": "block",
                  "borderBottom": 1,
                  "borderColor": "rgb(84, 84, 84)",
                  "borderRight": screenWidth < 568 ? 1 : 0,
                  "borderRightColor": "rgb(84, 84, 84)",
                }}
              />
              <Tab
                label="Language"
                sx={{
                  "textTransform": "capitalize",
                  "color": "#ffffffa1",
                  "&.Mui-selected": {
                    color: "white",
                  },
                  "textAlign": screenWidth < 568 ? "center" : "left",
                  "display": "block",
                  "borderBottom": 1,
                  "borderColor": "rgb(84, 84, 84)",
                }}
              />
            </Tabs>
          </Box>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              width: "100%",
            }}
          >
            <CustomTabPanel value={value} index={0}>
              <ListenMode />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <LanguageMode />
            </CustomTabPanel>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px 20px",
        }}
      >
        <Button
          onClick={() => onClose()}
          sx={{
            padding: "10px 32px",
            backgroundColor: "rgb(255, 67, 25)",
            color: "white",
            borderRadius: "8px",
            textTransform: "capitalize",
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
