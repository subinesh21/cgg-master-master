"use client";
import React, { useEffect, useState } from "react";
import styles from "./userTableListClosed.module.css";
import Link from "next/link";
import Image from "next/image";
import { LiaPhoneVolumeSolid, LiaCalendarDaySolid } from "react-icons/lia";
import { IoLocationOutline, IoGiftOutline } from "react-icons/io5";
import { PiCreditCardLight } from "react-icons/pi";
import axios from "axios";
import AllUserLoading from "../allUserLoading";
import { MdSearch } from "react-icons/md";
import { Pagination } from "@mui/material";

function UserTableListClosed({ token, baseUrl }) {
    const [userLoading, setUserLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [serQuery, setSerQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getData(1)
    }, []);

    const getData = (pg) => {
        setUserLoading(true);
        const bodytxt = {
            search: serQuery,
        };
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        axios
            .post(`${baseUrl}folder/getAllClosed`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setAllUsers(result.data.leadList);
                    setUserLoading(false);
                } else {
                    console.log(result.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getIconLead = (leadType) => {
        let hello;
        if(leadType === "Instagram"){
          hello = "/icon/insta.png";
        }
        else if(leadType === "WhatsApp"){
          hello = "/icon/whatsapp.png";
        }
        else{
          hello = "/icon/direct.png";
        }
        return hello 
    }


    const getPayClass = (plan) => {
        let hello;
        if(plan === "New Order"){
          hello = "newOrder"
        }
        else if(plan === "Not Answering"){
          hello = "notanswering"
        }
        else if(plan === "Discuss with Family"){
          hello = "discusswithfamily"
        }
        else if(plan === "Not Interested"){
          hello = "notinterested"
        }
        else if(plan === "Confirmed, Yet to Pay"){
          hello = "confirmedyettopay"
        }
        else if(plan === "Confirmed, Paid Advance"){
          hello = "confirmedpaid"
        }
        else if(plan === "In-Transit"){
          hello = "intransit"
        }
        else if(plan === "Delivered, Settlement Pending"){
          hello = "deliveredsettlement"
        }
        else if(plan === "Order Completed"){
          hello = "ordercompleted"
        }
        else{
          hello = "";
        }
        return hello 
    }

      const getDateClass = (date) => {
        const today = new Date();
        const targetDate = new Date(date);

        if (targetDate.toLocaleDateString() == today.toLocaleDateString()) {
          return {color:"#d49b00"}; // Yellow for today's date
        } else if (targetDate < today) {
          return {color:"#d11800"}; // Red for past dates
        } else {
          return {color:"#19a600"}; // Green for future dates
        }
      };

     

      const dobString = (dob) => {
        if(dob==undefined){
            return `-`;
        }
        else{
            const monthss = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var dobDate = new Date(dob);
            const utfDateTime = new Date(dobDate.getTime() - (5.5 * 60 * 60 * 1000));
            var monthss1 = monthss;
            var date = utfDateTime.getDate();
            var month = monthss1[utfDateTime.getMonth()];
            var yearr = utfDateTime.getFullYear();
            var hourr = String(utfDateTime.getHours()).padStart(2, '0');
            var minn = String(utfDateTime.getMinutes()).padStart(2, '0');
            return `${date}-${month}-${yearr} ${hourr}:${minn}`;
        }
    };

    const highlightText = (text, highlight) => {
      if (!highlight.trim()) {
        return text;
      }
      const regex = new RegExp(`(${highlight})`, 'gi');
      const parts = text.split(regex);
      return parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} style={{ backgroundColor: '#ffd500' }}>{part}</span>
        ) : (
          part
        )
      );
    };

    return (<>
        <div className={styles.search}>
        <div className={styles.searchContainer}>
            <MdSearch />
            <input
                type="text"
                placeholder={"Search Here"}
                className={styles.input}
                // onChange={handleSearch}
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            </div>
        </div>
        {userLoading?
        <AllUserLoading nos={3}/>
        :
        <div id="content1" className={styles.table}>
            {allUsers.filter(item =>
            item.cusName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.cusMobile.includes(searchTerm)
          ).map((item, index) => {
                return (
                    
                    <div key={`userSingle${index}`} className={styles.singleUser}>
                        <div className={styles.userCard}>
                            <div>
                                <img src={getIconLead(item.cusLeadFrom)} alt={item.cusLeadFrom} width={45} height={45} />
                            </div>
                            <div className={styles.userInfo}>
                                <span className={styles.name}>{highlightText(item.cusName, searchTerm)}</span>
                                <Link target="_blank" href={"https://wa.me/91"+item.cusMobile} className={styles.trid}>{highlightText(item.cusMobile, searchTerm)}</Link>
                                <span className={styles.leadId}>{item.leadId}</span>
                            </div>
                        </div>
                        <div className={styles.group1}>
                            <div className={styles.loginInfo}>
                                <span className={styles.phoneNumber}>
                                    <IoLocationOutline className={styles.icon} /> {item.cusLocation}
                                </span>
                                <span className={styles.cardNumber}>
                                    <IoGiftOutline className={styles.icon} /> {item.cusQuantity}
                                </span>
                                <span className={styles.cardNumber}>
                                    <LiaCalendarDaySolid className={styles.icon} /> {dobString(item.eventDate)}
                                </span>
                            </div>

                            <div className={styles.plan}>
                                <span className={styles.lotTitle}>Dispatched Date</span>
                                <span style={getDateClass(item.dispatchDate)} className={styles.lotDate}>{dobString(item.dispatchDate)}</span>
                            </div>
                            
                        </div>
                        <div className={styles.group1}>
                            
                            <div className={styles.plan}>
                                <span className={getPayClass(item.orderStatus)}>{item.orderStatus}</span>
                            </div>
                            <div className={styles.plan}>
                                <Link href={`/dashboard/order/${item.leadId}`} className="text-white cursor-pointer bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-1 text-center mb-2">View</Link>
                            </div>
                        </div>
                        
                    </div>
                );
            })}
            
        </div>}
        </>
    );
}

export default UserTableListClosed;
