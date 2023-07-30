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
            console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkApi.rejectWithValue('There was an error')
        }
        
    }
)

const allJobs = createSlice({
  name: "allJobs",
  initialState,
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export default allJobs.reducer