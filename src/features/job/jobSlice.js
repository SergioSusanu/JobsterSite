import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { jobCreateThunk, jobDeleteThunk, jobEditThunk } from "./jobThunk";

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
  jobCreateThunk
);

export const editJobId = createAsyncThunk(
  "job/editJobId",
  jobEditThunk
)

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  jobDeleteThunk
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