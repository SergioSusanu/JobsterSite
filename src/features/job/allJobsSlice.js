import { createSlice } from "@reduxjs/toolkit"

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

const allJobs = createSlice({
    name: 'allJobs',
    initialState
})

export default allJobs.reducer