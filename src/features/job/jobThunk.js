import { clearValues } from "./jobSlice";
import { logoutUser } from "../user/userSlice";
import customFetch from "../../utils/axios";
import {  hideLoading, getAllJobs } from "../job/allJobsSlice";


export const jobCreateThunk = async (job, thunkApi) => {
  try {
    const resp = await customFetch.post("/jobs", job);
    thunkApi.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkApi.dispatch(logoutUser());
      return thunkApi.rejectWithValue("Unauthorized! Logging Out... ");
    }
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
};

export const jobEditThunk = async ({ jobId, job }, thunkApi) => {
  try {
    const resp = customFetch.patch(`/jobs/${jobId}`, job);
    thunkApi.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    thunkApi.rejectWithValue(error.response.data.msg);
  }
};

export const jobDeleteThunk = async (jobId, thunkApi) => {
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`);
    thunkApi.dispatch(getAllJobs());
    return resp.data;
  } catch (error) {
    thunkApi.dispatch(hideLoading());
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
};
