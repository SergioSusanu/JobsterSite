import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { logoutUser } from "../user/userSlice";
import {showLoading, hideLoading, getAllJobs} from '../job/allJobsSlice'

const initialState= {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    jobId:'',
}

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkApi) => {
    try {
      const resp = await customFetch.post("/jobs", job, {
        headers: {
          Authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      thunkApi.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkApi.dispatch(logoutUser());
        return thunkApi.rejectWithValue("Unauthorized! Logging Out... ");
      }
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const editJobId = createAsyncThunk(
  "job/editJobId",
  async({jobId, job},thunkApi) => {
    try {
    
      const resp = customFetch.patch(`/jobs/${jobId}`, job, {
        headers: {
          Authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      thunkApi.dispatch(clearValues())
      return resp.data
    } catch (error) {
      thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkApi) => {
    try {
      const resp = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      thunkApi.dispatch(getAllJobs())
      return resp.data
    } catch (error) {
      thunkApi.dispatch(hideLoading())
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return { ...initialState };
    },
    editJob:(state, {payload}) =>{
      return {...initialState, isEditing:true, ...payload }
    }
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job created!");
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteJob.fulfilled]: (state) => {
      toast.success("Job removed successfully.");
    },
    [deleteJob.rejected]: () => {
      toast.error("Error - Couldn't delete job");
    },
    [editJobId.pending]: (state) => {
      state.isLoading = true;
    },
    [editJobId.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job edited succesfully!");
    },
    [editJobId.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});



export const {handleChange, clearValues, editJob} = jobSlice.actions;
export default jobSlice.reducer;