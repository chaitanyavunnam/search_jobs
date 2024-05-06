"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"

import Style from "./jobslist.module.scss"

export default function SingleJobCard({ data }) {
  return (
    <div className={`${Style.single_job_card_div} d-flex pointer`}>
      <div className={`w-100 h-100 d-flex flex-column px-4 py-3 ${Style.single_job_card_child}`}>
        <div className="d-flex align-items-start mb-2">
          <Image src={data.logoUrl} alt="logo" height={50} width={50} />
          <div className="d-flex flex-column ps-2">
            <p className="mb-0" style={{ fontSize: "13px", fontWeight: "600", color: "#8b8b8b" }}>
              {data.companyName}
            </p>
            <p className="mb-1" style={{ fontSize: "14px" }}>
              {data.jobRole}
            </p>
            <p className="mb-0" style={{ fontSize: "11px", fontWeight: "500" }}>
              {data.location}
            </p>
          </div>
        </div>
        <p style={{ fontSize: "14px", fontWeight: "400", color: "rgb(77, 89, 106)" }}>
          Estimated Salary: ₹{data.minJdSalary || 0} - {data.maxJdSalary}LPA
        </p>
        <div className="d-flex flex-column">
          <p className="mb-0" style={{ fontSize: "1rem", fontWeight: "500" }}>
            About Company:
          </p>
          <p style={{ fontSize: "14px" }}>{data.jobDetailsFromCompany}</p>
        </div>
        <div className="d-flex flex-column">
          <p className="mb-0" style={{ fontSize: "13px", fontWeight: "600", color: "#8b8b8b" }}>
            Minimum Experience
          </p>
          <p style={{ fontSize: "14px" }}>
            {data.minExp} {data.minExp > 1 ? `years` : `year`}
          </p>
        </div>
        <button className={`${Style.apply_btn} w-100 py-2`}>⚡ Easy Apply</button>
      </div>
    </div>
  )
}
