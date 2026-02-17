"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./leadList.module.css";
import Link from "next/link";
import { LiaPhoneVolumeSolid, LiaCalendarDaySolid } from "react-icons/lia";
import { IoLocationOutline, IoGiftOutline } from "react-icons/io5";
import SearchIcon from "@rsuite/icons/Search";
import VisibleIcon from "@rsuite/icons/Visible";
import PinIcon from '@rsuite/icons/Pin';

import axios from "axios";
import AllUserLoading from "../allUserLoading";
import { Button, IconButton, Input, InputGroup, Modal, Tooltip, Whisper } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

function LeadList({ token, baseUrl }) {
    const [userLoading, setUserLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [allLeads, setAllLeads] = useState([]);
    const [serQuery, setSerQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [impLoading, setImpLoading] = useState([]);
    const [folloLoading, setFolloLoading] = useState("");
    const [eventLoading, setEventLoading] = useState("");
    const [statusLoading, setStatusLoading] = useState("");
    const [openEventDtEdit, setOpenEventDtEdit] = useState(false);
    const [openEventLeadId, setOpenEventLeadId] = useState(false);
    const [eventDate1, setEventDate1] = useState("");

    const [openStatusEdit, setOpenStatusEdit] = useState(false);
    const [openCallWhatsapp, setOpenCallWhatsapp] = useState(false);

    const [selName, setSelName] = useState("");
    const [selMobile, setSelMobile] = useState("");
    


    const serQueryMobRef = useRef(null);
    const serQueryNameRef = useRef(null);
  
    const addLoadingItem = (item) => {
        if (item) {
            setImpLoading((prevItems) => [...prevItems, item]); // Add the new item to the array
        }
      };
    
      // Function to remove an element from the array by value
      const removeLoadingItem = (value) => {
        setImpLoading((prevItems) => prevItems.filter((item) => item !== value)); // Remove the item matching the value
      };

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
            .post(`${baseUrl}folder/getAllLeads`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    const sortedData = [...result.data.leadList].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                    setAllLeads(sortedData);
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

    const handleMobileNumberChange = (val) => {
        let input = val;
        input = input.replace(/[^0-9+]/g, "");
        if (input.startsWith("+91")) {
            input = input.slice(3);
        }
        if (input.length > 10) {
            input = input.slice(input.length - 10);
        }
        setSearchTerm(input);
        if (serQueryNameRef.current) {
            serQueryNameRef.current.value = "";
        }
    };

    const handleNameChange = (val) => {
        setSearchTerm(val);
        if (serQueryMobRef.current) {
            serQueryMobRef.current.value = "";
        }
    };

    const filterSerRes = (dataaa) => {
        const res = dataaa.filter((item) => item.cusName.toLowerCase().includes(searchTerm.toLowerCase()) || item.cusMobile.includes(searchTerm));
        return res;
    };

    const groupData = (datta) => {
        const groupedData = datta.reduce((acc, item) => {
            const date = new Date(item.eventDate);
            const utfDateTime = new Date(date.getTime() - 5.5 * 60 * 60 * 1000);
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const monthYear = `${monthNames[utfDateTime.getMonth()]} - ${utfDateTime.getFullYear()}`; // Format: "YYYY-MM"

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

        result = result.sort((a, b) => {
            if (a.monthYear === "January - 1970") return 1; // Move to end
            if (b.monthYear === "January - 1970") return -1;
            return 0; // Keep other order unchanged
        });

        return result;
    };

    const markImportent = (leid, isImp) => {
        addLoadingItem(leid);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: leid,
            search: serQuery,
            isImportant:isImp,
        };
        axios
            .post(`${baseUrl}folder/markImportentBulk`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    const sortedData = [...result.data.leadList].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                    setAllLeads(sortedData);
                    removeLoadingItem(leid);

                } else {
                    console.log(result.data);
                    removeLoadingItem(leid);
                    toast(result.data.message, {position: "top-center", type:"error"});

                }
            })
            .catch((e) => {
                removeLoadingItem(leid);
                toast("Check your Internet", {position: "top-center", type:"error"});

            });

    }

    const handleLastContact = (leadidd) => {
        const userConfirmed = window.confirm("Are you sure to change Last Contacted as Today?");
        if (userConfirmed) {
            // console.log("User clicked yes " + leadidd);
            handleNextWeek(todayDate(), leadidd)
        } else {
          console.log("User clicked No");
        }
    };

    const handleNextWeek = (nextDattt, leadid) => {
        setFolloLoading(leadid)
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: leadid,
            search: serQuery,
            followUpDate:nextDattt,
        };
        axios
            .post(`${baseUrl}folder/changeFollowDateBulk`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    const sortedData = [...result.data.leadList].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                    setAllLeads(sortedData);
                    setFolloLoading("")
                } else {
                    toast(result.data.message, {position: "top-center", type:"error"});
                    setFolloLoading("")
                }
            })
            .catch((e) => {
                toast("Check your Internet", {position: "top-center", type:"error"});
                setFolloLoading("")
            });
        
    };

    const todayDate = () => {
        var dobDate = new Date();
        return dobDate;
    }

    const getEventDatebyLeadId = (leadid) => {
        const selectedUserData = allLeads.filter(item => item.leadId === leadid)
        return selectedUserData[0]
    }

    const handleEventDtOpen = (leadid) => {
        let tempDate;
        if(getEventDatebyLeadId(leadid).eventDate==undefined){
            tempDate = new Date()
        }
        else{
            tempDate = new Date(getEventDatebyLeadId(leadid).eventDate)
        }
        setEventDate1(tempDate.toISOString().slice(0, 16))
        setOpenEventLeadId(leadid)
        setOpenEventDtEdit(true)
    };
    const handleEventDtClose = () => {
        setOpenEventDtEdit(false)
    };
    const handleEventDtSave = () => {
        setEventLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: openEventLeadId,
            search: serQuery,
            eventDate:eventDate1,
        };
        axios
            .post(`${baseUrl}folder/changeEventDateBulk`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    const sortedData = [...result.data.leadList].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                    setAllLeads(sortedData);
                    setEventLoading(false);
                    setOpenEventDtEdit(false)
                } else {
                    toast(result.data.message, {position: "top-center", type:"error"});
                    setEventLoading(false);
                    setOpenEventDtEdit(false)
                }
            })
            .catch((e) => {
                toast("Check your Internet", {position: "top-center", type:"error"});
                setEventLoading(false);
                setOpenEventDtEdit(false)
            });
        
    };

    const openStatusDialog = (idddd) => {
        setOpenEventLeadId(idddd)
        setOpenStatusEdit(true)
    }

    const handleStatusSave = (orderLabel, orderStatus) => {
        setStatusLoading(openEventLeadId);
        setOpenStatusEdit(false)
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: openEventLeadId,
            orderLabel:orderLabel,
            orderStatus:orderStatus,
        };
        axios
            .post(`${baseUrl}folder/changeOrderStatusBulk`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    const sortedData = [...result.data.leadList].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                    setAllLeads(sortedData);
                    setStatusLoading("");
                } else {
                    toast(result.data.message, {position: "top-center", type:"error"});
                    setStatusLoading("");
                }
            })
            .catch((e) => {
                toast("Check your Internet", {position: "top-center", type:"error"});
                setStatusLoading("");
            });
        
    };

    const openMobileOptions = (selNameIn, selMobIn) => {
        setSelName(selNameIn)
        setSelMobile(selMobIn)
        setOpenCallWhatsapp(true)
    }

    return (
        <>
            <Modal open={openEventDtEdit} onClose={handleEventDtClose}>
                <Modal.Header>
                    <Modal.Title>Edit Event Date</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input value={eventDate1} onChange={setEventDate1} type="datetime-local"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleEventDtSave} loading={eventLoading} appearance="primary">
                        Save
                    </Button>
                    <Button onClick={handleEventDtClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal open={openStatusEdit} onClose={() => setOpenStatusEdit(false)}>
                <Modal.Header>
                    <Modal.Title>Change Order Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div onClick={()=>handleStatusSave("Lead", "New Order")} style={{padding:15, borderBottom:"1px solid #DDD", cursor:"pointer"}} className="newOrder">New Order</div>
                    <div onClick={()=>handleStatusSave("Lead", "Not Answering")} style={{padding:15, borderBottom:"1px solid #DDD", cursor:"pointer"}} className="notanswering">Not Answering</div>
                    <div onClick={()=>handleStatusSave("Lead", "Discuss with Family")} style={{padding:15, borderBottom:"1px solid #DDD", cursor:"pointer"}} className="discusswithfamily">Discuss with Family</div>
                    <div onClick={()=>handleStatusSave("Closed", "Not Interested")} style={{padding:15, cursor:"pointer"}} className="notinterested">Not Interested</div>
                </Modal.Body>
                
            </Modal>

            <Modal open={openCallWhatsapp} onClose={() => setOpenCallWhatsapp(false)}>
                <Modal.Header>
                    <Modal.Title>{selName} - {selMobile}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Link href={"tel:+91"+selMobile} className={styles.callWhatsapp} >Call Now</Link>
                    <Link href={"https://wa.me/91" + selMobile} className={styles.callWhatsapp} >WhatsApp Message</Link>
                </Modal.Body>
                
            </Modal>
            <div className={styles.search}>
                <Whisper trigger="focus" placement="top" speaker={<Tooltip>Search by Name or Phone Number Here</Tooltip>}>
                    <InputGroup inside style={{ width: 200 }}>
                        <InputGroup.Addon>
                            <SearchIcon />
                        </InputGroup.Addon>
                        <Input ref={serQueryNameRef} onChange={(val) => handleNameChange(val)} placeholder="Name Search" />
                    </InputGroup>
                </Whisper>


                {/* <div className={styles.searchContainer}>
            <MdSearch />
            <input
                type="text"
                placeholder={"Mobile Number Search"}
                className={styles.input}
                // onChange={handleSearch}
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            </div> */}
            </div>

            {userLoading ? (
                <AllUserLoading nos={3} />
            ) : (
                <div id="content1" className={styles.table}>
                    {
                        // Object.entries(groupData(filterSerRes(allLeads))).forEach(([key, value]) => {
                        groupData(filterSerRes(allLeads)).map((item, index) => {
                            return (
                                <div className={styles.monthBox}  key={`month-${index}`}>
                                    <div className={styles.monthTitle}>
                                        <span>{item.monthYear === "January - 1970"?"No Event Date Available":item.monthYear}</span>
                                        <span>{item.items.length} Leads</span>
                                    </div>
                                    <div className={styles.monthContent}>
                                        {item.items.length !== 0 ? (
                                            <div>
                                                {item.items.map((itemm, indexx) => {
                                                    return (
                                                        <div key={`userSingle${indexx}`} style={itemm.isImportant === "Yes" ? { backgroundColor: "#ffefa6" } : {}} className={styles.singleUser}>
                                                            <div className={styles.updatedInfo}>Lead Created On: {dobString(itemm.createdAt)} | Last Updated: {dobString(itemm.updatedAt)}</div>
                                                            <div className={styles.group1}>
                                                                <div onClick={()=>openMobileOptions(itemm.cusName, itemm.cusMobile)} className={styles.userCard}>
                                                                    <div className={styles.leadImage}>
                                                                        <img src={getIconLead(itemm.cusLeadFrom)} alt={itemm.cusLeadFrom} width={40} height={40} />
                                                                    </div>
                                                                    <div className={styles.userInfo}>
                                                                        <span className={styles.name}>{highlightText(itemm.cusName, searchTerm)}</span>
                                                                        <span className={styles.trid}>{highlightText(itemm.cusMobile, searchTerm)}</span>
                                                                        <span className={styles.leadId}>{itemm.leadId}</span>
                                                                    </div>
                                                                </div>
                                                                <div className={styles.orderDetails}>
                                                                    <span className={styles.phoneNumber}>
                                                                        <IoLocationOutline className={styles.icon} /> {itemm.cusLocation}
                                                                    </span>
                                                                    <span className={styles.cardNumber}>
                                                                        <IoGiftOutline className={styles.icon} /> {itemm.cusQuantity}
                                                                    </span>
                                                                    {/* <span className={styles.cardNumber}>
                                                                        <LiaCalendarDaySolid className={styles.icon} /> <strong>{dobString(itemm.eventDate)}</strong>
                                                                    </span> */}
                                                                </div>
                                                                <div onClick={()=>handleEventDtOpen(itemm.leadId)} className={styles.eventDate}>
                                                                    <span className={styles.lotTitle}>Event Date</span>
                                                                    <span style={getDateClass(itemm.eventDate)} className={styles.lotDate}>
                                                                        {dobString(itemm.eventDate)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className={styles.group3}>
                                                                <div onClick={() => openStatusDialog(itemm.leadId)} style={{cursor:"pointer"}} className={styles.plan}>
                                                                {
                                                                    statusLoading === itemm.leadId?
                                                                        <RotatingLines strokeColor="green" strokeWidth="5" animationDuration="0.75" width="22" />
                                                                    :
                                                                    <span className={getPayClass(itemm.orderStatus)}>{itemm.orderStatus}</span>
                                                                }
                                                                </div>
                                                                <div className={styles.plan}>
                                                                    <div className={styles.buttonGroup}>
                                                                    <IconButton href={`/dashboard/order/${itemm.leadId}`} size="sm" color="green" appearance="primary" icon={<VisibleIcon />} />
                                                                    <IconButton onClick={()=>markImportent(itemm.leadId, itemm.isImportant === "Yes" ? "No" : "Yes")} loading={impLoading.includes(itemm.leadId)} disabled={impLoading.includes(itemm.leadId)} size="sm" color="orange" appearance={itemm.isImportant === "Yes" ? "primary" : "ghost"} icon={<PinIcon />} />
                                                                </div>
                                                                </div>
                                                                <div onClick={() => handleLastContact(itemm.leadId)} style={{cursor:"pointer"}} className={styles.plan}>
                                                                    
                                                                    {
                                                                        folloLoading === itemm.leadId?
                                                                            <RotatingLines strokeColor="green" strokeWidth="5" animationDuration="0.75" width="22" />
                                                                        :
                                                                        <>
                                                                            <span className={styles.lotTitle}>Last Contacted</span>
                                                                            <span style={getDateClass(itemm.followUpDate)} className={styles.lotDate}>
                                                                                {dobString(itemm.followUpDate)}
                                                                            </span>
                                                                        </>
                                                                    }
                                                                    
                                                                </div>
                                                                <div className={styles.remarkContainer}>
                                                                  
                                                                  <span className={styles.remarkText}>{itemm.remarks==undefined?<span style={{color:"#CCC"}}>No Remarks</span>:itemm.remarks}</span>
                                                                </div>
                                                                {/* <Link href={`/dashboard/leads/${itemm.leadId}`} className="text-white cursor-pointer bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-1 text-center">View</Link> */}
                                                            </div>
                                                            <div className={styles.groupMobileOnly}>
                                                                  <span className={styles.remarkTextMobile}>{itemm.remarks==undefined?<span style={{color:"#CCC"}}>No Remarks</span>:itemm.remarks}</span>
                                                                {/* <Link href={`/dashboard/leads/${itemm.leadId}`} className="text-white cursor-pointer bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-1 text-center">View</Link> */}
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

export default LeadList;
