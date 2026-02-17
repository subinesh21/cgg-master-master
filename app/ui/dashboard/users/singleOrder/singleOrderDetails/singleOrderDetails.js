"use client";
import React, { useEffect, useState } from "react";
import styles from "./singleOrderDetails.module.css";
import { MdOutlineLocationOn, MdOutlineDiscount  } from "react-icons/md";
import { BsBoxes } from "react-icons/bs";
import { FaTruckArrowRight } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import TrashIcon from '@rsuite/icons/Trash';
import { toast } from "react-toastify";
import axios from "axios";
import { Button, IconButton, Input, InputGroup, Modal, SelectPicker } from "rsuite";
import 'rsuite/dist/rsuite.min.css';
import AllUserLoading from "../../allUserLoading";
import Link from "next/link";
import { hamperSku } from "@/app/lib/data";
import { FaBoxes } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";


const productList = hamperSku.map(
    item => ({ label: item.hampName, value: item.hampName })
);


const receiptList = [
    'GPay', 
    'PhonePe', 
    'Cash', 
    'Bank Transfer',  
].map(
    item => ({ label: item, value: item })
);
const orderList = [
    { label: "New Order", value: "Lead|New Order" }, 
    { label: "Not Answering", value: "Lead|Not Answering" }, 
    { label: "Discuss with Family", value: "Lead|Discuss with Family" }, 
    { label: "Confirmed, Yet to Pay", value: "Confirm|Confirmed, Yet to Pay" }, 
    { label: "Confirmed, Paid Advance", value: "Confirm|Confirmed, Paid Advance" },
    { label: "In-Transit", value: "Confirm|In-Transit" },
    { label: "Delivered, Settlement Pending", value: "Confirm|Delivered, Settlement Pending" },
    { label: "Order Completed", value: "Closed|Order Completed" },
    { label: "Not Interested", value: "Closed|Not Interested" },
 
]

