"use client"
import React, { useEffect } from "react"
import SingleJobCard from "./_singleJobCard"
import { Spinner } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"

import Style from "./jobslist.module.scss"
import { SET_FETCHED_JOBS_DATA, SET_FETCHED_NEXT_JOBS_DATA, SET_JOBS, SET_OFFSET } from "../../Redux/actions"
import AllFilters from "./_AllFilters"

export default function JobsList(props) {
  const offset = useSelector((state) => state.offset)
  const jobs = useSelector((state) => state.jobs)
  const fetchedJobsData = useSelector((state) => state.fetchedJobsData)
  const fetchedNextJobsData = useSelector((state) => state.fetchedNextJobsData)
  const jobsBasedOnFilter = useSelector((state) => state.jobsBasedOnFilter)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchJobsData(offset)
  }, [offset])

  //This function is to fetch data for first time and also for infinite scroll
  function fetchJobsData(offset) {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const body = JSON.stringify({
      limit: 9,
      offset: offset,
    })

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    }
    if (jobs?.jdList?.length === 0) {
      dispatch({ type: SET_FETCHED_JOBS_DATA, payload: false })
    }
    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (jobs?.jdList?.length > 0) {
          // This for adding next api data to the old data
          const copyData = { ...jobs }
          copyData.jdList = [...copyData.jdList, ...result.jdList]
          dispatch({ type: SET_JOBS, payload: copyData })
          dispatch({ type: SET_FETCHED_NEXT_JOBS_DATA, payload: true })
        } else {
          //This is for setting the jobs data for the first time
          dispatch({ type: SET_JOBS, payload: result })
          dispatch({ type: SET_FETCHED_JOBS_DATA, payload: true })
        }
      })
      .catch((error) => {
        dispatch({ type: SET_FETCHED_NEXT_JOBS_DATA, payload: true })
        dispatch({ type: SET_FETCHED_JOBS_DATA, payload: true })
        console.error(error)
      })
  }

  function handleInfiniteScroll(e) {
    if (e.target.scrollTop + e.target.clientHeight + 2 >= e.target.scrollHeight && fetchedJobsData) {
      dispatch({ type: SET_OFFSET, payload: offset + 1 })
      dispatch({ type: SET_FETCHED_NEXT_JOBS_DATA, payload: false })
    }
  }

  return (
    <div className="w-100 h-100 d-flex flex-column px-4 py-4">
      <div className={`d-flex align-items-center px-5 ${Style.filters_div}`}>
        <AllFilters />
      </div>
      <div className={`d-flex flex-wrap w-100 px-4 ${Style.all_jobs_div}`} onScroll={handleInfiniteScroll}>
        {!fetchedJobsData ? (
          <div className="d-flex w-100 py-5">
            <Spinner className="mx-auto" />
          </div>
        ) : jobsBasedOnFilter.length === 0 ? (
          <p className="w-100 text-center py-5">No jobs available</p>
        ) : (
          jobsBasedOnFilter?.map((jobData, index) => {
            return <SingleJobCard key={index} data={jobData} />
          })
        )}
        {!fetchedNextJobsData && (
          <div className="d-flex w-100 py-5">
            <Spinner className="mx-auto" />
          </div>
        )}
      </div>
    </div>
  )
}
