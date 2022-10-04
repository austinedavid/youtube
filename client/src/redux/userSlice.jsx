import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentuser: null,
    loading: false,
    error: false,
   
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginpending: (state)=>{
            state.loading = true
        },
        loginsuccess: (state, action)=>{
            state.loading = false
            state.currentuser = action.payload
        },
        loginfailure: (state)=>{
            state.loading = false
            state.error = true
        },
        logout: (state)=>{
            state.error = false
            state.loading = false
            state.currentuser = null
        },
        subscription: (state,action)=>{
            if(state.currentuser.subscribedUser.includes(action.payload)){
                state.currentuser.subscribedUser.splice(
                    state.currentuser.subscribedUser.findIndex(
                        (channelId) => channelId === action.payload
                    ), 1
                )
            }else{
                state.currentuser.subscribedUser.push(action.payload)
            }
        }
       
    }
})

export const{loginfailure, loginpending, loginsuccess, logout, subscription} = userSlice.actions
export default userSlice.reducer