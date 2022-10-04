import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentvideo: null,
    loading: false,
    error: false,
   
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        fetchpending: (state)=>{
            state.loading = true
        },
        fetchsuccess: (state, action)=>{
            state.loading = false
            state.currentvideo = action.payload
        },
        fetchfailure: (state)=>{
            state.loading = false
            state.error = true
        },
        like: (state, action)=>{
            if(!state.currentvideo.likes.includes(action.payload)){
                state.currentvideo.likes.push(action.payload);
                state.currentvideo.dislikes.splice(
                    state.currentvideo.dislikes.findIndex(
                        (userId) => userId === action.payload
                    ), 1
                )
            }
        },
        dislike: (state, action)=>{
            if(!state.currentvideo.dislikes.includes(action.payload)){
                state.currentvideo.dislikes.push(action.payload);
                state.currentvideo.likes.splice(
                    state.currentvideo.likes.findIndex(
                        (userId) => userId === action.payload
                    ), 1
                )
            }
        },
        
       
    }
})

export const{fetchfailure, fetchpending, fetchsuccess, like, dislike} = videoSlice.actions
export default videoSlice.reducer