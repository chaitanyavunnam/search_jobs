"use client"
import React, { useEffect, useState } from "react"
import SingleJobCard from "./_singleJobCard"
import { Spinner } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"

import Style from "./jobslist.module.scss"
import { SET_FETCHED_JOBS_DATA, SET_JOBS, SET_JOBS_BASED_ON_FILTERS, SET_OFFSET } from "../../Redux/actions"
import FilterField from "./_filterField"

export default function AllFilters(props) {
  const filtersData = useSelector((state) => state.filters)
  const dispatch = useDispatch()

  return (
    <div className="w-100 d-flex flex-wrap align-items-center">
      {filtersData.map((filterField, index) => {
        return <FilterField data={filterField} key={filterField.type} />
      })}
    </div>
  )
}
