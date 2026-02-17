import React from 'react'
import styles from "./skull.module.css"

function DashboardSideBar() {
  return (
    <div className=" w-full flex flex-col gap-5 mt-10">
        <div className={`${styles.skeleton} w-[100%] h-72 rounded-2xl`}></div>
        <div className={`${styles.skeleton} w-[100%] h-72 rounded-2xl`}></div>
        <div className={`${styles.skeleton} w-[100%] h-72 rounded-2xl`}></div>
    </div>
  )
}

export default DashboardSideBar