import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Content from "../../components/Content";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@redux/store";
import SettingModal from "../components/ModalSettingGeneral";
import { closeModalSetting, closeModalLogin } from "@redux/ModalSlice";
import useWindowWidth from "@hooks/useWindowWidth";
import LoginModal from "../components/ModalLogin";
import { Drawer } from "@mui/material";
import clsx from "clsx";
import BottomPlayer from "../components/BottomPlayer";
import MobileDownloadSnackBar from "../components/SnackBarDownload";
const HomeLayout = ({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  const screenWidth = useWindowWidth();
  const dispatch = useDispatch();
  const { isOpenModalLogin, isOpenModalSetting } = useSelector(
    (state: IRootState) => state.modal,
  );
  const { currentSong } = useSelector((state: IRootState) => state.player);
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenSideBar(newOpen);
  };
  return (
    <div {...props}>
      {screenWidth > 1024 ? (
        <SideBar />
      ) : (
        <Drawer
          anchor="left"
          open={openSideBar}
          onClose={toggleDrawer(false)}
          slotProps={{
            paper: {
              sx: {
                color: "white",
              },
            },
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <SideBar isDrawer closeDrawer={toggleDrawer(false)} />
        </Drawer>
      )}
      <Content
        className={clsx(
          "bg-[linear-gradient(#340707,#1B0606_20%,#090404)] min-h-screen",
          screenWidth > 1024 && "pl-[250px]",
        )}
      >
        <NavBar
          screenWidth={screenWidth}
          openSideBar={() => setOpenSideBar((prev) => !prev)}
        />
        {children}
      </Content>
      <SettingModal
        open={isOpenModalSetting}
        onClose={() => dispatch(closeModalSetting())}
      />
      <LoginModal
        open={isOpenModalLogin}
        onClose={() => dispatch(closeModalLogin())}
      />
      {currentSong && <BottomPlayer />}
      <MobileDownloadSnackBar />
    </div>
  );
};

export default HomeLayout;
