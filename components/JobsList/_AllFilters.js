"use client"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { SET_JOBS_BASED_ON_FILTERS } from "../../Redux/actions"
import FilterField from "./_filterField"
import SearchFilter from "./_searchFilter"

// !definition of component
/**
 *
 * @param props --> None
 * @returns This component returns all the filters for search
 */
// ! component

export default function AllFilters() {
  const filtersData = useSelector((state) => state.filters)
  const jobs = useSelector((store) => store.jobs)
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState("")
  const [changedFilterOptions, setChangedFilterOptions] = useState(false)

  useEffect(() => {
    if (jobs?.jdList?.length > 0) {
      let filteredJobs = [...jobs.jdList]

      filtersData.forEach((filter) => {
        // Check if filterValues array is not empty
        if (filter.filterValues.length > 0 || filter.type === "Company Name") {
          // Apply filter based on the type of filter
          switch (filter.type) {
            case "Roles":
              // For multi-select filters, keep jobs that match any selected filter value
              if (filter.filterValues.length !== 0) {
                filteredJobs = filteredJobs?.filter((job) => {
                  return filter.filterValues.some((value) => value.toLowerCase() === job.jobRole.toLowerCase())
                })
              }
              break
            case "Remote":
              if (filter.filterValues.length !== 0) {
                filteredJobs = filteredJobs?.filter((job) => {
                  // Consider any location other than "Hybrid" or "Remote" as "In-office"
                  let location = ""
                  if (job.location === "remote") {
                    location = "Remote"
                  } else if (job.location === "hybrid") {
                    location = "Hybrid"
                  } else {
                    location = "In-office"
                  }

                  return filter.filterValues.includes(location)
                })
              }
              break
            case "Experience":
              // For single-select filters, keep jobs where the selected experience value falls within the range of minExp and maxExp
              if (filter.filterValues.length !== 0) {
                filteredJobs = filteredJobs.filter((job) => {
                  const selectedExp = parseInt(filter.filterValues[0]) // Assuming filterValues contains only one value
                  return selectedExp >= job.minExp && selectedExp <= job.maxExp
                })
              }
              break
            case "Minimum Base Pay":
              // For single-select filters, keep jobs that match the selected Minimum Base Pay
              if (filter.filterValues.length !== 0) {
                filteredJobs = filteredJobs.filter((job) => {
                  const selectedSalary = parseInt(filter.filterValues[0]) // Assuming filterValues contains only one value
                  return selectedSalary >= job.minJdSalary && selectedSalary <= job.maxJdSalary
                })
              }
              break
            case "Company Name":
              // For search filter, keep jobs that contain the search value in the company name
              if (searchValue) filteredJobs = filteredJobs.filter((job) => job.companyName.toLowerCase().includes(searchValue.toLowerCase()))
              break
            default:
              break
          }
        }
      })
      setChangedFilterOptions(false)
      dispatch({ type: SET_JOBS_BASED_ON_FILTERS, payload: filteredJobs })
    }
  }, [changedFilterOptions, jobs?.jdList?.length])

  return (
    <div className="w-100 d-flex flex-wrap align-items-center">
      {filtersData.map((filterField, index) => {
        if (filterField.type !== "Company Name") {
          return <FilterField data={filterField} key={filterField.type} setChangedFilterOptions={setChangedFilterOptions} />
        }
      })}
      <SearchFilter searchValue={searchValue} setSearchValue={setSearchValue} setChangedFilterOptions={setChangedFilterOptions} />
    </div>
  )
}
