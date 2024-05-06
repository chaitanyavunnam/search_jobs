"use client"
import React, { useEffect, useState } from "react"
import SingleJobCard from "./_singleJobCard"
import { Spinner } from "react-bootstrap"

import Style from "./jobslist.module.scss"

export default function JobsList(props) {
  const [offset, setOffset] = useState(0)
  const [jobs, setJobs] = useState({})
  const [fetchedJobsData, setFetchedJobsData] = useState(false)
  const [jobsBasedOnFilter, setJobsBasedOnFilter] = useState([])

  useEffect(() => {
    fetchJobsData(offset)
  }, [offset])

  useEffect(() => {
    if (jobs?.jdList?.length > 0) {
      setJobsBasedOnFilter(jobs.jdList)
    }
  }, [fetchedJobsData])

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
    setFetchedJobsData(false)
    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (jobs?.jdList?.length > 0) {
          const copyData = { ...jobs }
          copyData.jdList = [...copyData.jdList, ...result.jdList]
          setJobs(copyData)
        } else {
          setJobs({ ...result })
        }
        setFetchedJobsData(true)
      })
      .catch((error) => console.error(error))
  }

  function handleInfiniteScroll(e) {
    console.log("hello", e.target.scrollTop + e.target.clientHeight, e.target.scrollHeight)
    if (e.target.scrollTop + e.target.clientHeight + 2 >= e.target.scrollHeight && fetchedJobsData) {
      console.log("hii")
      setOffset((prevState) => prevState + 1)
    }
  }

  return (
    <div className="w-100 h-100 d-flex flex-column px-4">
      <div className={`d-flex align-items-center ${Style.filters_div}`}></div>
      {/* { Add filters here } */}
      <div className={`d-flex flex-wrap w-100 px-5 ${Style.all_jobs_div}`} onScroll={handleInfiniteScroll}>
        {jobsBasedOnFilter?.map((jobData, index) => {
          return <SingleJobCard key={index} data={jobData} />
        })}
        {!fetchedJobsData && (
          <div className="d-flex w-100 ">
            <Spinner className="mx-auto" />
          </div>
        )}
      </div>
    </div>
  )
}
