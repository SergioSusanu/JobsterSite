import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";

const initialFiltersState = {
    search : '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}

const initialState = {
    isLoading:true,
    jobs: [],
    totalJobs : 0,
    numOfPages : 1,
    page : 1,
    stats: {},
    monthlyApplications: [],
    ...initialFiltersState,
}

export const getStats = createAsyncThunk(
  'allJobs/getStats',
  async(_, thunkApi) => {
    try {
      const resp =await customFetch.get('/jobs/stats')
      console.log(resp.data);
      return resp.data
    } catch (error) {
      return thunkApi.rejectWithValue('error')
    }
  }
)

export const getAllJobs = createAsyncThunk(
    'allJobs/getJobs',
    async (_,thunkApi) => {
        let url = `/jobs`;
        try {
            const resp = await customFetch.get(url, {
              headers: {
                authorization: `Bearer ${thunkApi.getState().user.user.token}`,
              },
            });
          
            return resp.data;
        } catch (error) {
            return thunkApi.rejectWithValue('There was an error')
        }
        
    }
)

const allJobs = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
      state.jobs = payload.jobs;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [getStats.pending]: (state) => {
      state.isLoading = true;
    },
    [getStats.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.stats = payload.defaultStats
      state.monthlyApplications = payload.monthlyApplications
    },
    [getStats.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {showLoading, hideLoading} = allJobs.actions
export default allJobs.reducer