"use client";
import React, { useEffect, useState } from "react";
import styles from "./addAdminForm.module.css";
import axios from "axios";
import { TextField } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";
import CloseOutlineIcon from '@rsuite/icons/CloseOutline';

import RemindIcon from '@rsuite/icons/legacy/Remind';
import { FaWhatsapp, FaUserAstronaut  } from "react-icons/fa6";
import { GiScales } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";

import { Button, DatePicker, IconButton, Input, InputGroup, Modal, Radio, RadioGroup, RadioTile, RadioTileGroup, SelectPicker, Text } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { toast } from "react-toastify";
import Link from "next/link";

function AddAdminForm({ token, baseUrl }) {
    const [newLoginID, setNewLoginID] = useState("");
    const [idLoading, setIdLoading] = useState(false);
    const [whatsappNo, setWhatsappNo] = useState("");
    const [cusName, setCusName] = useState("");
    const [totalQuantity, setTotalQuantity] = useState("");
    const [delLocation, setDelLocation] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [cusLeadFrom, setCusLeadFrom] = useState("Instagram");
    const [open, setOpen] = useState(false);

    const [userLoading, setUserLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [allNumbers, setAllNumbers] = useState([]);

    const [errorr, setErrorr] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseNo = () => {
        setWhatsappNo("")
        setCusName("")
        setTotalQuantity("")
        setDelLocation("")
        setEventDate("")
        setCusLeadFrom("Instagram")
        setOpen(false)
        toast.warning("Adding Duplicate number aborded by user", {
            position: "top-center"
        });
    };

    const handleCreateAdmin = (multi) => {
        setOpen(false);
        if (whatsappNo.length === 10) {
            setIdLoading(true)
            const config = {
                headers: { Authorization: "Bearer " + token },
            };
            const bodytxt = {
                cusMobile:whatsappNo,
                cusLeadFrom:cusLeadFrom,
                cusName:cusName,
                cusLocation:delLocation,
                cusQuantity:totalQuantity,
                eventDate:eventDate,
                multiple:multi,
            };
            axios
                .post(`${baseUrl}folder/createLead`, bodytxt, config)
                .then((result) => {
                    if (result.data.success) {
                        setWhatsappNo("")
                        setCusName("")
                        setTotalQuantity("")
                        setDelLocation("")
                        setEventDate("")
                        setCusLeadFrom("Instagram")
                        setAllUsers(result.data.leadList);
                        setAllNumbers(result.data.serList);
                        toast.success(result.data.message, {
                            position: "top-center"
                        });
                        setTimeout(() => {
                            setIdLoading(false)
                        }, 1500);
                    } else {
                        if(result.data.message==="WhatsApp Number is Already Enrolled"){
                            handleOpen()
                            setIdLoading(false)
                        }
                        else{
                            setIdLoading(false)
                            console.log(result.data);
                            toast.error(result.data.message, {
                                position: "top-center"
                            });
                        }
                    }
                })
                .catch((err) => {
                    setIdLoading(false)
                    toast.error("Error Notification !", {
                        position: "top-center"
                    });
                });
        } else {
            toast.error("WhatsApp Number is Mandatary", {
                position: "top-center"
            });
        }
    };
    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        setUserLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        axios
            .get(`${baseUrl}folder/get100Leads`, config)
            .then((result) => {
                if (result.data.success) {
                    setAllUsers(result.data.leadList);
                    setAllNumbers(result.data.serList);
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

    const dobStringCreated = (dob) => {
        if(dob==undefined){
            return `-`;
        }
        else{
            const monthss = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var dobDate = new Date(dob);
            const utfDateTime = new Date(dobDate.getTime());
            var monthss1 = monthss;
            var date = utfDateTime.getDate();
            var month = monthss1[utfDateTime.getMonth()];
            var yearr = utfDateTime.getFullYear();
            var hourr = String(utfDateTime.getHours()).padStart(2, '0');
            var minn = String(utfDateTime.getMinutes()).padStart(2, '0');
            return `${date}-${month}-${yearr} ${hourr}:${minn}`;
        }
    };

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

    const checkHours = (datee) => {
        const createdDt = new Date(datee);
        const today = new Date();
        const utfDateTime = new Date(today.getTime() - (5.5 * 60 * 60 * 1000));
        if(createdDt>utfDateTime){
            return false;
        }
        else{
            return true;
        }
    }

    const handleMobileNumberChange = (val) => {
        let input = val;
        input = input.replace(/[^0-9+]/g, '');
        if (input.startsWith('+91')) {
          input = input.slice(3);
        }
        if (input.length > 10) {
          input = input.slice(input.length - 10);
        }
        setWhatsappNo(input);
        const existingCustomer = allNumbers.find(
            (customer) => customer.cusMobile === input
        );
        if (existingCustomer) {
            setErrorr(`Already exists (${existingCustomer.cusName} - ${existingCustomer.orderStatus})`);
        } else {
            setErrorr(''); // No error if the mobile number doesn't exist
        }
    };

    return (
        <div>
            <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
                <Modal.Body>
                    <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
                    WhatsApp Number is Already Exist? Do you want to add again?
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={()=>handleCreateAdmin("yes")} appearance="primary">
                    Yes
                </Button>
                <Button onClick={handleCloseNo} appearance="subtle">
                    No
                </Button>
                </Modal.Footer>
            </Modal>
            <div className={styles.addForm}>
                <div className="col-span-4 sm:col-span-2">
                <InputGroup>
                    <InputGroup.Addon>
                        <FaWhatsapp />
                    </InputGroup.Addon>
                    <Input type="number" maxLength={10} value={whatsappNo} onChange={handleMobileNumberChange} placeholder="WhatsApp Number" />
                </InputGroup>
                <span style={{fontSize:12, color:"red", lineHeight:"normal"}}>{errorr}</span>
                </div>
                <div className="col-span-4 sm:col-span-2">
                <InputGroup >
                    <InputGroup.Addon>
                        <FaUserAstronaut  />
                    </InputGroup.Addon>
                    <Input value={cusName} onChange={setCusName} placeholder="Name" />
                </InputGroup>
                </div>
                
                <InputGroup className="col-span-4 sm:col-span-2">
                    <InputGroup.Addon>
                        <GiScales  />
                    </InputGroup.Addon>
                    <Input value={totalQuantity} type="number" onChange={setTotalQuantity} placeholder="Quantity" />
                </InputGroup>
                <InputGroup className="col-span-4 sm:col-span-2">
                    <InputGroup.Addon>
                        <IoLocationOutline  />
                    </InputGroup.Addon>
                    <Input value={delLocation} onChange={setDelLocation} placeholder="Location" />
                </InputGroup>
                <InputGroup className="col-span-4 sm:col-span-2">
                    <InputGroup.Addon>
                        <BsCalendar2Date  />
                    </InputGroup.Addon>
                    <Input value={eventDate} onChange={setEventDate} type="datetime-local" placeholder="Event Date"/>
                </InputGroup>
                <RadioGroup name="leadFrom" inline value={cusLeadFrom} onChange={setCusLeadFrom}>
                    <Radio value="Instagram">Instagram</Radio>
                    <Radio value="WhatsApp">WhatsApp</Radio>
                    <Radio value="Others">Others</Radio>
                </RadioGroup>

            </div>
            <div className={styles.button}>
                <Button disabled={idLoading} loading={idLoading} color="green" onClick={() => handleCreateAdmin("no")} appearance="primary">
                    CREATE NEW LEAD
                </Button>
            </div>
            {userLoading?<div style={{display:"flex", alignItems:"center", justifyContent:"center"}}><RotatingLines visible={true} height="30" width="30" color="grey" strokeWidth="5" animationDuration="0.75" ariaLabel="rotating-lines-loading"/></div>
            :
            <div id="content2" className={styles.table}>
                {
                    allUsers.map((item, index) => {
                        return (
                            
                            <div key={`leadSingle${index}`} className={styles.singleUser}>
                                <div className={styles.userCard}>
                                    <div>
                                        <img src={getIconLead(item.cusLeadFrom)} alt={item.cusLeadFrom} width={30} height={30} />
                                    </div>
                                    <div className={styles.userInfo}>
                                        <span className={styles.name}>{item.cusName}</span>
                                        <span className={styles.leadId}>{item.leadId}</span>
                                    </div>
                                </div>
                                <div className={styles.group1}>
                                    <div className={styles.loginInfo}>
                                        <span className={styles.phoneNumber}>
                                            {item.cusMobile}
                                        </span>
                                    </div>
        
                                    <div className={styles.plan}>
                                        <span className={styles.lotTitle}>Created At</span>
                                        <span className={styles.phoneNumber}>{dobStringCreated(item.createdAt)}</span>
                                    </div>
                                    
                                </div>
                                <div className={styles.group1}>
                            
                                    <div className={styles.plan}>
                                        <span className={getPayClass(item.orderStatus)}>{item.orderStatus}</span>
                                    </div>
                                    <div className={styles.plan}>
                                        <div>
                                        <IconButton color="red" size="xs" disabled={checkHours(item.createdAt)} appearance="primary" icon={<CloseOutlineIcon />} >Not Interested</IconButton>
                                    </div></div>
                                </div>
                                
                            </div>
                        );
                    })
                }

            </div>
            }
            
        </div>
    );
}

export default AddAdminForm;
