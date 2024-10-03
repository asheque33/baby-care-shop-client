import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { verifyToken } from "@/utils/decodedToken/verifyToken";
interface UserObject {
  name: string;
  email: string;
  role: string;
  iat?: string;
  exp?: string;
}
interface IUserState {
  user: UserObject | null;
  token: string | null;
}

const initialState: IUserState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.user = verifyToken(action.payload) as UserObject;
    },

    setLogOut: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});
export const { addUser, setLogOut } = authSlice.actions;
export const selectedUser = (state: RootState) => state.auth.user;
export const selectedToken = (state: RootState) => state.auth.token;
export const authReducer = authSlice.reducer;
