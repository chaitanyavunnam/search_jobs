import React, { useState } from "react"
import { TextField, Menu, MenuItem } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import Style from "./jobslist.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { SET_FILTERS_DATA } from "../../Redux/actions"

const FilterField = ({ data }) => {
  const allFilters = useSelector((store) => store.filters)
  const dispatch = useDispatch()

  const [showFilterOptions, setShowFilterOptions] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"])

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setShowFilterOptions(false)
  }

  const handleInputChange = (event) => {
    const value = event.target.value
    setInputValue(value)
    if (value.trim() !== "") {
      setAnchorEl(event.currentTarget)
    }
  }

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))

  const addFilterOption = (option) => {
    const filterIndex = allFilters.findIndex((filter) => filter.type === data.type)
    const copyData = [...allFilters]
    if (data.multiSelect) {
      copyData[filterIndex].filterValues.push(option)
    } else {
      copyData[filterIndex].filterValues[0] = option
    }
    dispatch({ type: SET_FILTERS_DATA, payload: copyData })
  }

  const deteleFilterOption = (optionIndex) => {
    const filterIndex = allFilters.findIndex((filter) => filter.type === data.type)
    const copyData = [...allFilters]
    copyData[filterIndex].filterValues.splice(optionIndex, 1)
    dispatch({ type: SET_FILTERS_DATA, payload: copyData })
  }

  return (
    <div className="position-relative">
      <div
        className={`d-flex align-items-center ${Style.filter_box} me-2 py-1 ps-3 pe-2 mb-3`}
        onClick={(e) => {
          setShowFilterOptions(true)
          handleOpen(e)
        }}
      >
        <div className="d-flex flex-wrap align-items-center">
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
                      deteleFilterOption(index)
                      e.stopPropagation()
                    }}
                  />
                </div>
              )
            })
          )}
        </div>
        <div className="d-flex align-items-center">
          {data.filterValues.length > 0 && <FontAwesomeIcon icon={faXmark} color={`#cccccc`} size="25" className="pointer px-2" />}
          <FontAwesomeIcon icon={faChevronDown} color={`#cccccc`} size="25" className="pointer ps-2" style={{ borderLeft: "1px solid rgb(204, 204, 204)" }} />
        </div>
      </div>
      <Menu anchorEl={anchorEl} open={showFilterOptions} onClose={handleClose} className="w-100">
        {data?.options?.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              addFilterOption(option)
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default FilterField