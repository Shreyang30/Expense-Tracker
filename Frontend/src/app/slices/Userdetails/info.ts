import {createSlice,PayloadAction} from '@reduxjs/toolkit'
//import type {RootState} from '../../store'

interface UserState {
    user: { name: string; email: string } | null;
    token: string | null;
  }

const initialState : UserState ={
    user:null,
    token:null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<{ user: { name: string; email: string }; token: string }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      },
      clearUser: (state) => {
        state.user = null;
        state.token = null;
      },
    },
  });
  
  export const { setUser, clearUser } = userSlice.actions;
  export default userSlice.reducer;