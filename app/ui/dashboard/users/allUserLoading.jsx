import React from 'react'
import styles from './skleleton.module.css';

function AllUserLoading({nos}) {
  return (
    <>
      <div className="p-0 mt-2">
        <div className="grid grid-cols-1 gap-4">
          {
            [...new Array(nos)].map((item, index) => (
              <div key={index} className="flex flex-row w-full border-b">
                <div className=" w-[40%] px-2 py-1">
                  <h1 className={`${styles.skeleton} w-[60%] h-[10px] rounded mb-2`}></h1>
                  <p className={`${styles.skeleton} w-[100%] h-[7px] rounded mb-1`}></p>
                  <p className={`${styles.skeleton} w-[100%] h-[7px] rounded m-0`}></p>
                </div>
                <div className=" w-[30%] px-2 py-1">
                  <h1 className={`${styles.skeleton} w-[60%] h-[10px] rounded mb-2`}></h1>
                  <p className={`${styles.skeleton} w-[100%] h-[7px] rounded mb-1`}></p>
                  <p className={`${styles.skeleton} w-[100%] h-[7px] rounded m-0`}></p>
                </div>
                <div className=" w-[30%] px-2 py-1 mb-2">
                  <h1 className={`${styles.skeleton} w-[60%] h-[10px] rounded mb-2`}></h1>
                  <p className={`${styles.skeleton} w-[100%] h-[7px] rounded mb-1`}></p>
                  <p className={`${styles.skeleton} w-[100%] h-[7px] rounded m-0`}></p>
                </div>
                
                
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default AllUserLoading