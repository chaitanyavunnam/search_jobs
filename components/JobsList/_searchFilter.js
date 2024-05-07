import React from "react"
import FormControl from "@mui/material/FormControl"
import Input from "@mui/material/Input"

import Style from "./jobslist.module.scss"

// !definition of component
/**
 *
 * @param props --> searchValue, setSearchValue, setChangedFilterOptions
 * @returns The filter based on company name
 */
// ! component

const SearchFilter = ({ searchValue, setSearchValue, setChangedFilterOptions }) => {
  return (
    <div className="position-relative">
      {searchValue.length > 0 && <p className={`mb-0 ${Style.filter_lable}`}>Company Name</p>}
      <div className={`d-flex align-items-center ${Style.filter_box} me-2 py-1 ps-3 pe-2 mb-4`}>
        <FormControl fullWidth variant="standard">
          <Input
            id="Company Name"
            placeholder="Company Name"
            type="text"
            onChange={(e) => {
              setSearchValue(e.target.value)
              setChangedFilterOptions(true)
            }}
            className={`${Style.search_input} `}
            value={searchValue}
            disableUnderline={true}
          />
        </FormControl>
      </div>
    </div>
  )
}

export default SearchFilter
