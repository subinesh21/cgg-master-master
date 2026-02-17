import React from 'react'
import styles from "./skull.module.css"

function DashboardTop() {
  return (
    <div className=" w-full flex gap-4 flex-col m-2 md:flex-row">
        <div className={`${styles.skeleton} w-[100%] h-32 rounded-xl`}></div>
        <div className={`${styles.skeleton} w-[100%] h-32 rounded-xl`}></div>
        <div className={`${styles.skeleton} w-[100%] h-32 rounded-xl`}></div>
        <div className={`${styles.skeleton} w-[100%] h-32 rounded-xl`}></div>
    </div>
  )
}

export default DashboardTop