function SingleOrderDetails({ token, baseUrl, trid }) {
    const [selectedUserData, setSelectedUserData] = useState({});
    const [selectedReceiptData, setSelectedReceiptData] = useState([]);
    const [userLoading, setUserLoading] = useState(true);
    const [nameLoading, setNameLoading] = useState(false);
    const [mobLoading, setMobLoading] = useState(false);
    const [eventDtLoading, setEventDtLoading] = useState(false);
    const [locLoading, setLocLoading] = useState(false);
    const [qtyLoading, setQtyLoading] = useState(false);
    const [dispatchLoading, setDispatchLoading] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false);
    const [remarkLoading, setRemarkLoading] = useState(false);
    const [impLoading, setImpLoading] = useState(false);
    const [addOrderLoading, setAddOrderLoading] = useState(false);
    const [removeOrderLoading, setRemoveOrderLoading] = useState("");
    const [removeReceiptLoading, setRemoveReceiptLoading] = useState("");
    const [addReceiptLoading, setAddReceiptLoading] = useState(false);

    const [openNameEdit, setOpenNameEdit] = useState(false);
    const [openMobileEdit, setOpenMobileEdit] = useState(false);
    const [openEventDtEdit, setOpenEventDtEdit] = useState(false);
    const [openLocationEdit, setOpenLocationEdit] = useState(false);
    const [openQtyEdit, setOpenQtyEdit] = useState(false);
    const [openDDEdit, setOpenDDEdit] = useState(false);
    const [openFDEdit, setOpenFDEdit] = useState(false);
    const [openStatusEdit, setOpenStatusEdit] = useState(false);
    const [openRemarkEdit, setOpenRemarkEdit] = useState(false);
    const [openAddOrderEdit, setOpenAddOrderEdit] = useState(false);
    const [openAddReceiptEdit, setOpenAddReceiptEdit] = useState(false);
    

    const [cusName1, setCusName1] = useState("");
    const [cusMobile1, setCusMobile1] = useState("");
    const [eventDate1, setEventDate1] = useState("");
    const [cusLocation1, setCusLocation1] = useState("");
    const [cusQuantity1, setCusQuantity1] = useState("");
    const [dispatchDate1, setDispatchDate1] = useState("");
    const [followUpDate1, setFollowUpDate1] = useState("");
    const [orderStatus1, setOrderStatus1] = useState("");
    const [remarks1, setRemarks1] = useState("");
    const [itemDesc1, setItemDesc1] = useState("Select Hamper");
    const [itemPrice1, setItemPrice1] = useState("");
    const [itemQty1, setItemQty1] = useState("");
    const [recMode1, setRecMode1] = useState("");
    const [recAmount1, setRecAmount1] = useState(0);
    const [resTransId1, setResTransId1] = useState("");
    const [recDate1, setRecDate1] = useState("");

    

    const removeOrderItem = (iddd) => {
        setRemoveOrderLoading(iddd);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: trid,
            removeId:iddd,
        };
        axios
            .post(`${baseUrl}folder/removeOrderDetails`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setSelectedUserData(result.data.leadData);
                    setRemoveOrderLoading("");
                } else {
                    toast(result.data.message, {position: "top-center", type:"error"});
                    setRemoveOrderLoading("");
                }
            })
            .catch((e) => {
                toast("Check your Internet", {position: "top-center", type:"error"});
                setRemoveOrderLoading("");
            });
    }

    const removeReceiptItem = (iddd) => {
        setRemoveReceiptLoading(iddd);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: trid,
            removeId:iddd,
        };
        axios
            .post(`${baseUrl}folder/removeReceiptDetails`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    console.log(result.data);
                    
                    setSelectedReceiptData(result.data.resData);
                    setRemoveReceiptLoading("");
                } else {
                    toast(result.data.message, {position: "top-center", type:"error"});
                    setRemoveReceiptLoading("");
                }
            })
            .catch((e) => {
                toast("Check your Internet", {position: "top-center", type:"error"});
                setRemoveReceiptLoading("");
            });
    }

    

    const handleAddReceiptOpen = () => {
        setRecMode1("")
        setRecAmount1("")
        setResTransId1("")
        setOpenAddReceiptEdit(true)
    };
    const handleAddReceiptClose = () => {
        setOpenAddReceiptEdit(false)
    };
    const handleAddReceiptSave = () => {
        setAddReceiptLoading(true);
        if(recMode1===""){
            toast.error("Please Select Mode of Payment", {
                position: "top-center"
            });
            setAddReceiptLoading(false);
        }
        else if(recAmount1==0)
        {
            toast.error("Please Enter the amount", {
                position: "top-center"
            });
            setAddReceiptLoading(false);
        }
        else{
            const config = {
                headers: { Authorization: "Bearer " + token },
            };
            const bodytxt = {
                custId:trid,
                modeOfTransfer:recMode1,
                recAmount:recAmount1,
                transID:resTransId1,
                recDate:recDate1,
            };
            axios
                .post(`${baseUrl}folder/addPayment`, bodytxt, config)
                .then((result) => {
                    if (result.data.success) {
                        setSelectedReceiptData(result.data.resData);
                        setAddReceiptLoading(false);
                        setOpenAddReceiptEdit(false)
                    } else {
                        console.log(result.data);
                        setAddReceiptLoading(false);
                        setOpenAddReceiptEdit(false)
                    }
                })
                .catch((e) => {
                    console.log("Check your Internet");
                    setAddReceiptLoading(false);
                    setOpenAddReceiptEdit(false)
                });
            
        }
        
    };

    const handleAddOrderOpen = () => {
        setItemDesc1("Select Hamper")
        setItemPrice1("")
        setItemQty1("")
        setOpenAddOrderEdit(true)
    };
    const handleAddOrderClose = () => {
        setOpenAddOrderEdit(false)
    };
    const handleAddOrderSave = () => {
        if(itemDesc1==="Select Hamper"){
            toast("Please Select a Hamper First", {position: "top-center", type:"warning"});
        }
        else if(itemPrice1===""){
            toast("Hamper Price Can't be Empty", {position: "top-center", type:"warning"});
        }
        else if(itemQty1===""){
            toast("Hamper Quantity Can't be Empty", {position: "top-center", type:"warning"});
        }
        else{
            setAddOrderLoading(true);
            const config = {
                headers: { Authorization: "Bearer " + token },
            };
            const bodytxt = {
                leadId: trid,
                newOrderDetail:{
                    itemDesc: itemDesc1,
                    itemPrice: itemPrice1,
                    itemQty: itemQty1,
                },
            };
            axios
                .post(`${baseUrl}folder/addOrderDetails`, bodytxt, config)
                .then((result) => {
                    if (result.data.success) {
                        setSelectedUserData(result.data.leadData);
                        setAddOrderLoading(false);
                        setOpenAddOrderEdit(false)
                    } else {
                        toast(result.data.message, {position: "top-center", type:"error"});
                        setAddOrderLoading(false);
                        setOpenAddOrderEdit(false)
                    }
                })
                .catch((e) => {
                    toast("Check your Internet", {position: "top-center", type:"error"});
                    setAddOrderLoading(false);
                    setOpenAddOrderEdit(false)
                });
        }
        
        
    };

    

