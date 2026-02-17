"use client"
import React, { useState } from 'react'
import styles from './navbar.module.css'
import { MdOutlineWifi, MdNotificationsNone, MdOutlineSettings, MdLogout } from "react-icons/md";
import { usePathname } from 'next/navigation';
import { logout } from '@/app/lib/actions';
import { RotatingLines } from 'react-loader-spinner';


function Navbar() {
    // const [overlay, setOverlay] = useState(false)
    const pathName = usePathname()
    const getTitle = (path) => {
        let content = {}
        if(path==="/dashboard")
        {
            content = {
                title:"Dashboard",
                disc:"Your central hub for accessing and analyzing key data and insights."
            }
        }
   
        else if(path==="/dashboard/leads"){
            content = {
                title:"Leads",
                disc:"All Leads from Whatsapp/Instagram/LinkedIn"
            }
        }
        else if(path==="/dashboard/add-lead"){
            content = {
                title:"Add New Lead",
                disc:"Create New Lead Manually and it can be update any time"
            }
        }
        else if(path==="/dashboard/confirmed"){
            content = {
                title:"Order Confirmed",
                disc:"Only those who are paid the advance are listed here"
            }
        }
        else if(path==="/dashboard/closed"){
            content = {
                title:"Order Closed",
                disc:"Completed orders and rejected orders here"
            }
        }
        
        else{
            if(path.split("/")[2]==="admin"){
                content = {
                    title:"Lead Information",
                    disc:"All Leads from Whatsapp/Instagram/LinkedIn"
                }
            }
            else if(path.split("/")[2]==="leads"){
                content = {
                    title:"Leads Information",
                    disc:"Lead Information are detailed here"
                }
            }
            else if(path.split("/")[2]==="order"){
                content = {
                    title:"Order/Lead Information",
                    disc:"Here you can edit the Order Information, Change the Order Status"
                }
            }
            else if(path.split("/")[2]==="confirmed"){
                content = {
                    title:"Order Information",
                    disc:"Confirmed Order details and change info"
                }
            }
            else if(path.split("/")[2]==="confirmed"){
                content = {
                    title:"Closed Order",
                    disc:"Completed/Rejaected Order"
                }
            }
            else{
                content = {
                    title:"",
                    disc:""
                }
            }
        }
        return content

    }

    const logoutfunc = async () => {
        await logout()
    }
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={`${styles.title} uppercase`}>{getTitle(pathName).title}</div>
            <div className={styles.disc}>{getTitle(pathName).disc}</div>
        </div>
        <div className={styles.buttons}>
            <div className={styles.iconBtn}><MdOutlineWifi /></div>
            <div className={styles.iconBtn}><MdNotificationsNone /></div>
            <div className={styles.iconBtn}><MdOutlineSettings /></div>
            <form action={logoutfunc}>
                <button className={styles.iconBtn}><MdLogout /></button>
            </form>
            
        </div>
        {/* {overlay && <div className={styles.overlay}><RotatingLines strokeColor='white' strokeWidth="5" animationDuration="0.75" width="22" /></div>} */}
        
    </div>
  )
}

export default Navbar