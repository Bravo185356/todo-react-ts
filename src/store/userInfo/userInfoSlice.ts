import { createSlice } from "@reduxjs/toolkit";

interface UserInfo {
    userInfo: any,
    isLogined: Boolean
}

const initialState: UserInfo = {
    userInfo: {},
    isLogined: false
}

const userInfo = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo(state, actions) {
            state.userInfo = actions.payload
        },
        toggleLogin(state) {
            state.isLogined = !state.isLogined
        }
    }
})

export const {setUserInfo, toggleLogin} = userInfo.actions
export default userInfo.reducer;