// ------------------------------------- NAME CHANGE ----------------------------------

    const handleNameOpen = () => {
        setCusName1(selectedUserData.cusName)
        setOpenNameEdit(true)
    };
    const handleNameClose = () => {
        setOpenNameEdit(false)
    };
    const handleNameSave = () => {
        setNameLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: trid,
            cusName:cusName1,
        };
        axios
            .post(`${baseUrl}folder/editIndLead`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setSelectedUserData(result.data.leadData);
                    setNameLoading(false);
                    setOpenNameEdit(false)
                } else {
                    console.log(result.data);
                    setNameLoading(false);
                    setOpenNameEdit(false)
                }
            })
            .catch((e) => {
                console.log("Check your Internet");
                setNameLoading(false);
                setOpenNameEdit(false)
            });
        
    };

    // ------------------------------------- Mobile CHANGE ----------------------------------

    const handleMobileOpen = () => {
        setCusMobile1(selectedUserData.cusMobile)
        setOpenMobileEdit(true)
    };
    const handleMobileClose = () => {
        setOpenMobileEdit(false)
    };
    const handleMobileSave = () => {
        setMobLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: trid,
            cusMobile:cusMobile1,
        };
        axios
            .post(`${baseUrl}folder/editIndLead`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setSelectedUserData(result.data.leadData);
                    setMobLoading(false);
                    setOpenMobileEdit(false)
                } else {
                    console.log(result.data);
                    setMobLoading(false);
                    setOpenMobileEdit(false)
                }
            })
            .catch((e) => {
                console.log("Check your Internet");
                setMobLoading(false);
                setOpenMobileEdit(false)
            });
        
    };
    // ------------------------------------- Event Date CHANGE ----------------------------------

    const handleEventDtOpen = () => {
        let tempDate;
        if(selectedUserData.eventDate==undefined){
            tempDate = new Date()
        }
        else{
            tempDate = new Date(selectedUserData.eventDate)
        }
        setEventDate1(tempDate.toISOString().slice(0, 16))
        setOpenEventDtEdit(true)
    };
    const handleEventDtClose = () => {
        setOpenEventDtEdit(false)
    };
    const handleEventDtSave = () => {
        setEventDtLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: trid,
            eventDate:eventDate1,
        };
        axios
            .post(`${baseUrl}folder/editIndLead`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setSelectedUserData(result.data.leadData);
                    setEventDtLoading(false);
                    setOpenEventDtEdit(false)
                } else {
                    console.log(result.data);
                    setEventDtLoading(false);
                    setOpenEventDtEdit(false)
                }
            })
            .catch((e) => {
                console.log("Check your Internet");
                setEventDtLoading(false);
                setOpenEventDtEdit(false)
            });
        
    };
    // ------------------------------------- LOCATION CHANGE ----------------------------------

    const handleLocOpen = () => {
        setCusLocation1(selectedUserData.cusLocation)
        setOpenLocationEdit(true)
    };
    const handleLocClose = () => {
        setOpenLocationEdit(false)
    };
    const handleLocSave = () => {
        setLocLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: trid,
            cusLocation:cusLocation1,
        };
        axios
            .post(`${baseUrl}folder/editIndLead`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setSelectedUserData(result.data.leadData);
                    setLocLoading(false);
                    setOpenLocationEdit(false)
                } else {
                    console.log(result.data);
                    setLocLoading(false);
                    setOpenLocationEdit(false)
                }
            })
            .catch((e) => {
                console.log("Check your Internet");
                setLocLoading(false);
                setOpenLocationEdit(false)
            });
        
    };
    // ------------------------------------- QTY CHANGE ----------------------------------

    const handleQtyOpen = () => {
        setCusQuantity1(selectedUserData.cusQuantity)
        setOpenQtyEdit(true)
    };
    const handleQtyClose = () => {
        setOpenQtyEdit(false)
    };
    const handleQtySave = () => {
        setQtyLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: trid,
            cusQuantity:cusQuantity1,
        };
        axios
            .post(`${baseUrl}folder/editIndLead`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setSelectedUserData(result.data.leadData);
                    setQtyLoading(false);
                    setOpenQtyEdit(false)
                } else {
                    console.log(result.data);
                    setQtyLoading(false);
                    setOpenQtyEdit(false)
                }
            })
            .catch((e) => {
                console.log("Check your Internet");
                setQtyLoading(false);
                setOpenQtyEdit(false)
            });
        
    };
    // ------------------------------------- DISPATCH CHANGE ----------------------------------

    const handleDDOpen = () => {
        let tempDate;
        if(selectedUserData.dispatchDate==undefined){
            tempDate = new Date()
        }
        else{
            tempDate = new Date(selectedUserData.dispatchDate)
        }
        setCusQuantity1(tempDate.toISOString().slice(0, 16))
        setOpenDDEdit(true)
    };
    const handleDDClose = () => {
        setOpenDDEdit(false)
    };
    const handleDDSave = () => {
        setDispatchLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: trid,
            dispatchDate:dispatchDate1,
        };
        axios
            .post(`${baseUrl}folder/editIndLead`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setSelectedUserData(result.data.leadData);
                    setDispatchLoading(false);
                    setOpenDDEdit(false)
                } else {
                    console.log(result.data);
                    setDispatchLoading(false);
                    setOpenDDEdit(false)
                }
            })
            .catch((e) => {
                console.log("Check your Internet");
                setDispatchLoading(false);
                setOpenDDEdit(false)
            });
        
    };


    // ------------------------------------- Follow up CHANGE ----------------------------------

    const handleFUDOpen = () => {
        let tempDate;
        if(selectedUserData.followUpDate==undefined){
            tempDate = new Date()
        }
        else{
            tempDate = new Date(selectedUserData.followUpDate)
        }
        setFollowUpDate1(tempDate.toISOString().slice(0, 16))
        setOpenFDEdit(true)
    };
    const handleFUDClose = () => {
        setOpenFDEdit(false)
    };
    const handleFUDSave = () => {
        setFollowLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: trid,
            followUpDate:followUpDate1,
        };
        axios
            .post(`${baseUrl}folder/editIndLead`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setSelectedUserData(result.data.leadData);
                    setFollowLoading(false);
                    setOpenFDEdit(false)
                } else {
                    console.log(result.data);
                    setFollowLoading(false);
                    setOpenFDEdit(false)
                }
            })
            .catch((e) => {
                console.log("Check your Internet");
                setFollowLoading(false);
                setOpenFDEdit(false)
            });
        
    };
    const handleNextWeek = (nextDattt) => {
        setFollowLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: trid,
            followUpDate:nextDattt,
        };
        axios
            .post(`${baseUrl}folder/editIndLead`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setSelectedUserData(result.data.leadData);
                    setFollowLoading(false);
                    setOpenFDEdit(false)
                } else {
                    console.log(result.data);
                    setFollowLoading(false);
                    setOpenFDEdit(false)
                }
            })
            .catch((e) => {
                console.log("Check your Internet");
                setFollowLoading(false);
                setOpenFDEdit(false)
            });
        
    };
    
    // ------------------------------------- STATUS CHANGE ----------------------------------

    const handleStatusOpen = () => {
        setOrderStatus1(selectedUserData.orderLabel+"|"+selectedUserData.orderStatus)
        setOpenStatusEdit(true)
    };
    const handleStatusClose = () => {
        setOpenStatusEdit(false)
    };
    const handleStatusSave = () => {
        setStatusLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const statuses = orderStatus1.split("|")
        const bodytxt = {
            leadId: trid,
            orderLabel:statuses[0],
            orderStatus:statuses[1],
        };
        axios
            .post(`${baseUrl}folder/editIndLead`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setSelectedUserData(result.data.leadData);
                    setStatusLoading(false);
                    setOpenStatusEdit(false)
                } else {
                    console.log(result.data);
                    setStatusLoading(false);
                    setOpenStatusEdit(false)
                }
            })
            .catch((e) => {
                console.log("Check your Internet");
                setStatusLoading(false);
                setOpenStatusEdit(false)
            });
        
    };

    // ------------------------------------- STATUS CHANGE ----------------------------------

    const handleRemarkOpen = () => {
        setRemarks1(selectedUserData.remarks)
        setOpenRemarkEdit(true)
    };
    const handleRemarkClose = () => {
        setOpenRemarkEdit(false)
    };
    const handleRemarkSave = () => {
        setRemarkLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: trid,
            remarks:remarks1,
        };
        axios
            .post(`${baseUrl}folder/editIndLead`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setSelectedUserData(result.data.leadData);
                    setRemarkLoading(false);
                    setOpenRemarkEdit(false)
                } else {
                    console.log(result.data);
                    setRemarkLoading(false);
                    setOpenRemarkEdit(false)
                }
            })
            .catch((e) => {
                console.log("Check your Internet");
                setRemarkLoading(false);
                setOpenRemarkEdit(false)
            });
        
    };

    const toggleImportent = (isImp) => {
        setImpLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: trid,
            isImportant:isImp,
        };
        axios
            .post(`${baseUrl}folder/editIndLead`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setSelectedUserData(result.data.leadData);
                    setImpLoading(false);

                } else {
                    console.log(result.data);
                    setImpLoading(false);

                }
            })
            .catch((e) => {
                console.log("Check your Internet");
                setImpLoading(false);

            });
        
    };

    useEffect(() => {
        setUserLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            leadId: trid,
        };
        axios
            .post(`${baseUrl}folder/getIndLead`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setSelectedUserData(result.data.leadData);
                    setSelectedReceiptData(result.data.resData)
                    setUserLoading(false);
                } else {
                    console.log(result.data);
                }
            })
            .catch((e) => {
                console.log("Check your Internet");
            });
    }, []);

    

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


    const getIconGift = (giftType) => {
        const hamperImage = hamperSku.filter(item=> item.hampName === giftType)
        console.log(giftType+" - "+hamperImage);
        
        if(hamperImage.length === 0){
            return "/assets/images/products/noimg.webp";
        }
        else{
            return hamperImage[0].hampImage;
        }
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

    const dobString1 = (dob) => {
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

            return `${date}-${month}-${yearr}`;
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
    const dobString2 = (dob) => {
        if(dob==undefined){
            return `-`;
        }
        else{
            const monthss = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var dobDate = new Date(dob);
            // const utfDateTime = new Date(dobDate.getTime() - (5.5 * 60 * 60 * 1000));
            var monthss1 = monthss;
            var date = dobDate.getDate();
            var month = monthss1[dobDate.getMonth()];
            var yearr = dobDate.getFullYear();
            var hourr = String(dobDate.getHours()).padStart(2, '0');
            var minn = String(dobDate.getMinutes()).padStart(2, '0');
            return `${date}-${month}-${yearr} ${hourr}:${minn}`;
        }
    };

    const nextweek = (datt) => {
        var dobDate = new Date(datt);
        var nextdt = new Date(dobDate.getTime() + (7 * 24 * 60 * 60 * 1000));
        return nextdt;
    }

    const getTotalQty = (jsonArr) =>{
        let totqty = 0
        jsonArr.map((item)=>{
            totqty = totqty + Number(item.itemQty)
        })
        return totqty;
    }

    const getTotalAmount = (jsonArr) =>{
        let totAmt = 0
        jsonArr.map((item)=>{
            totAmt = totAmt + (Number(item.itemQty) * Number(item.itemPrice))
        })
        return totAmt;
    }

    const getTotalReceived = (jsonArr) =>{
        let totRec = 0
        jsonArr.map((item)=>{
            totRec = totRec + Number(item.recAmount)
        })
        return totRec;
    }

    const todayDate = () => {
        var dobDate = new Date();
        return dobDate;
    }

    const dobStringCreated = (dob) => {
        var dobDate1 = new Date(dob);
        if(!isNaN(dobDate1.getTime())){
            const monthss = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var dobDate = new Date(dob);
            var monthss1 = monthss;
            var date = dobDate.getDate();
            var month = monthss1[dobDate.getMonth()];
            var yearr = dobDate.getFullYear();
            var hourr = String(dobDate.getHours()).padStart(2, '0');
            var minn = String(dobDate.getMinutes()).padStart(2, '0');
            return `${date}-${month}-${yearr} ${hourr}:${minn}`;
        }
        else{
            return "-"
        }
    };

    const getTexxt = (qtty, loocation, daate) => {
        let teeext = "";
        if(qtty!==""){
            if(loocation!==""){
                if(daate!=="-"){
                    teeext = "Hello Sir/Madam, This is Kannabiran from Chennai Green Gifts. We received your request on Instagram for "+ qtty +" return gifts in "+ loocation +" on "+ daate +". Do you still have this requirement?";
                }
                else{
                    teeext = "Hello Sir/Madam, This is Kannabiran from Chennai Green Gifts. We received your request on Instagram for "+ qtty +" return gifts in "+ loocation +". Do you still have this requirement?";
                }
            }
            else{
                if(daate!=="-"){
                    teeext = "Hello Sir/Madam, This is Kannabiran from Chennai Green Gifts. We received your request on Instagram for "+ qtty +" return gifts on "+ daate +". Do you still have this requirement?";
                }
                else{
                    teeext = "Hello Sir/Madam, This is Kannabiran from Chennai Green Gifts. We received your request on Instagram for "+ qtty +". Do you still have this requirement?";
                }
            }
        }
        else{
            if(loocation!==""){
                if(daate!=="-"){
                    teeext = "Hello Sir/Madam, This is Kannabiran from Chennai Green Gifts. We received your request on Instagram for return gifts in "+loocation+" on "+ daate +". Do you still have a requirement?";
                }
                else{
                    teeext = "Hello Sir/Madam, This is Kannabiran from Chennai Green Gifts. We received your request on Instagram for return gifts in "+loocation+". Do you still have a requirement?";
                }
            }
            else{
                if(daate!=="-"){
                    teeext = "Hello Sir/Madam, This is Kannabiran from Chennai Green Gifts. Do you still have a requirement on "+ daate +" ?";
                }
                else{
                    teeext = "Hello Sir/Madam, This is Kannabiran from Chennai Green Gifts. Do you still have a requirement?";
                }
            }
        }
        return encodeURIComponent(teeext);
    }
    
    const formatDate = ( ddt ) => {
        var xxx = new Date(ddt)
        if(!isNaN(xxx.getTime())){
          return xxx.toLocaleString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})
        }
        else{
          return "-"
        }
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

      const renderStatusMenuItem = (label, item) => {
        return (
          <div className={getPayClass(label)}>
            {label}
          </div>
        );
      };

      const renderHamperMenuItem = (label, item) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={getIconGift(label)}  className={styles.ppp} width={40} height={40} /> <span>{label}</span>
          </div>
        );
      };


    return (
        <div id="content2" className={styles.container}>
            <Modal open={openAddReceiptEdit} onClose={handleAddReceiptClose}>
                <Modal.Header>
                    <Modal.Title>Add Payment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SelectPicker value={recMode1} searchable={false} onChange={setRecMode1} data={receiptList} style={{width:"100%", marginBottom:10}} placeholder="Mode of Payment" />
                    <InputGroup style={{marginBottom:10}} >
                        <InputGroup.Addon>₹</InputGroup.Addon>
                        <Input value={recAmount1} type="number" onChange={setRecAmount1} placeholder="Amount"/>
                    </InputGroup>
                    

                    <Input value={resTransId1} onChange={setResTransId1} style={{marginBottom:10}} placeholder="Transaction ID"/>
                    <Input value={recDate1} onChange={setRecDate1} type="datetime-local"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAddReceiptSave} loading={addReceiptLoading} appearance="primary">
                        Save
                    </Button>
                    <Button onClick={handleAddReceiptClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal open={openAddOrderEdit} onClose={handleAddOrderClose}>
                <Modal.Header>
                    <Modal.Title>Add Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SelectPicker renderValue={renderHamperMenuItem} renderMenuItem={renderHamperMenuItem} value={itemDesc1} onChange={setItemDesc1} data={productList} style={{width:"100%", marginBottom:10}} placeholder="Product Description" />
                    <InputGroup style={{marginBottom:10}} >
                        <InputGroup.Addon><LuIndianRupee /></InputGroup.Addon>

                        <Input value={itemPrice1} type="number" onChange={setItemPrice1} placeholder="Price"/>
                    </InputGroup>
                    <InputGroup style={{marginBottom:10}} >
                        <InputGroup.Addon><FaBoxes /></InputGroup.Addon>
                        <Input value={itemQty1} type="number" onChange={setItemQty1} placeholder="Oty"/>
                    </InputGroup>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAddOrderSave} loading={addOrderLoading} appearance="primary">
                        Save
                    </Button>
                    <Button onClick={handleAddOrderClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal open={openNameEdit} onClose={handleNameClose}>
                <Modal.Header>
                    <Modal.Title>Edit Customer Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Input value={cusName1} onChange={setCusName1}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleNameSave} loading={nameLoading} appearance="primary">
                        Save
                    </Button>
                    <Button onClick={handleNameClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal open={openMobileEdit} onClose={handleMobileClose}>
                <Modal.Header>
                    <Modal.Title>Edit Customer Mobile Number</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Input value={cusMobile1} onChange={setCusMobile1}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleMobileSave} loading={mobLoading} appearance="primary">
                        Save
                    </Button>
                    <Button onClick={handleMobileClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal open={openEventDtEdit} onClose={handleEventDtClose}>
                <Modal.Header>
                    <Modal.Title>Edit Event Date</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input value={eventDate1} onChange={setEventDate1} type="datetime-local"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleEventDtSave} loading={eventDtLoading} appearance="primary">
                        Save
                    </Button>
                    <Button onClick={handleEventDtClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal open={openLocationEdit} onClose={handleLocClose}>
                <Modal.Header>
                    <Modal.Title>Edit Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Input value={cusLocation1} onChange={setCusLocation1}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleLocSave} loading={locLoading} appearance="primary">
                        Save
                    </Button>
                    <Button onClick={handleLocClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal open={openQtyEdit} onClose={handleQtyClose}>
                <Modal.Header>
                    <Modal.Title>Edit Quantity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Input type="number" value={cusQuantity1} onChange={setCusQuantity1}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleQtySave} loading={qtyLoading} appearance="primary">
                        Save
                    </Button>
                    <Button onClick={handleQtyClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal open={openDDEdit} onClose={handleDDClose}>
                <Modal.Header>
                    <Modal.Title>Edit Dispatch Date</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Input value={dispatchDate1} onChange={setDispatchDate1} type="datetime-local"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDDSave} loading={dispatchLoading} appearance="primary">
                        Save
                    </Button>
                    <Button onClick={handleDDClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal open={openFDEdit} onClose={handleFUDClose}>
                <Modal.Header>
                    <Modal.Title>Edit Next Followup Date (UTC)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Input value={followUpDate1} onChange={setFollowUpDate1} type="datetime-local"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleFUDSave} loading={followLoading} appearance="primary">
                        Save
                    </Button>
                    <Button onClick={handleFUDClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal open={openStatusEdit} onClose={handleStatusClose}>
                <Modal.Header>
                    <Modal.Title>Edit Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SelectPicker value={orderStatus1} renderMenuItem={renderStatusMenuItem} searchable={false} onChange={setOrderStatus1} data={orderList} style={{width:"100%", marginBottom:10}} placeholder="Order Status" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleStatusSave} loading={statusLoading} appearance="primary">
                        Save
                    </Button>
                    <Button onClick={handleStatusClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal open={openRemarkEdit} onClose={handleRemarkClose}>
                <Modal.Header>
                    <Modal.Title>Edit Remarks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Input as="textarea" rows={3} value={remarks1} onChange={setRemarks1}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleRemarkSave} loading={remarkLoading} appearance="primary">
                        Save
                    </Button>
                    <Button onClick={handleRemarkClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            {userLoading?
                <AllUserLoading nos={3}/>
                :<>
                <div className={styles.profileCard}>
                    <div className={styles.profilePic}>
                        <img src={getIconLead(selectedUserData.cusLeadFrom)}  className={styles.ppp} width={60} height={60} />
                    </div>
                    <div className={styles.profileInfo}>
                        <span onClick={handleNameOpen} className={styles.name}>{selectedUserData.cusName} <FiEdit className={styles.editico} /> </span>
                        <span className={styles.phoneno}><Link target="_blank" href={"https://wa.me/91"+selectedUserData.cusMobile+"?text="+getTexxt(selectedUserData.cusQuantity, selectedUserData.cusLocation, dobString1(selectedUserData.eventDate))}>{selectedUserData.cusMobile}</Link> <FiEdit onClick={handleMobileOpen} className={styles.editicoMob} /></span>
                        <span onClick={handleEventDtOpen} className={styles.eventDate}>Event Date: {dobString(selectedUserData.eventDate)} <FiEdit className={styles.editicoEv} /></span>
                    </div>
                </div>
                {selectedUserData.isImportant==="Yes" && <span className={styles.basicAlert} style={{backgroundColor:"#ffd000", color:"black", fontSize:15}}>Important</span>}
                <div  className={styles.subTitle}>Lead Details</div>
                    <div className={styles.basicDetails}>
                        <div className={styles.basicItem}>
                            <MdOutlineLocationOn className={styles.icon} />
                            <div onClick={handleLocOpen} className={styles.partInfo}>
                                <span className={styles.partTitle}>Location <FiEdit  className={styles.editico1} /></span>
                                <span className={styles.partValue}>{selectedUserData.cusLocation}</span>
                            </div>
                        </div>
                        <div className={styles.basicItem}>
                            <BsBoxes className={styles.icon} />
                            <div onClick={handleQtyOpen} className={styles.partInfo}>
                                <span className={styles.partTitle}>Quantity <FiEdit  className={styles.editico1}/></span>
                                <span className={styles.partValue}>{selectedUserData.cusQuantity}</span>
                            </div>
                        </div>
                        <div className={styles.basicItem}>
                            <FaTruckArrowRight className={styles.icon} />
                            <div onClick={handleDDOpen} className={styles.partInfo}>
                                <span style={{color:"#548487"}} className={styles.partTitle}>Dispatch Date <FiEdit  className={styles.editico1}/></span>
                                <span className={styles.partValue}>{dobString(selectedUserData.dispatchDate)}</span>
                            </div>
                        </div>
                        <div className={styles.basicItem}>
                            <RiCustomerService2Line className={styles.icon} />
                            <div onClick={handleFUDOpen} className={styles.partInfo}>
                                <span className={styles.partTitle}>Last Contacted Date <FiEdit  className={styles.editico1}/></span>
                                <span style={getDateClass(selectedUserData.followUpDate)} className={styles.partValue}>{dobString2(selectedUserData.followUpDate)}</span>
                            </div>
                        </div>
                        <div className={styles.basicItem}>
                            <MdOutlineDiscount  className={styles.icon} />
                            <div onClick={handleStatusOpen} className={styles.partInfo}>
                                <span className={styles.partTitle}>Order Status <FiEdit  className={styles.editico1}/></span>
                                <span style={{lineHeight:"normal", fontSize:"medium", fontWeight:600, padding:0}} className={getPayClass(selectedUserData.orderStatus)}>{selectedUserData.orderStatus}</span>
                            </div>
                        </div>
                        <div className={styles.basicItem}>
                            <MdOutlineWorkspacePremium className={styles.icon} />
                            <div onClick={handleRemarkOpen} className={styles.partInfo}>
                                <span className={styles.partTitle}>Remarks <FiEdit  className={styles.editico1}/></span>
                                <span className={styles.partValue}>{selectedUserData.remarks}</span>
                            </div>
                        </div>
                        
                    </div>
                    <div style={{gap:10}} className={styles.basicDetails}>
                    <Button loading={followLoading} onClick={()=>handleNextWeek(todayDate())} color="orange" appearance="primary">Mark Last Contacted Today</Button>
                    <Button loading={impLoading} onClick={()=>toggleImportent(selectedUserData.isImportant!=="Yes"?"Yes":"No")} color="cyan" appearance="primary">{selectedUserData.isImportant!=="Yes"?"Mark as Important":"Remove Important"}</Button>
                    </div>
                    <div className={styles.orderRec}>
                        
                        <div className={styles.orderDetail}>
                            <div className={styles.orderSubTitle}>Invoice Details</div>
                            {
                            selectedUserData.OrderDetails!==undefined &&
                            // <div>
                            //     {selectedUserData.OrderDetails.map((item, index)=>{
                            //         return(
                            //             <div key={`order${index}`} className={styles.orderCard}>
                            //                 <div className={styles.profilePic}>
                            //                     <img src={getIconGift(item.itemDesc)}  className={styles.ppp} width={50} height={50} />
                            //                 </div>
                            //                 <div className={styles.profileInfo}>
                            //                     <span className={styles.productName}>{item.itemDesc} </span>
                            //                     <span className={styles.phoneno}>Price: ₹{item.itemPrice}</span>
                                               
                            //                 </div>
                            //                 <div style={{display:"flex", flexDirection:"row", flex:3}}>
                            //                     <span className={styles.email}>Qty <br/>{item.itemQty}</span>
                            //                     <span className={styles.email}>Total <br/>₹{Number(item.itemQty)*Number(item.itemPrice)}</span>
                            //                     <IconButton onClick={()=>removeOrderItem(item._id)} loading={removeOrderLoading === item._id} size="xs" color="red" appearance="primary" icon={<TrashIcon />} />
                            //                 </div>
                            //             </div>
                            //         )
                            //     })}
                            // </div>
                            <table className={styles.orderTable}>
                                <thead>
                                    <tr>
                                        
                                        <th align="center">Discription</th>
                                        <th align="center">Unit Price</th>
                                        <th align="center">Qty</th>
                                        <th align="center">Amount</th>
                                        <th align="center">Del</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {selectedUserData.OrderDetails.map((item, index)=>{
                                    return(
                                        <tr key={`order${index}`} className={styles.singleOrder}>
                                            
                                            <td valign="middle">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <img src={getIconGift(item.itemDesc)}  className={styles.ppp} width={40} height={40} /> <span>{item.itemDesc}</span>
                                                </div>
                                            </td>
                                            <td valign="middle" align="center">{formatToINR(Number(item.itemPrice))}</td>
                                            <td valign="middle" align="center">{item.itemQty}</td>
                                            <td valign="middle" align="right">{formatToINR(Number(item.itemQty) * Number(item.itemPrice))}</td>
                                            <td ><div style={{alignItems:"center", display:"flex", justifyContent:"center"}}><IconButton onClick={()=>removeOrderItem(item._id)} loading={removeOrderLoading === item._id} size="xs" color="red" appearance="primary" icon={<TrashIcon />} /></div></td>
                                        </tr>
                                    )
                                })}
                                <tr> 
                                    <td align="left"><span style={{fontWeight:"bold"}}>Total</span></td>
                                    <td align="center"></td>
                                    <td align="center">{getTotalQty(selectedUserData.OrderDetails)}</td>
                                    <td align="right"><span style={{fontWeight:"bold"}}>{formatToINR(getTotalAmount(selectedUserData.OrderDetails))}</span></td>
                                    <td align="center"></td>
                                </tr>
                                </tbody>
                            </table>
                            }
                            <div className={styles.orderButtonGroup}>
                                <Button color="green" appearance="primary" onClick={()=>handleAddOrderOpen()}>Add Order Item</Button>
                            </div>
                        </div>
                        
                        <div className={styles.orderDetail}>
                            <div className={styles.orderSubTitle} style={{ paddingBottom:10, borderBottom:"#DDD solid 1px"}}>Receipt Details</div>
                            {
                            selectedReceiptData!==undefined &&
  
                            <div>
                                {selectedReceiptData.map((item, index)=>{
                                    return(
                                        <div key={`res${index}`} style={{display:"flex", gap:10, margin:7, paddingBottom:7, borderBottom:"#DDD solid 1px", justifyContent:"space-between"}}>
                                            <div className={styles.receiptData}>
                                                <div className={styles.receiptDelbutton}><IconButton onClick={()=>removeReceiptItem(item.receiptId)} loading={removeReceiptLoading === item.receiptId} size="xs" color="red" appearance="ghost" icon={<TrashIcon />} /></div>
                                                <div className={styles.receiptDetails}>
                                                    <div style={{fontSize:14, fontWeight:"bold"}}>{item.receiptId}</div>
                                                    <div style={{fontSize:12, color:"green"}}>{dobStringCreated(item.recDate)}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{fontSize:14, fontWeight:"bold"}}>{item.modeOfTransfer}</div>
                                                <div style={{fontSize:12, color:"green"}}>{item.transID || "-"}</div>
                                            </div>
                                            <div style={{display:"flex", alignItems:"center"}}>{formatToINR(item.recAmount)}</div>
                                            
                                            
                                        </div>
                                    )
                                })}
                                <div style={{display:"flex", gap:10, margin:7, paddingBottom:7, borderBottom:"#DDD solid 1px", justifyContent:"space-between"}}>
                                            <div>
                                                <div style={{fontSize:14, fontWeight:"bold"}}>Total Received</div>
                                            </div>
                                            <div style={{display:"flex", alignItems:"center"}}>{formatToINR(getTotalReceived(selectedReceiptData))}</div>    
                                </div>
                            </div>
                            }
                            <div className={styles.orderButtonGroup}>
                                <Button color="green" appearance="primary" onClick={()=>handleAddReceiptOpen()}>Add Payment Info</Button>
                            </div>
                        </div>
                    </div>
                        
                    </>
            }
        </div>
    );
}

export default SingleOrderDetails;
