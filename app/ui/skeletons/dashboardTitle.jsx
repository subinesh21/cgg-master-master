import React from 'react'
import styles from "./skull.module.css"

function DashboardTitle() {
  return (
    <div className=" w-full h-8 flex gap-4 m-2">
        <div className={`${styles.skeleton} w-[60%] h-8 rounded-lg`}></div>
        
    </div>
  )
}

export default DashboardTitle