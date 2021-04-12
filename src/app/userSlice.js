import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: {},
};

// cấu hình slice
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserName: (state, action) => {
            state.username = action.payload;
        }
    }
})

// export actions
export const { updateUserName } = userSlice.actions;

// lấy ra state username của user slice
export const selectUserName = (state) => state.user.username;

// export reducers
export default userSlice.reducer;