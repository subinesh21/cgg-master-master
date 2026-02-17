import React from 'react'
import styles from "./skull.module.css"

function DashboardList() {
  return (
    <>
      <div className="p-0 mt-2">
        <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-row w-full border-b h-10 bg-amber-300">
                <div className=" w-[10%]  px-4 py-3">
                  <div className={`${styles.skeleton} w-[100%] h-[10px] rounded-lg`}></div>
                </div>
                
                <div className=" w-[50%] px-4 py-3">
                  <h1 className={`${styles.skeleton} w-[60%] h-[10px] rounded mb-4`}></h1>
                  
                </div>
                <div className=" w-[10%] px-4 py-3">
                  <h1 className={`${styles.skeleton} w-[60%] h-[10px] rounded mb-4`}></h1>
                  
                </div>
                <div className=" w-[15%] px-4 py-3">
                  <h1 className={`${styles.skeleton} w-[60%] h-[10px] rounded mb-4`}></h1>
                  
                </div>
                <div className=" w-[15%] px-4 py-3 mb-4">
                  <h1 className={`${styles.skeleton} w-[60%] h-[10px] rounded mb-4`}></h1>
                  
                </div>
                
                
              </div>
          {
            [...new Array(6)].map((item,index) => (
              <div key={index} className="flex flex-row w-full border-b">
                <div className=" w-[10%] px-4 py-3">
                  <div className={`${styles.skeleton} w-[100%] h-[100%] rounded-lg`}></div>
                </div>
                
                <div className=" w-[50%] px-4 py-3">
                  <h1 className={`${styles.skeleton} w-[60%] h-[10px] rounded mb-4`}></h1>
                  <p className={`${styles.skeleton} w-[20%] h-[7px] rounded mb-2`}></p>
                  <p className={`${styles.skeleton} w-[100%] h-[7px] rounded`}></p>
                </div>
                <div className=" w-[10%] px-4 py-3">
                  <h1 className={`${styles.skeleton} w-[60%] h-[10px] rounded mb-4`}></h1>
                  
                </div>
                <div className=" w-[15%] px-4 py-3">
                  <h1 className={`${styles.skeleton} w-[60%] h-[10px] rounded mb-4`}></h1>
                  
                </div>
                <div className=" w-[15%] px-4 py-3 mb-4">
                  <h1 className={`${styles.skeleton} w-[60%] h-[10px] rounded mb-4`}></h1>
                  
                </div>
                
                
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default DashboardList