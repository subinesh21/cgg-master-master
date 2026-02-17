"use client";
import React, { useEffect, useState } from "react";
import styles from "./confirmedList.module.css";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import AllUserLoading from "../allUserLoading";
import { MdSearch } from "react-icons/md";
import { FaCakeCandles } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import VisibleIcon from "@rsuite/icons/Visible";
import { IconButton } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";

function ConfirmedList({ token, baseUrl }) {
    const [userLoading, setUserLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [allReceipts, setAllReceipts] = useState([])
    const [serQuery, setSerQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getData(1);
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
            .post(`${baseUrl}folder/getAllConfirm`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setAllUsers(result.data.leadList);
                    setAllReceipts(result.data.receipts)
                    setUserLoading(false);
                } else {
                    console.log(result.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getIconLead = (leadType) => {
        let hello;
        if (leadType === "Instagram") {
            hello = "/icon/insta.png";
        } else if (leadType === "WhatsApp") {
            hello = "/icon/whatsapp.png";
        } else {
            hello = "/icon/direct.png";
        }
        return hello;
    };

    const getPayClass = (plan) => {
        let hello;
        if (plan === "New Order") {
            hello = "newOrder";
        } else if (plan === "Not Answering") {
            hello = "notanswering";
        } else if (plan === "Discuss with Family") {
            hello = "discusswithfamily";
        } else if (plan === "Not Interested") {
            hello = "notinterested";
        } else if (plan === "Confirmed, Yet to Pay") {
            hello = "confirmedyettopay";
        } else if (plan === "Confirmed, Paid Advance") {
            hello = "confirmedpaid";
        } else if (plan === "In-Transit") {
            hello = "intransit";
        } else if (plan === "Delivered, Settlement Pending") {
            hello = "deliveredsettlement";
        } else if (plan === "Order Completed") {
            hello = "ordercompleted";
        } else {
            hello = "";
        }
        return hello;
    };

    const getDateClass = (date) => {
        const today = new Date();
        const targetDate = new Date(date);

        if (targetDate.toLocaleDateString() == today.toLocaleDateString()) {
            return { color: "#d49b00" }; // Yellow for today's date
        } else if (targetDate < today) {
            return { color: "#d11800" }; // Red for past dates
        } else {
            return { color: "#19a600" }; // Green for future dates
        }
    };

 

    const dobString = (dob) => {
        if (dob == undefined) {
            return `-`;
        } else {
            const monthss = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var dobDate = new Date(dob);
            const utfDateTime = new Date(dobDate.getTime() - 5.5 * 60 * 60 * 1000);
            var monthss1 = monthss;
            var date = utfDateTime.getDate();
            var month = monthss1[utfDateTime.getMonth()];
            var yearr = utfDateTime.getFullYear();
            // var hourr = String(utfDateTime.getHours()).padStart(2, "0");
            // var minn = String(utfDateTime.getMinutes()).padStart(2, "0");
            return `${date}-${month}-${yearr}`;
        }
    };

    const highlightText = (text, highlight) => {
        if (!highlight.trim()) {
            return text;
        }
        const regex = new RegExp(`(${highlight})`, "gi");
        const parts = text.split(regex);
        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <span key={index} style={{ backgroundColor: "#ffd500" }}>
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    const filterSerRes = (dataaa) => {
        const res = dataaa.filter((item) => item.cusName.toLowerCase().includes(searchTerm.toLowerCase()) || item.cusMobile.includes(searchTerm));
        return res;
    };

    const getTotalAmount = (jsonArr) =>{
        let totAmt = 0
        jsonArr.map((item)=>{
            totAmt = totAmt + (Number(item.itemQty) * Number(item.itemPrice))
        })
        return totAmt;
    }

    const getTotalReceived = (leadId) =>{
        const userPayments = allReceipts.filter(item => item.custId === leadId)
        let totRec = 0
        userPayments.map((item)=>{
            totRec = totRec + Number(item.recAmount)
        })
        return totRec;
    }

    function formatToINR(number) {
        const numString = number.toString();
        const [whole, decimal] = numString.split('.');
        const lastThreeDigits = whole.slice(-3);
        const otherDigits = whole.slice(0, -3);
        const formattedWhole = otherDigits !== '' 
          ? otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThreeDigits 
          : lastThreeDigits;
        return `₹${formattedWhole}${decimal ? '.' + decimal : ''}`;
      }

    const groupData = (datta) => {
        const groupedData = datta.reduce((acc, item) => {
            const date = new Date(item.dispatchDate);
            const utfDateTime = new Date(date.getTime() - 5.5 * 60 * 60 * 1000);

            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var dateStr = utfDateTime.getDate();
            var monthStr = monthNames[utfDateTime.getMonth()];
            var yearrStr = utfDateTime.getFullYear();
            const monthYear = `${dateStr} - ${monthStr} - ${yearrStr}`; // Format: "YYYY-MM"

            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }
            acc[monthYear].push(item);

            return acc;
        }, {});

        let result = Object.entries(groupedData).map(([monthYear, items]) => ({
            monthYear,
            items,
        }));

        // result = result.sort((a, b) => {
        //     if (a.monthYear === "January - 1970") return 1; // Move to end
        //     if (b.monthYear === "January - 1970") return -1;
        //     return 0; // Keep other order unchanged
        // });

        return result;
    };

    return (
        <>
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
            {userLoading ? (
                <AllUserLoading nos={3} />
            ) : (
                <div id="content1" className={styles.table}>
                    {
                        // Object.entries(groupData(filterSerRes(allLeads))).forEach(([key, value]) => {
                        groupData(filterSerRes(allUsers)).map((item, index) => {
                            return (
                                <div className={styles.monthBox} key={`month-${index}`}>
                                    <div className={styles.monthTitle}>
                                        <span>{item.monthYear === "January - 1970" ? "No Dispatch Date Mentioned" : item.monthYear}</span>
                                        <span>Number of Orders: {item.items.length} </span>
                                        </div>
                                    <div className={styles.monthContent}>
                                        {item.items.length !== 0 ? (
                                            <div>
                                                {item.items.map((itemm, indexx) => {
                                                    return (
                                                        <div key={`iii${indexx}`} className={styles.singleUser}>
                                                            <div key={`userSingle${indexx}`} className={styles.singleUserDetails}>
                                                                <div className={styles.group1}>
                                                                    <div className={styles.userCard}>
                                                                        <div>
                                                                            <img src={getIconLead(itemm.cusLeadFrom)} alt={itemm.cusLeadFrom} width={45} height={45} />
                                                                        </div>
                                                                        <div className={styles.userInfo}>
                                                                            <span className={styles.name}>{highlightText(itemm.cusName, searchTerm)}</span>
                                                                            <Link target="_blank" href={"https://wa.me/91" + itemm.cusMobile} className={styles.trid}>
                                                                                {highlightText(itemm.cusMobile, searchTerm)}
                                                                            </Link>
                                                                            <span className={styles.leadId}><IoLocationOutline className={styles.icon} /> {itemm.cusLocation}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className={styles.loginInfo}>
                                                                        <div className={styles.orders}>
                                                                            {itemm.OrderDetails.map((item1, index1) => {
                                                                                return (
                                                                                    <span key={`order${index1}`} className={styles.cardNumber}>
                                                                                        {item1.itemDesc} (₹{item1.itemPrice}) - {item1.itemQty} pcs
                                                                                    </span>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    <div className={styles.plan}>
                                                                        <span className={styles.lotTitle}>Total Amount</span>
                                                                        <span className={styles.lotDate}>
                                                                            {formatToINR(getTotalAmount(itemm.OrderDetails))}
                                                                        </span>
                                                                    </div>
                                                                    <div className={styles.plan}>
                                                                        <span className={styles.lotTitle}>Received Amount</span>
                                                                        <span className={styles.lotDate}>
                                                                            {formatToINR(getTotalReceived(itemm.leadId))}
                                                                        </span>
                                                                    </div>
                                                                    {/* <div className={styles.loginInfo}>
                                                                        <span className={styles.cardNumber}>
                                                                            <FaCakeCandles className={styles.icon} /> {dobString(itemm.eventDate)}
                                                                        </span>
                                                                        <span className={styles.phoneNumber}>
                                                                            <IoLocationOutline className={styles.icon} /> {itemm.cusLocation}
                                                                        </span>
                                                                    </div> */}
                                                                </div>
                                                                {/* <div className={styles.group2}>
                                                                    <div className={styles.loginInfo}>
                                                                        {itemm.OrderDetails.map((item1, index1) => {
                                                                            return (
                                                                                <span key={`order${index1}`} className={styles.cardNumber}>
                                                                                    {item1.itemDesc} - {item1.itemQty} (₹{item1.itemPrice}) = ₹{Number(item1.itemPrice) * Number(item1.itemQty)}
                                                                                </span>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div> */}
                                                                <div className={styles.group3}>
                                                                    <div className={styles.plan}>
                                                                        <span className={styles.lotTitle}>Dispatch Date</span>
                                                                        <span style={getDateClass(itemm.dispatchDate)} className={styles.lotDate}>
                                                                            {dobString(itemm.dispatchDate)}
                                                                        </span>
                                                                        <span className={styles.lotTitle1}>Event Date</span>
                                                                        <span style={getDateClass(itemm.dispatchDate)} className={styles.lotDate1}>
                                                                            {dobString(itemm.dispatchDate)}
                                                                        </span>
                                                                    </div>
                                                                    <div className={styles.plan}>
                                                                        <span className={getPayClass(itemm.orderStatus)}>{itemm.orderStatus}</span>
                                                                    </div>
                                                                    <div className={styles.plan}>
                                                                        <div>
                                                                            <IconButton href={`/dashboard/order/${itemm.leadId}`} size="sm" color="cyan" appearance="primary" icon={<VisibleIcon />}>
                                                                                View
                                                                            </IconButton>
                                                                        </div>
                                                                        {/* <Link href={`/dashboard/confirmed/${itemm.leadId}`} className="text-white cursor-pointer bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-1 text-center mb-2">View</Link> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className={styles.remarkss}>
                                                                <FaInfoCircle color="#ffbb00" className={styles.icon} /> <span>{itemm.remarks || " - "}</span>
                                                            </div>
                                                            
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <span style={{ fontSize: 12 }}>No Leads on this month</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            )}
        </>
    );
}

export default ConfirmedList;
