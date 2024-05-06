"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import styles from "./page.module.css"
import { Provider } from "react-redux"
import store from "../../Redux/store"

import JobsList from "../../components/JobsList"

export default function Home() {
  return (
    <Provider store={store}>
      <div className={`${styles.main_div} pt-4`}>
        <JobsList />
      </div>
    </Provider>
  )
}
