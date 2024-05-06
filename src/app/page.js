"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import styles from "./page.module.css"

import JobsList from "../../components/JobsList"

export default function Home() {
  return (
    <div className={`${styles.main_div} pt-4`}>
      <JobsList />
    </div>
  )
}
