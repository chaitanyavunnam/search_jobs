import { SET_OFFSET, SET_JOBS, SET_JOBS_BASED_ON_FILTERS, SET_FETCHED_JOBS_DATA, SET_FILTERS_DATA } from "./actions"

const initialState = {
  offset: 0,
  jobs: {},
  fetchedJobsData: false,
  jobsBasedOnFilter: [],
  filters: [
    {
      type: "Roles",
      multiSelect: true,
      options: ["Bakcend", "Frontend", "Fullstack", "IOS", "Flutter", "Android", "Frontend", "Tech lead"],
      filterValues: [],
    },
    {
      type: "No Of Employees",
      multiSelect: true,
      options: ["1-10", "11-20", "21-50", "51-100", "101-200", "201-500", "500+"],
      filterValues: [],
    },
    {
      type: "Experience",
      multiSelect: false,
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      filterValues: [],
    },
    {
      type: "Remote",
      multiSelect: true,
      options: ["Hybrid", "In-office", "Remote"],
      filterValues: [],
    },
    {
      type: "Minimum Base Pay",
      multiSelect: false,
      options: [0, 10, 20, 30, 40, 50, 60, 70],
      filterValues: [],
    },
    {
      type: "Company Name",
      multiSelect: false,
      options: [],
      filterValues: [],
      searchValue: "",
    },
  ],
}

const JobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload,
      }
    case SET_JOBS:
      return {
        ...state,
        jobs: action.payload,
      }
    case SET_JOBS_BASED_ON_FILTERS:
      return {
        ...state,
        jobsBasedOnFilter: action.payload,
      }
    case SET_FETCHED_JOBS_DATA:
      return {
        ...state,
        fetchedJobsData: action.payload,
      }
    case SET_FILTERS_DATA:
      return {
        ...state,
        filters: action.payload,
      }
    default:
      return state
  }
}

export default JobsReducer
