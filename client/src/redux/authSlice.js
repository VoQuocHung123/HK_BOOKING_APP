import { createSlice } from "@reduxjs/toolkit";
import { changepPassword, login, logout, register } from "./apiRequest";
const initUser = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    accessToken: '',
};
console.log(initUser)

export const userSlice = createSlice({
    name: 'user',
    initialState: initUser,
    reducers: {
        refreshTokenInStore: (state, action)=>{
            state.accessToken = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(login.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(login.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload.details
            state.accessToken = action.payload.accessToken
            localStorage.setItem('user',JSON.stringify(action.payload.details))
        })
        builder.addCase(login.rejected,(state,action)=>{
            state.loading = false
            state.user = null
            state.error = action.payload
        })
        builder.addCase(logout.fulfilled,(state)=>{
            state.loading = false
            state.user = null
            state.error =null
            state.accessToken = ''
            localStorage.setItem('user',JSON.stringify(state.user))
        })
        builder.addCase(register.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(register.fulfilled,(state)=>{
            state.loading = false
            state.error = null
        })
        builder.addCase(register.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(changepPassword.pending,(state,action)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(changepPassword.fulfilled,(state,action)=>{
            state.pending = false
            state.error = null
            state.user = action.payload
        })
        builder.addCase(changepPassword.rejected,(state,action)=>{
            state.pending = false
            state.error = action.payload
        })
    }
})

export const {refreshTokenInStore} =  userSlice.actions
export default userSlice.reducer