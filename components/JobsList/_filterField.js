import React, { useState } from "react"
import { Menu, MenuItem } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import Style from "./jobslist.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { SET_FILTERS_DATA } from "../../Redux/actions"

// !definition of component
/**
 *
 * @param props --> data, setChangedFilterOptions
 * @returns A single filter section
 */
// ! component

const FilterField = ({ data, setChangedFilterOptions }) => {
  const allFilters = useSelector((store) => store.filters)
  const dispatch = useDispatch()

  const [showFilterOptions, setShowFilterOptions] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  //This function is make the options dropdown expand for a filter
  const handleOpen = (event) => {
    setShowFilterOptions(true)
    setAnchorEl(event.currentTarget)
  }

  //This function is to close the options dropdown for a filter
  const handleClose = () => {
    setShowFilterOptions(false)
  }

  //This function is to add single filter value within a filter
  const addFilterOption = (option, option_index) => {
    const filterIndex = allFilters.findIndex((filter) => filter.type === data.type)
    const copyData = [...allFilters]

    if (data.multiSelect) {
      copyData[filterIndex].filterValues.push(option)
      copyData[filterIndex].options.splice(option_index, 1)
    } else {
      copyData[filterIndex].filterValues[0] = option
    }
    setChangedFilterOptions(true)
    dispatch({ type: SET_FILTERS_DATA, payload: copyData })
  }

  //This function is to remove single filter value within a filter
  const deteleFilterOption = (option, optionIndex) => {
    const filterIndex = allFilters.findIndex((filter) => filter.type === data.type)
    const copyData = [...allFilters]

    if (data.multiSelect) {
      copyData[filterIndex].filterValues.splice(optionIndex, 1)
      copyData[filterIndex].options.push(option)
    } else {
      copyData[filterIndex].filterValues.splice(optionIndex, 1)
    }
    setChangedFilterOptions(true)
    dispatch({ type: SET_FILTERS_DATA, payload: copyData })
  }

  //This function is to clear all the filter values of a single filter
  const clearAllFilterValues = () => {
    const filterIndex = allFilters.findIndex((filter) => filter.type === data.type)
    const copyData = [...allFilters]

    copyData[filterIndex].options = [...copyData[filterIndex].options, ...copyData[filterIndex].filterValues]
    copyData[filterIndex].filterValues = []

    setChangedFilterOptions(true)
    dispatch({ type: SET_FILTERS_DATA, payload: copyData })
  }

  return (
    <div className="position-relative">
      {data.filterValues.length > 0 && <p className={`mb-0 ${Style.filter_lable}`}>{data.type}</p>}
      <div
        className={`d-flex align-items-center ${Style.filter_box} me-2 py-1 ps-3 pe-2 mb-4`}
        onClick={(e) => {
          handleOpen(e)
        }}
      >
        <div className="d-flex flex-wrap align-items-center pe-2">
          {data.filterValues.length === 0 ? (
            <p className="m-0">{data.type}</p>
          ) : (
            data.filterValues.map((value, index) => {
              return (
                <div className={`d-flex align-items-center ${Style.filer_value} me-1 px-1 py-1`} key={value}>
                  <p className="mb-0 pe-2">{value}</p>
                  <FontAwesomeIcon
                    icon={faXmark}
                    color={`black`}
                    size="7"
                    className="pointer"
                    onClick={(e) => {
                      deteleFilterOption(value, index)
                      e.stopPropagation()
                    }}
                  />
                </div>
              )
            })
          )}
        </div>
        {data.options.length === 0 && data.filterValues.length === 0 ? null : (
          <div className="d-flex align-items-center">
            {data.filterValues.length > 0 && (
              <FontAwesomeIcon
                icon={faXmark}
                color={`#cccccc`}
                size="25"
                className="pointer px-2"
                onClick={(e) => {
                  e.stopPropagation()
                  clearAllFilterValues()
                }}
              />
            )}
            <FontAwesomeIcon icon={faChevronDown} color={`#cccccc`} size="25" className="pointer ps-2" style={{ borderLeft: "1px solid rgb(204, 204, 204)" }} />
          </div>
        )}
      </div>
      <Menu anchorEl={anchorEl} open={showFilterOptions} onClose={handleClose} className="w-100">
        {data?.options.length > 0 ? (
          data?.options?.map((option, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                addFilterOption(option, index)
                handleClose()
              }}
            >
              {option}
            </MenuItem>
          ))
        ) : (
          <p className="mb-0 w-100 px-4 text-center">No Options</p>
        )}
      </Menu>
    </div>
  )
}

export default FilterField
