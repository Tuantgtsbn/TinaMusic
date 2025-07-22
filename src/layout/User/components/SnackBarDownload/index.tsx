import React, { useState, useEffect } from "react";
import {
  Snackbar,
  Alert,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Smartphone, Download, Close } from "@mui/icons-material";

const MobileDownloadSnackBar = () => {
  const [open, setOpen] = useState(false);
  const [deviceType, setDeviceType] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  // Phát hiện thiết bị và set link download
  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();

      if (/iphone|ipad|ipod/.test(userAgent)) {
        setDeviceType("iOS");
        setDownloadLink("https://apps.apple.com/app/your-app-id"); // Thay bằng link App Store thực
      } else if (/android/.test(userAgent)) {
        setDeviceType("Android");
        setDownloadLink(
          "https://play.google.com/store/apps/details?id=com.tinasoft.tinamusic",
        ); // Thay bằng link Google Play thực
      } else {
        // Desktop hoặc thiết bị khác - có thể không hiển thị hoặc hiển thị link tổng quát
        setDeviceType("Mobile");
        setDownloadLink("#");
      }
    };

    // Kiểm tra xem đã từng dismiss chưa
    const isDismissed = localStorage.getItem("mobile-download-dismissed");

    if (!isDismissed) {
      detectDevice();
      // Hiển thị sau 2 giây
      const timer = setTimeout(() => {
        setOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDownload = () => {
    window.open(downloadLink, "_blank");
    handleClose();
  };

  const handleClose = (
    _event?: Event | React.SyntheticEvent<any, Event>,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    // Lưu trạng thái đã dismiss để không hiện lại
    localStorage.setItem("mobile-download-dismissed", "true");
  };

  const getStoreText = () => {
    switch (deviceType) {
      case "iOS":
        return "App Store";
      case "Android":
        return "Google Play";
      default:
        return "App Store";
    }
  };

  const getDeviceText = () => {
    switch (deviceType) {
      case "iOS":
        return "iPhone/iPad";
      case "Android":
        return "Android";
      default:
        return "di động";
    }
  };

  return (
    <Snackbar
      open={open}
      onClose={(event, reason) => handleClose(event, reason)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      autoHideDuration={null} // Không tự động ẩn
      sx={{
        "& .MuiSnackbarContent-root": {
          minWidth: "320px",
          maxWidth: "400px",
        },
      }}
    >
      <Alert
        severity="info"
        variant="filled"
        sx={{
          "width": "100%",
          "color": "white",
          "backgroundColor": "#1976d2",
          "& .MuiAlert-icon": {
            color: "white",
          },
        }}
        icon={<Smartphone />}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={(event) => handleClose(event, "iconClick")}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      >
        <Box>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Tải ứng dụng di động
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Trải nghiệm tốt hơn với ứng dụng của chúng tôi trên{" "}
            {getDeviceText()}!
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              startIcon={<Download />}
              onClick={handleDownload}
              sx={{
                "backgroundColor": "white",
                "color": "#1976d2",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Tải từ {getStoreText()}
            </Button>
            <Button
              size="small"
              variant="text"
              onClick={handleClose}
              sx={{
                "color": "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Để sau
            </Button>
          </Box>
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default MobileDownloadSnackBar;
