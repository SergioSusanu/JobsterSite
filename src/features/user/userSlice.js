import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import customFetch from '../../utils/axios'
import { toast } from "react-toastify"
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage"
import { loginUserThunk, registerUserThunk, updateUserThunk } from "./userThunk"


const initialState = {
    isLoading:false,
    isSidebarOpen:false,
    user: getUserFromLocalStorage()
}

export const registerUser = createAsyncThunk('user/registerUser',
async (user, thunkApi) =>{
   return registerUserThunk("/auth/register", user, thunkApi);
})

export const loginUser = createAsyncThunk('user/loginUser',
async (user, thunkApi) => {
    return loginUserThunk("/auth/login", user, thunkApi);
})

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user, thunkApi) => {
        return updateUserThunk("/auth/updateUser", user, thunkApi);
    }
    )

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen 
        },
        logoutUser: (state, {payload}) =>{
            state.user = null
            state.isSidebarOpen = false
            removeUserFromLocalStorage()
            if (payload) {
              toast.success(payload)
            }
        }
    },
     extraReducers:(builder)=>{
        builder
          .addCase(registerUser.pending, (state) => {
            console.log("pending");
            state.isLoading = true;
          })
          .addCase(registerUser.fulfilled, (state, resp) => {
            console.log("fulfilled");
            state.isLoading = false;
            if (typeof resp.payload != "undefined") {
              const { user } = resp.payload;
              state.user = user;
              toast.success(`Hello there ${user.name}`);
              addUserToLocalStorage(state.user);
            } else toast.error("some error");
          })
          .addCase(registerUser.rejected, (state, { payload }) => {
            console.log("rejected");
            state.isLoading = false;
            toast.error(payload);
          })
          .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(loginUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.user = payload.user;
            toast.success("Welcome back " + state.user.name);
            addUserToLocalStorage(state.user);
          })
          .addCase(loginUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          })
          .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.user = payload.user;
            toast.success("User updated " + state.user.name);
            addUserToLocalStorage(state.user);
          })
          .addCase(updateUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
          });
    }
})

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer