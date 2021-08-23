import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: null,
    isSignedIn: 'false'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signinUser(state, action) {
            const { token, isSignedIn } = action.payload;

            state.token = token
            state.isSignedIn = isSignedIn
        },
        signupUser(state, action) {
            const { token } = action.payload;
            state.token = token
        }
    }
});

export const authenticatedUser = state => state.auth.isSignedIn;
export const accessUser = state => state.auth.token;
export const { signinUser, signupUser } = authSlice.actions;

export default authSlice.reducer;