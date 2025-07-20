import { createSlice } from "@reduxjs/toolkit";
interface ModalState {
  isOpenModalSetting: boolean;
  isOpenModalLogin: boolean;
}
const initialState: ModalState = {
  isOpenModalSetting: false,
  isOpenModalLogin: false,
};
const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalSetting: (state) => {
      state.isOpenModalSetting = true;
    },
    closeModalSetting: (state) => {
      state.isOpenModalSetting = false;
    },
    openModalLogin: (state) => {
      state.isOpenModalLogin = true;
    },
    closeModalLogin: (state) => {
      state.isOpenModalLogin = false;
    },
  },
});

export default ModalSlice.reducer;
export const {
  openModalSetting,
  closeModalSetting,
  openModalLogin,
  closeModalLogin,
} = ModalSlice.actions;
