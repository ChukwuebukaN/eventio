import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMobile: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setIsMobile(state, action) {
          state.isMobile = action.payload
      }
    }
});

export const isMobile = state => state.user.isMobile;
export const { setIsMobile } = userSlice.actions;

export default userSlice.reducer;