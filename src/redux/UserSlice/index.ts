import { createSlice } from "@reduxjs/toolkit";
import { IUserInfo } from "@types/index";

export interface IUserState {
    isLoggedIn: boolean;
    userInfo: Partial<IUserInfo>;
    accessToken?: string;
    refreshToken?: string;
}
const initialState: IUserState = {
    isLoggedIn: false,
    userInfo: {}
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser(state, action) {
            const { accessToken, refreshToken, userInfo } = action.payload;
            state.isLoggedIn = true;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.userInfo = userInfo;
        },
        logoutUser() {
            return initialState;
        }
    }
})

export const { loginUser, logoutUser } = UserSlice.actions;
export default UserSlice.reducer;