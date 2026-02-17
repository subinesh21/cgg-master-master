"use client";
import React, { useEffect, useState } from "react";
import styles from "./adminInfo.module.css";
import { BiCaretDown } from "react-icons/bi";
import { BiCaretUp } from "react-icons/bi";
import { SlUserFemale, SlUser } from "react-icons/sl";
import { MdNumbers } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";

import { CChart } from "@coreui/react-chartjs";
import axios from "axios";
import Image from "next/image";
import DashboardTitle from "@/app/ui/skeletons/dashboardTitle";
import DashboardTop from "@/app/ui/skeletons/dashboardTop";
import DashboardList from "@/app/ui/skeletons/dashboardList";
import DashboardSideBar from "@/app/ui/skeletons/dashboardSideBar";
import { IconButton } from "@mui/material";
import { LiaUserEditSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { Button, Checkbox, CheckboxGroup, DatePicker, Drawer, Input, Modal } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AdminInfo({ token, baseUrl, adminid }) {
    const router = useRouter();

    const [printPortal, setPrintPortal] = useState(false);

    const [monthRange, setMonthRange] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [currentMonthDates, setCurrentMonthDates] = useState("");
    const [adminLoading, setAdminLoading] = useState(true);
    const [selectedAdminData, setSelectedAdminData] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [paymentData, setPaymentData] = useState([]);

    const [startCount, setStartCount] = useState(0);
    const [enhanceCount, setEnhanceCount] = useState(0);
    const [premiumCount, setPremiumCount] = useState(0);
    const [eliteCount, setEliteCount] = useState(0);
    const [suprimeCount, setSuprimeCount] = useState(0);
    const [creditCount, setCreditCount] = useState(0);

    const [startAmount, setStartAmount] = useState(0);
    const [enhanceAmount, setEnhanceAmount] = useState(0);
    const [premiumAmount, setPremiumAmount] = useState(0);
    const [eliteAmount, setEliteAmount] = useState(0);
    const [suprimeAmount, setSuprimeAmount] = useState(0);
    const [creditAmount, setCreditAmount] = useState(0);

    const [thisMonthAmount, setThisMonthAmount] = useState(0);
    const [prevMonthAmount, setPrevMonthAmount] = useState(0);
    const [exceptPayIndex, setExceptPayIndex] = useState([]);
    const [invNo, setInvNo] = useState("ONT/TWR/23-24/00");
    const [invDate, setInvDate] = useState(null);
    const [invDisc, setInvDisc] = useState(0);
    const [btnLoading, setBtnLoading] = useState(false);
    

    const headerImg = `data:image/webp;base64,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`
    const rupeeSymb = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAEmCAMAAAAQvy/qAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAvFQTFRFAAAAAgICAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgICAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBLlC3FQAAAPt0Uk5TAAF20XJE+v/oCwfV/FoBgpkDMvTvFtdurQXsFwLK/nFvsSPr9iDI/XVYxgklH7SKGeH7L7KEDxoun5pB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';
    useEffect(() => {
        const date1 = new Date();
        date1.setDate(1);
        const months1 = [];
        for (let i = 0; i < 12; i++) {
            const monthx = ("0" + (date1.getMonth() + 1)).slice(-2);
            const yearx = date1.getFullYear();
            months1.push({ label: `${monthx}-${yearx}`, value: `${monthx}-${yearx}` });
            date1.setMonth(date1.getMonth() - 1);
        }

        console.log(months1);
        setMonthRange(months1);
        setSelectedMonth(months1[0].value);
    }, []);

    useEffect(() => {
        if (selectedMonth !== "") {
            // const date = new Date();
            // date.setDate(1);
            // const months = [];
            // for (let i = 0; i < 12; i++) {
            //     const month = ("0" + (date.getMonth() + 1)).slice(-2);
            //     const year = date.getFullYear();
            //     months.push({ label: `${month}-${year}`, value: `${month}-${year}` });
            //     date.setMonth(date.getMonth() - 1);
            // }
            // setSelectedMonth(months[0].value);

            const monthYear = selectedMonth.split("-");
            const currentYear = Number(monthYear[1]);
            const currentMonth = Number(monthYear[0] - 1);
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

            const currentMonthDates1 = [...Array(daysInMonth).keys()].map((days) => {
                const date = new Date(currentYear, currentMonth, days + 1);
                return date.toLocaleDateString("en-GB").replaceAll("/", "-");
            });

            setCurrentMonthDates(currentMonthDates1);

            setAdminLoading(true);

            const config = {
                headers: { Authorization: "Bearer " + token },
            };
            const bodytxt = {
                adminId: adminid,
                gMonth: Number(monthYear[0]),
                gYear: Number(monthYear[1]),
            };

            axios.post(`${baseUrl}masterusers/getIndAdminNew`, bodytxt, config).then((result) => {
                if (result.data.success) {
                    console.log(result.data);
                    setSelectedAdminData(result.data);

                    var dataArray1 = [];
                    currentMonthDates1.forEach((val) => {
                        var newArray = result.data.chartData.filter(function (x) {
                            return x.datee === val;
                        })[0];
                        if (!newArray) {
                            dataArray1.push(0);
                        } else {
                            dataArray1.push(newArray.count);
                        }
                    });
                    setChartData(dataArray1);

                    setPaymentData(result.data.paymentData.reverse());

                    setStartCount(0);
                    setEnhanceCount(0);
                    setPremiumCount(0);
                    setEliteCount(0);
                    setSuprimeCount(0);
                    setCreditCount(0);

                    setStartAmount(0);
                    setEnhanceAmount(0);
                    setPremiumAmount(0);
                    setEliteAmount(0);
                    setSuprimeAmount(0);
                    setCreditAmount(0);

                    setThisMonthAmount(0);
                    setPrevMonthAmount(0);

                    result.data.paymentData.forEach((element) => {
                        if (element.planName === "Start Plan") {
                            setStartCount((prev) => prev + 1);
                            setStartAmount((prev1) => prev1 + Number(element.paidAmount));
                        } else if (element.planName === "Enhance Plan") {
                            setEnhanceCount((prev) => prev + 1);
                            setEnhanceAmount((prev1) => prev1 + Number(element.paidAmount));
                        } else if (element.planName === "Premium Plan") {
                            setPremiumCount((prev) => prev + 1);
                            setPremiumAmount((prev1) => prev1 + Number(element.paidAmount));
                        } else if (element.planName === "Elite Plan") {
                            setEliteCount((prev) => prev + 1);
                            setEliteAmount((prev1) => prev1 + Number(element.paidAmount));
                        } else if (element.planName === "Supreme Plan") {
                            setSuprimeCount((prev) => prev + 1);
                            setSuprimeAmount((prev1) => prev1 + Number(element.paidAmount));
                        } else {
                            setCreditCount((prev) => prev + 1);
                            setCreditAmount((prev1) => prev1 + Number(element.paidAmount));
                        }
                    });

                    result.data.paymentData.forEach((element) => {
                        setThisMonthAmount((prev1) => prev1 + Number(element.paidAmount));
                    });
                    console.log(result.data.paymentData);
                    result.data.preMonthTrans.forEach((element1) => {
                        setPrevMonthAmount((prev2) => prev2 + Number(element1.paidAmount));
                    });

                    setAdminLoading(false);
                } else {
                    console.log(result.data.message);
                }
            });
        }
    }, [selectedMonth]);

    const formatData = (ddt) => {
        var xxx = new Date(ddt);
        return xxx.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }).replace(/ /g, "-");
    };

    const getPayClass = (plan) => {
        let hello;
        if (plan === "Start Plan") {
            hello = "startPlan";
        } else if (plan === "Enhance Plan") {
            hello = "enhancePlan";
        } else if (plan === "Premium Plan") {
            hello = "premiumPlan";
        } else if (plan === "Elite Plan") {
            hello = "elitePlan";
        } else if (plan === "Supreme Plan") {
            hello = "suprimePlan";
        } else {
            hello = "otherPlan";
        }
        return hello;
    };

    const getProgress = (count) => {
        const bigest = findBigg([startCount, enhanceCount, premiumCount, eliteCount, suprimeCount, creditCount]);
        const per = Math.round((count / bigest) * 100);
        return per;
    };

    const findBigg = (array) => {
        return array.reduce((largest, current) => (current > largest ? current : largest), array[0]);
    };

    const monthCountVar = (thisMonth, prevMonth) => {
        if (thisMonth >= prevMonth) {
            const diff = thisMonth - prevMonth;
            const perch = Math.round((diff / prevMonth) * 100);
            return (
                <span>
                    <BiCaretUp color="green" /> {perch}%
                </span>
            );
        } else {
            const diff1 = prevMonth - thisMonth;
            const perch1 = Math.round((diff1 / prevMonth) * 100);
            return (
                <span>
                    <BiCaretDown color="red" /> {perch1}%
                </span>
            );
        }
    };

    const formatDateRange = (inputString) => {
        const [monthStr, yearStr] = inputString.split("-");
        const month = parseInt(monthStr, 10) - 1;
        const year = parseInt(yearStr, 10);
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const formattedFirstDay = firstDay.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        const formattedLastDay = lastDay.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        return `${formattedFirstDay} to ${formattedLastDay}`;
      };

    const calculateBill = (paydata) => {
        let startQty = 0
        let enhanceQty = 0
        let premiumQty = 0
        let eliteQty = 0
        let suprimeQty = 0
        let creditAmt = 0

        let totDisc = 0

        let alltotalled = 0;

        if(paydata.length!==0){
            paydata.map((itemm, indexx)=>{
                alltotalled += Number(itemm.paidAmount);
                if(!exceptPayIndex.includes(indexx)){
                    const disc = Number(itemm.totalAmount) - Number(itemm.paidAmount);
                    totDisc += disc;
                    if(itemm.planName=="Start Plan"){
                        startQty++
                    }
                    else if(itemm.planName=="Enhance Plan"){
                        enhanceQty++
                    }
                    else if(itemm.planName=="Premium Plan"){
                        premiumQty++
                    }
                    else if(itemm.planName=="Elite Plan"){
                        eliteQty++
                    }
                    else if(itemm.planName=="Supreme Plan"){
                        suprimeQty++
                    }
                    else{
                        creditAmt += Number(itemm.paidAmount);
                    }
                }
            })

            const startAmt = startQty*635.593220338983;
            const enhanceAmt = enhanceQty*1059.32203389831;
            const premiumAmt = premiumQty*2118.64406779661;
            const eliteAmt = eliteQty*4237.28813559322;
            const suprimeAmt = suprimeQty*6355.93220338983;
            const originalCredit = (creditAmt/2)*100/118;

            const subtotal = startAmt + enhanceAmt + premiumAmt + eliteAmt + suprimeAmt + originalCredit;

            const gst9per = (subtotal * 9)/100;
            const amttotal = subtotal + (2 *gst9per);
            const totalDiscc = (totDisc/2) + Number(invDisc);
            const payabletot = amttotal - totalDiscc
            const payText = convertNumberToWords(payabletot);

            return {
                startQty:startQty.toString(), 
                enhanceQty:enhanceQty.toString(),
                premiumQty:premiumQty.toString(),
                eliteQty:eliteQty.toString(),
                suprimeQty:suprimeQty.toString(),
                startAmt:numFor(startAmt),
                enhanceAmt:numFor(enhanceAmt),
                premiumAmt:numFor(premiumAmt),
                eliteAmt:numFor(eliteAmt),
                suprimeAmt:numFor(suprimeAmt),
                creditAmt:numFor(originalCredit),
                subtotal:numFor(subtotal),
                gst9per:numFor(gst9per),
                amttotal:numFor(amttotal),
                totalDiscc:numFor(totalDiscc),
                payabletot:numFor(payabletot),
                payText:payText.toUpperCase(),
                alltotalled:"Total Funds Collected: " + numFor(alltotalled)
            };
        }
        else{
            return {
                startQty:"", 
                enhanceQty:"",
                premiumQty:"",
                eliteQty:"",
                suprimeQty:"",
                startAmt:"",
                enhanceAmt:"",
                premiumAmt:"",
                eliteAmt:"",
                suprimeAmt:"",
                creditAmt:"",
                subtotal:"",
                gst9per:"",
                amttotal:"",
                totalDiscc:"",
                payabletot:"",
                payText:""
            };
        }

    }

    const numFor = (num) =>{
        const incomming = Number(num);
        const formattedNumber = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(incomming);
        return formattedNumber;
    }

    const generatePDF = () => {
        if(invNo.length===18){
            if(invDate!==null){
                setBtnLoading(true);
                const header = [
                    "S.No",
                    "Payment ID",
                    "Date",
                    "Name",
                    "Gender",
                    "Plan",
                    "Amount",
                ];
                const body1 = paymentData.map((item, index)=>{
                    const aaa = [
                        index + 1,
                        item.paymentId,
                        formatData(item.createdAt),
                        item.gbName,
                        item.gbGender,
                        item.planName,
                        item.paidAmount,
                    ]
                   return aaa;
                })

                const {startQty, enhanceQty, premiumQty, eliteQty, suprimeQty, startAmt, enhanceAmt, premiumAmt, eliteAmt, suprimeAmt, creditAmt, subtotal, gst9per, amttotal, totalDiscc, payabletot, payText, alltotalled} = calculateBill(paymentData);
        
                const doc = new jsPDF("P", "mm", [210, 297]);
                doc.addImage(headerImg, 'PNG', 0, 0, 210, 28);
                doc.setFontSize(46);
                doc.setTextColor("#003091")
                doc.text("INVOICE", doc.internal.pageSize.width - 10, 22, {align:"right"});
                doc.setLineWidth(0.2);
                doc.setDrawColor(0, 0, 0);
                doc.setFillColor("#c8daf8")
                doc.rect(10, 44, doc.internal.pageSize.width-20, 5, "F")
                doc.rect(10, 54, doc.internal.pageSize.width-20, 5, "F")
                doc.rect(105, 69, 95, 5, "F")
                doc.line(10, 44, doc.internal.pageSize.width-10, 44);
                doc.line(10, 49, doc.internal.pageSize.width-10, 49);
                doc.line(10, 54, doc.internal.pageSize.width-10, 54);
                doc.line(10, 59, doc.internal.pageSize.width-10, 59);
                doc.line(105, 64, doc.internal.pageSize.width-10, 64);
                doc.line(105, 69, doc.internal.pageSize.width-10, 69);
                doc.line(105, 74, doc.internal.pageSize.width-10, 74);
                doc.line(10, 92, doc.internal.pageSize.width-10, 92);
                doc.line(10, 44, 10, 92);
                doc.line(58, 44, 58, 54);
                doc.line(105, 44, 105, 92);
                doc.line(doc.internal.pageSize.width-58, 44, doc.internal.pageSize.width-58, 64);
                doc.line(doc.internal.pageSize.width-10, 44, doc.internal.pageSize.width-10, 92);
        
                doc.rect(10, 106, doc.internal.pageSize.width-20, 10, "F")
                doc.rect(10, 126, doc.internal.pageSize.width-20, 10, "F")
                doc.rect(10, 146, doc.internal.pageSize.width-20, 10, "F")
                doc.rect(10, 166, doc.internal.pageSize.width-20, 10, "F")
                doc.rect(105, 186, 95, 5, "F")
                doc.rect(105, 196, 95, 5, "F")
        
                doc.setFillColor("#edf2fb")
                doc.rect(10, 116, doc.internal.pageSize.width-20, 10, "F")
                doc.rect(10, 136, doc.internal.pageSize.width-20, 10, "F")
                doc.rect(10, 156, doc.internal.pageSize.width-20, 10, "F")
                doc.rect(105, 176, 95, 10, "F")
                doc.rect(105, 191, 95, 5, "F")
        
                doc.setFillColor("#113b97")
                doc.rect(10, 101, doc.internal.pageSize.width-20, 5, "F")
        
                doc.line(10, 101, doc.internal.pageSize.width-10, 101);
                doc.line(10, 106, doc.internal.pageSize.width-10, 106);
                doc.line(10, 116, doc.internal.pageSize.width-10, 116);
                doc.line(10, 126, doc.internal.pageSize.width-10, 126);
                doc.line(10, 136, doc.internal.pageSize.width-10, 136);
                doc.line(10, 146, doc.internal.pageSize.width-10, 146);
                doc.line(10, 156, doc.internal.pageSize.width-10, 156);
                doc.line(10, 166, doc.internal.pageSize.width-10, 166);
                doc.line(10, 171, doc.internal.pageSize.width-10, 171);
                doc.line(10, 176, doc.internal.pageSize.width-10, 176);
        
                doc.line(105, 181, doc.internal.pageSize.width-10, 181);
                doc.line(105, 186, doc.internal.pageSize.width-10, 186);
                doc.line(105, 191, doc.internal.pageSize.width-10, 191);
                doc.line(105, 196, doc.internal.pageSize.width-10, 196);
                doc.line(10, 201, doc.internal.pageSize.width-10, 201);
        
                doc.line(10, 270, doc.internal.pageSize.width-10, 270);
                doc.line(10, 280, doc.internal.pageSize.width-10, 280);
        
                doc.line(10, 101, 10, 280);
                doc.line(doc.internal.pageSize.width-10, 101, doc.internal.pageSize.width-10, 280);
                doc.line(22, 106, 22, 171);
                doc.line(105, 176, 105, 201);
                doc.line(175, 106, 175, 201);
                doc.line(150, 106, 150, 171);
                doc.line(125, 106, 125, 171);
        
                doc.setDrawColor(255, 255, 255);
                doc.line(22, 101, 22, 106);
                doc.line(175, 101, 175, 106);
                doc.line(150, 101, 150, 106);
                doc.line(125, 101, 125, 106);
                doc.addFont('Arial', 'Arial', 'normal');
                doc.setFont("Arial");
                doc.setFontSize(10);
                doc.setTextColor("#000")
                doc.text("Shipper:", 11, 48);
                doc.text("Phone Numbers:", 59, 48);
                doc.text("Invoice No:", 106, 48);
                doc.text("Date:", 153, 48);
                doc.text("To:", 11, 58);
                doc.text("Commercial Invoice No:", 106, 58);
                doc.text("Date:", 153, 58);
                doc.text("Bank Details:", 106, 73);
                doc.text("044 - 2453 0599", 59, 53);
                doc.setFont('helvetica');
                doc.text("Account Number: 10045177971 \nName: ONTWERP ANALYTICS PRIVATE LIMITED \nBank: IDFC FIRST BANK LTD\nIFSC: IDFB0080107", 106, 78);
                doc.text(selectedAdminData.otherData.agntAddress, 11, 67, {maxWidth:93});
                
                
                doc.setFont('helvetica', 'bold');
                doc.text("Ontwerp Analytics Pvt. Ltd.", 11, 52.7);
                doc.text(invNo, 106, 52.7);
                doc.text(invDate.toLocaleString("en-IN", { day: '2-digit', month: 'long', year: 'numeric' }), doc.internal.pageSize.width-11, 52.7, {align:"right"});
                doc.text(invNo, 106, 62.7);
                doc.text(invDate.toLocaleString("en-IN", { day: '2-digit', month: 'long', year: 'numeric' }), doc.internal.pageSize.width-11, 62.7, {align:"right"});
                doc.text("GST# - 33AACCO9279L1ZV", 106, 67.7);
                doc.text(selectedAdminData.otherData.agntName, 11, 62.7);
                doc.text("TwoRings Platform Usage", 23, 110);
                doc.text("TwoRings Platform Usage", 23, 120);
                doc.text("TwoRings Platform Usage", 23, 130);
                doc.text("TwoRings Platform Usage", 23, 140);
                doc.text("TwoRings Platform Usage", 23, 150);
                doc.text("TwoRings Platform Usage", 23, 160);
                doc.text("Terms and Conditions", 11, 210);
                
        
                doc.setFontSize(10);
                doc.text("Sub Total", 174, 174.7, {align:"right"});
                doc.text("CGST (9%)", 106, 179.7);
                doc.text("SGST (9%)", 106, 184.7);
                doc.text("Total", 106, 189.7);
                doc.text("Discounts (or) Corrections", 106, 194.7);
                doc.text("Payable Total (Including Tax)", 106, 199.7);
        
        
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.text("Start Plan Subscriptions", 23, 114);
                doc.text("Enhance Plan Subscriptions", 23, 124);
                doc.text("Premium Plan Subscriptions", 23, 134);
                doc.text("Elite Plan Subscriptions", 23, 144);
                doc.text("Supreme Plan Subscriptions", 23, 154);
                doc.text("Addtional Credits Subscriptions", 23, 164);
                doc.text("E. & O.E", 104, 179.7, {align:"right"});
                doc.text('Payment is due within 30 days from the date of the invoice.\nA late fee of 2% will be charged for payments received more than 15 days past the due date.\nPayments can be made by check, wire transfer, or credit card. Banking details are provided on the invoice.\nPartial payments are not accepted unless agreed upon in writing. A 50% deposit is required before the\ncommencement of services, with the remaining balance due within 15 days of project completion.\nThe terms and conditions stated in PI goes in line with any other terms and conditions mentioned vide mail/ quote', 22, 217,{lineHeightFactor:1.5});
                doc.text('1.\n2.\n3.\n4.\n\n5.', 20, 217,{lineHeightFactor:1.5, align:"right"});
                doc.setFontSize(8);
                doc.text("Amount Chargeable (in words)", 11, 179.7);
                doc.text("This is a system-generated bill; No signature is required\nYour support in choosing our software is truly valued", 105, 274, {align:"center"});
        
                doc.setFontSize(10);
                doc.setTextColor("#FFF")
                doc.setFont('helvetica', 'bold');
                doc.text("#", 16.5, 104.7, {align:"center"});
                doc.text("Item & Description", 73.5, 104.7, {align:"center"});
                doc.text("Qty", 137.5, 104.7, {align:"center"});
                doc.text("Rate", 162.5, 104.7, {align:"center"});
                doc.text("Amount", 187.5, 104.7, {align:"center"});
        
                doc.setFont('helvetica', 'normal');
                doc.setTextColor("#000")
                doc.text(payText, 11, 184.7, {maxWidth:80});
                doc.text("#436, 2nd Cross Street, VGP Layout, Uthandi, ECR, Chennai - 600119", 105, 284, {align:"center"});
                
                
                doc.text("1", 15, 112);
                doc.text("2", 15, 122);
                doc.text("3", 15, 132);
                doc.text("4", 15, 142);
                doc.text("5", 15, 152);
                doc.text("6", 15, 162);
        
                doc.text(startQty, 137.5, 112, {align:"center"});
                doc.text(enhanceQty, 137.5, 122, {align:"center"});
                doc.text(premiumQty, 137.5, 132, {align:"center"});
                doc.text(eliteQty, 137.5, 142, {align:"center"});
                doc.text(suprimeQty, 137.5, 152, {align:"center"});
                doc.text("1", 137.5, 162, {align:"center"});
        
                doc.addImage(rupeeSymb, 'PNG', 152, 109.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 152, 119.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 152, 129.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 152, 139.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 152, 149.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 152, 159.4, 1.8, 2.6);
        
                doc.addImage(rupeeSymb, 'PNG', 177, 109.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 177, 119.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 177, 129.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 177, 139.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 177, 149.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 177, 159.4, 1.8, 2.6);
        
                doc.addImage(rupeeSymb, 'PNG', 177, 172.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 177, 177.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 177, 182.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 177, 187.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 177, 192.4, 1.8, 2.6);
                doc.addImage(rupeeSymb, 'PNG', 177, 197.4, 1.8, 2.6);
        
                doc.text("635.59", 174, 112, {align:"right"});
                doc.text("1,059.32", 174, 122, {align:"right"});
                doc.text("2,118.64", 174, 132, {align:"right"});
                doc.text("4,237.29", 174, 142, {align:"right"});
                doc.text("6,355.93", 174, 152, {align:"right"});
                doc.text(creditAmt, 174, 162, {align:"right"});
        
                doc.text(startAmt, doc.internal.pageSize.width-11, 112, {align:"right"});
                doc.text(enhanceAmt, doc.internal.pageSize.width-11, 122, {align:"right"});
                doc.text(premiumAmt, doc.internal.pageSize.width-11, 132, {align:"right"});
                doc.text(eliteAmt, doc.internal.pageSize.width-11, 142, {align:"right"});
                doc.text(suprimeAmt, doc.internal.pageSize.width-11, 152, {align:"right"});
                doc.text(creditAmt, doc.internal.pageSize.width-11, 162, {align:"right"});
        
                
                doc.text(subtotal, doc.internal.pageSize.width-11, 175, {align:"right"});
                doc.setFont('helvetica', 'bold');
                doc.text(gst9per, doc.internal.pageSize.width-11, 180, {align:"right"});
                doc.text(gst9per, doc.internal.pageSize.width-11, 185, {align:"right"});
                doc.text(amttotal, doc.internal.pageSize.width-11, 190, {align:"right"});
                doc.text(totalDiscc, doc.internal.pageSize.width-11, 195, {align:"right"});
                doc.text(payabletot, doc.internal.pageSize.width-11, 200, {align:"right"});
                doc.addPage()
                
                doc.text(selectedAdminData.otherData.agntName, 105, 20, {align:"center"});
                doc.text(selectedAdminData.otherData.agntAddress, 105, 25, {align:"center"});
                doc.text(formatDateRange(selectedMonth), 105, 30, {align:"center"});
                doc.autoTable({
                  head: [header],
                  body: body1,
                  startY: 32,
                  margin: { right: 10, left: 10 },
                  theme: 'grid',
                  styles: {
                    fontSize:10,
                    lineColor: [0, 0, 0],
                    lineWidth: 0.2,
                  },
                  didParseCell: function (data) {
                    if (exceptPayIndex.includes(data.row.index)) {
                      data.cell.styles.fillColor = [255, 207, 201]
                    }
                  },
                  rowPageBreak:"avoid"
                });
                var finalY = doc.lastAutoTable.finalY || 10;
                doc.setFont('helvetica', 'bold');
                doc.text(alltotalled, doc.internal.pageSize.width-11, finalY+5, {align:"right"});
                
                doc.setPage(2);
                doc.setLineWidth(0.2);
                doc.setDrawColor("#000");
                doc.line(10, 15, doc.internal.pageSize.width-10, 15);
                doc.line(10, 15, 10, 52);
                doc.line(doc.internal.pageSize.width-10, 15, doc.internal.pageSize.width-10, 52);

                const pageCount = doc.internal.getNumberOfPages();
                for (let i = 2; i <= pageCount; i++) {
                  doc.setPage(i);
                  doc.setFont('helvetica', 'normal');
                  doc.setFontSize(10);
                  doc.text("#436, 2nd Cross Street, VGP Layout, Uthandi, ECR, Chennai - 600119", 105, 290, {align:"center"});
                }
            
                // Save the PDF
                doc.save(convertTitleToSlug(selectedAdminData.otherData.agntName) + "-"+selectedMonth+ '-bill.pdf');
                setPrintPortal(false);
                setBtnLoading(false);
            }
            else{
                alert("Please Select Invoice Date")
            }
        }
        else{
            alert("Invalid Invoice Number")
        }

        
    };

    const convertTitleToSlug = (title) => {
        const lowerCaseTitle = title.toLowerCase();
        const slug = lowerCaseTitle
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9\s-]/g, "") 
          .trim() 
          .replace(/\s+/g, "-") 
          .replace(/-+/g, "-");
        return slug;
    }

    return (
        <>
            <Modal open={printPortal} size="lg" onClose={() => setPrintPortal(false)}>
                <Modal.Header>
                    <Modal.Title>Download Invoice</Modal.Title>
                    
                </Modal.Header>
                <Modal.Body id="contentmdl">
                    <div className={styles.getInpites}>
                        <div className={styles.inputess}>
                            <label>Invoice Number</label>
                            <Input value={invNo} style={{width:200}} onChange={setInvNo} />
                        </div>
                        <div className={styles.inputess}>
                            <label>Invoice Date</label>
                            <DatePicker oneTap format="dd-MM-yyyy" value={invDate} onChange={setInvDate} />
                        </div>
                        <div className={styles.inputess}>
                            <label>Discount</label>
                            <Input type="number" value={invDisc} style={{width:80}} onChange={setInvDisc} />
                        </div>
                        
                    </div>
                    <div className={styles.printTable}>
                    {paymentData.length !== 0 && (
                        <CheckboxGroup
                        name="checkbox-group"
                        value={exceptPayIndex}
                        onChange={value => {
                          setExceptPayIndex(value);
                        }}
                      >
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Payment ID</th>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Plan</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                            {paymentData.map((payment,index) => {
                                return (
                                <tr key={index} style={exceptPayIndex.includes(index)?{backgroundColor:"#ffcfc9"}:{backgroundColor:"#FFF"}}>
                                    <td><Checkbox value={index}>{index}</Checkbox></td>
                                    <td>{payment.paymentId}</td>
                                    <td>{formatData(payment.createdAt)}</td>
                                    <td>{payment.gbName}</td>
                                    <td>{payment.gbGender}</td>
                                    <td>{payment.planName}</td>
                                    <td>{payment.paidAmount}</td>
                                </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        </CheckboxGroup>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer style={{paddingTop:20}}>
                    <Button loading={btnLoading} color="orange" appearance="primary" onClick={generatePDF}>Download Invoice</Button>
                    <Button color="orange" appearance="ghost" onClick={() => setPrintPortal(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            <div className="flex justify-end">
                <div className={styles.selectBtn}>
                    <select
                        id="months"
                        value={selectedMonth}
                        onChange={(event) => {
                            setSelectedMonth(event.target.value);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        {monthRange.map((month) => {
                            return <option key={month.value} value={month.value}>{month.label}</option>;
                        })}
                    </select>
                </div>
            </div>
            {adminLoading ? <DashboardTitle /> : <div className={styles.siteTitle}>Welcome to {selectedAdminData.otherData.agntName}</div>}
            {adminLoading ? (
                <DashboardTop />
            ) : (
                <div className={styles.topInfo}>
                    <div className={styles.infoBox}>
                        <div className={styles.infoTopTitle}>
                            <div className={styles.infoTitle}>This Month Total</div>
                            <div className={styles.infoPercent}>{monthCountVar(thisMonthAmount / 2, prevMonthAmount / 2)}</div>
                        </div>
                        <div className={styles.infoAmount}>₹{(thisMonthAmount / 2).toLocaleString("en-IN")}</div>
                        <div className={styles.infoPre}>Previous Month: ₹{(prevMonthAmount / 2).toLocaleString("en-IN")}</div>
                    </div>
                    <div className={styles.infoBox}>
                        <div className={styles.infoTopTitle}>
                            <div className={styles.infoTitle}>This Month Users</div>
                            <div className={styles.infoPercent}>{monthCountVar(selectedAdminData.monthTotal, selectedAdminData.preMonthTotal)}</div>
                        </div>
                        <div className={styles.infoAmount}>{selectedAdminData.monthTotal}</div>
                        <div className={styles.infoPre}>Previous Month: {selectedAdminData.preMonthTotal}</div>
                    </div>
                    <div className={`${styles.infoBox} ${styles.numberBox}`}>
                        <div className={styles.allTotal}>
                            <span>Today User</span>
                            <p>{selectedAdminData.todayTotal}</p>
                        </div>
                        <div className={styles.allUsers}>
                            <div className={styles.allActive}>
                                <span>Male</span>
                                <p>{selectedAdminData.todayMale}</p>
                            </div>
                            <div className={styles.allActive}>
                                <span>Female</span>
                                <p>{selectedAdminData.todayFemale}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.infoBox} ${styles.numberBox}`}>
                        <div className={styles.allTotal}>
                            <span>Total</span>
                            <p>{selectedAdminData.allTotal}</p>
                        </div>
                        <div className={styles.allUsers}>
                            <div className={styles.allActive}>
                                <span>Active Users</span>
                                <p>{selectedAdminData.allActive}</p>
                            </div>
                            <div className={styles.allActive}>
                                <span>Inactive Users</span>
                                <p>{selectedAdminData.allInactive}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.desktopChart}>
                <CChart
                    className={styles.chart}
                    type="bar"
                    customTooltips={false}
                    height={80}
                    data={{
                        labels: currentMonthDates,
                        datasets: [
                            {
                                label: "Registrations",
                                backgroundColor: "rgb(255, 145, 0)",
                                borderColor: "rgb(255, 145, 0)",
                                pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                pointBorderColor: "#fff",
                                data: chartData,
                            },
                        ],
                    }}
                    labels="months"
                />
            </div>
            <div className={styles.mobileChart}>
                <CChart
                    className={styles.chart}
                    type="bar"
                    customTooltips={false}
                    height={160}
                    data={{
                        labels: currentMonthDates,
                        datasets: [
                            {
                                label: "Registrations",
                                backgroundColor: "rgb(255, 145, 0)",
                                borderColor: "rgb(255, 145, 0)",
                                pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                pointBorderColor: "#fff",
                                data: chartData,
                            },
                        ],
                    }}
                    labels="months"
                />
            </div>
            <div className={styles.twoDiv}>
                <div className={styles.leftWarp}>
                    <div className={styles.planSection}>
                        <div className={styles.PaymentTitle}>
                            <h2>Plan Details</h2>
                        </div>

                        {adminLoading ? (
                            <DashboardList />
                        ) : (
                            <table className={styles.paymentsTable}>
                                <thead className="bg-amber-300">
                                    <tr>
                                        <th className="py-2">Plan</th>
                                        <th>Count</th>
                                        <th>Cost</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td width={400}>
                                            <div className={styles.planName}>
                                                <Image src="/Start.webp" width={50} height={50} className="rounded-lg" />
                                                <div className={styles.planNameWrap}>
                                                    <div className={styles.planText}>Start Plan</div>
                                                    <div className={styles.planTextAmt}>₹1,500</div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div style={{ width: `${getProgress(startCount)}%` }} className={`bg-yellow-400 h-2.5 rounded-full]`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td align="center">{startCount}</td>
                                        <td align="right">₹{startAmount.toLocaleString("en-IN")}</td>
                                        <td align="right">₹{Math.round(startAmount / 2).toLocaleString("en-IN")}</td>
                                    </tr>
                                    <tr>
                                        <td width={400}>
                                            <div className={styles.planName}>
                                                <Image src="/Enhance.webp" width={50} height={50} className="rounded-lg" />
                                                <div className={styles.planNameWrap}>
                                                    <div className={styles.planText}>Enhance Plan</div>
                                                    <div className={styles.planTextAmt}>₹2,500</div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div style={{ width: `${getProgress(enhanceCount)}%` }} className={`bg-yellow-400 h-2.5 rounded-full`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td align="center">{enhanceCount}</td>
                                        <td align="right">₹{enhanceAmount.toLocaleString("en-IN")}</td>
                                        <td align="right">₹{Math.round(enhanceAmount / 2).toLocaleString("en-IN")}</td>
                                    </tr>
                                    <tr>
                                        <td width={400}>
                                            <div className={styles.planName}>
                                                <Image src="/Premium.webp" width={50} height={50} className="rounded-lg" />
                                                <div className={styles.planNameWrap}>
                                                    <div className={styles.planText}>Premium Plan</div>
                                                    <div className={styles.planTextAmt}>₹5,000</div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div style={{ width: `${getProgress(premiumCount)}%` }} className={`bg-yellow-400 h-2.5 rounded-full`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td align="center">{premiumCount}</td>
                                        <td align="right">₹{premiumAmount.toLocaleString("en-IN")}</td>
                                        <td align="right">₹{Math.round(premiumAmount / 2).toLocaleString("en-IN")}</td>
                                    </tr>
                                    <tr>
                                        <td width={400}>
                                            <div className={styles.planName}>
                                                <Image src="/Elite.webp" width={50} height={50} className="rounded-lg" />
                                                <div className={styles.planNameWrap}>
                                                    <div className={styles.planText}>Elite Plan</div>
                                                    <div className={styles.planTextAmt}>₹10,000</div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div style={{ width: `${getProgress(eliteCount)}%` }} className={`bg-yellow-400 h-2.5 rounded-full`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td align="center">{eliteCount}</td>
                                        <td align="right">₹{eliteAmount.toLocaleString("en-IN")}</td>
                                        <td align="right">₹{Math.round(eliteAmount / 2).toLocaleString("en-IN")}</td>
                                    </tr>
                                    <tr>
                                        <td width={400}>
                                            <div className={styles.planName}>
                                                <Image src="/Suprime.webp" width={50} height={50} className="rounded-lg" />
                                                <div className={styles.planNameWrap}>
                                                    <div className={styles.planText}>Supreme Plan</div>
                                                    <div className={styles.planTextAmt}>₹15,000</div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div style={{ width: `${getProgress(suprimeCount)}%` }} className={`bg-yellow-400 h-2.5 rounded-full`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td align="center">{suprimeCount}</td>
                                        <td align="right">₹{suprimeAmount.toLocaleString("en-IN")}</td>
                                        <td align="right">₹{Math.round(suprimeAmount / 2).toLocaleString("en-IN")}</td>
                                    </tr>
                                    <tr>
                                        <td width={400}>
                                            <div className={styles.planName}>
                                                <Image src="/Royal_30.webp" width={50} height={50} className="rounded-lg" />
                                                <div className={styles.planNameWrap}>
                                                    <div className={styles.planText}>Extra Credits</div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div style={{ width: `${getProgress(creditCount)}%` }} className={`bg-yellow-400 h-2.5 rounded-full`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td align="center">{creditCount}</td>
                                        <td align="right">₹{creditAmount.toLocaleString("en-IN")}</td>
                                        <td align="right">₹{Math.round(creditAmount / 2).toLocaleString("en-IN")}</td>
                                    </tr>
                                    <tr className="bg-amber-200 font-bold">
                                        <td align="left" className="py-2">
                                            Total
                                        </td>
                                        <td align="center">{selectedAdminData.monthTotal}</td>
                                        <td align="right">₹{thisMonthAmount.toLocaleString("en-IN")}</td>
                                        <td align="right">₹{(thisMonthAmount / 2).toLocaleString("en-IN")}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className={styles.printableButton}>
                    
                        
                        <Button color="orange" appearance="ghost" onClick={() => setPrintPortal(true)}>Print Invoice</Button>
                    </div>

                    <div id="tableee" className={styles.paymentsSection}>
                        <div className={styles.PaymentTitle}>
                            <h2>Payment Details</h2>
                        </div>
                        {paymentData.length !== 0 && (
                            <table className={styles.paymentsTable}>
                                <thead className="bg-amber-300">
                                    <tr>
                                        <th>Valid</th>
                                        <th className="py-2">User Details</th>
                                        <th>Payment ID</th>
                                        <th>Plan</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentData.map((payment, index) => {
                                        const disc = Number(payment.totalAmount) - Number(payment.paidAmount);

                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <label className="inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" value="" className="sr-only peer" checked />
                                                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
                                                    </label>
                                                </td>
                                                <td>
                                                    <div className={styles.payUser}>
                                                        {payment.gbGender === "Male" ? (
                                                            <div className={styles.payMale}>
                                                                <SlUser />
                                                            </div>
                                                        ) : (
                                                            <div className={styles.payFemale}>
                                                                <SlUserFemale />
                                                            </div>
                                                        )}
                                                        <div className={styles.payUserDetail}>
                                                            {payment.gbName}
                                                            <span>
                                                                {payment.twoRingsId} {payment.purchaseDisc === "Renew Plan" && <em className={styles.renew}>Renew</em>}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={styles.payIdDate}>
                                                        <span className={styles.payid}>
                                                            <MdNumbers /> {payment.paymentId}
                                                        </span>
                                                        <span>
                                                            <IoCalendarOutline /> {formatData(payment.createdAt)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <span className={getPayClass(payment.planName)}>{payment.planName}</span>{" "}
                                                </td>

                                                <td>
                                                    <div className={styles.payAmount}>
                                                        <p>₹{Number(payment.paidAmount).toLocaleString("en-IN")}</p>{" "}
                                                        {disc > 0 && (
                                                            <span>
                                                                Coupon: {payment.couponCode} | ₹{disc.toLocaleString("en-IN")} off
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className={styles.mobilepaymentsSection}>
                        <div className={styles.PaymentTitle}>
                            <h2>Payment Details</h2>
                        </div>
                        {paymentData.length !== 0 && (
                            <table className={styles.paymentsTable}>
                                <tbody>
                                    {paymentData.map((payment, index) => {
                                        const disc = Number(payment.totalAmount) - Number(payment.paidAmount);

                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className={styles.payUser}>
                                                        {payment.gbGender === "Male" ? (
                                                            <div className={styles.payMale}>
                                                                <SlUser />
                                                            </div>
                                                        ) : (
                                                            <div className={styles.payFemale}>
                                                                <SlUserFemale />
                                                            </div>
                                                        )}
                                                        <div className={styles.payUserDetail}>
                                                            {payment.gbName}
                                                            <span>
                                                                {payment.twoRingsId} {payment.purchaseDisc === "Renew Plan" && <em className={styles.renew}>Renew</em>}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className={styles.payIdDate}>
                                                        <span className={styles.payid}>
                                                            <MdNumbers /> {payment.paymentId}
                                                        </span>
                                                        <span>
                                                            <IoCalendarOutline /> {formatData(payment.createdAt)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap items-end flex flex-col">
                                                    <span className={getPayClass(payment.planName)}>{payment.planName}</span>
                                                    <div className={styles.payAmount}>
                                                        <p>₹{Number(payment.paidAmount).toLocaleString("en-IN")}</p>{" "}
                                                        {disc > 0 && (
                                                            <span>
                                                                Coupon: {payment.couponCode} | ₹{disc.toLocaleString("en-IN")} off
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                <div className={styles.rightWarp}>
                    {adminLoading ? (
                        <DashboardSideBar />
                    ) : (
                        <div className={styles.detailsSection}>
                            <div className={styles.profileCard}>
                                <div className={styles.editAdmins}>
                                    <IconButton
                                        color="warning"
                                        size="large"
                                        onClick={() => {
                                            router.push(`/dashboard/admin/${adminid}/edit`);
                                        }}
                                        aria-label="add an alarm"
                                    >
                                        <LiaUserEditSolid />
                                    </IconButton>
                                </div>
                                <div className={styles.pentagon}>
                                    <img src={selectedAdminData.otherData.agntDP || "/no-profile-image.png"} fill />
                                </div>
                                <div className={styles.churchDetails}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{selectedAdminData.otherData.agntName}</td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td>{selectedAdminData.otherData.agntAddress}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone Number</td>
                                                <td>{selectedAdminData.otherData.agntPhone}</td>
                                            </tr>
                                            <tr>
                                                <td>Email ID</td>
                                                <td>{selectedAdminData.otherData.agntEmail}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={styles.profileCard}>
                                <div className={styles.pentagon}>
                                    <img src={selectedAdminData.otherData.agntContactDP || "/no-profile-image.png"} fill />
                                </div>
                                <div className={styles.churchDetails}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{selectedAdminData.otherData.agntContactName || "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>Designation</td>
                                                <td>{selectedAdminData.otherData.agntContactDes || "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone Number</td>
                                                <td>{selectedAdminData.otherData.agntContactMobile || "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>Email ID</td>
                                                <td>{selectedAdminData.otherData.agntContactEmail || "-"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className={styles.profileCard}>
                                <div className={styles.pentagon}>
                                    <img src={selectedAdminData.otherData.agntInchargeDP || "/no-profile-image.png"} fill />
                                </div>
                                <div className={styles.churchDetails}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{selectedAdminData.otherData.agntInchargeName || "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td>{selectedAdminData.otherData.agntInchargeAddress || "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone Number</td>
                                                <td>{selectedAdminData.otherData.agntInchargeMobile || "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>Alternate Phone Number</td>
                                                <td>{selectedAdminData.otherData.agntInchargeAlterMobile || "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>Email ID</td>
                                                <td>{selectedAdminData.otherData.agntInchargeEmail || "-"}</td>
                                            </tr>
                                            <tr>
                                                <td>Aadhar Number</td>
                                                <td>{selectedAdminData.otherData.agntInchargeAadharNumber || "-"}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <img src={selectedAdminData.otherData.agntInchargeAadharImage || "/no-image.jpg"} width={300} height={200} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    function convertNumberToWords(number) {
        const ones = [
          "",
          "One",
          "Two",
          "Three",
          "Four",
          "Five",
          "Six",
          "Seven",
          "Eight",
          "Nine",
          "Ten",
          "Eleven",
          "Twelve",
          "Thirteen",
          "Fourteen",
          "Fifteen",
          "Sixteen",
          "Seventeen",
          "Eighteen",
          "Nineteen",
        ];
      
        const tens = [
          "",
          "",
          "Twenty",
          "Thirty",
          "Forty",
          "Fifty",
          "Sixty",
          "Seventy",
          "Eighty",
          "Ninety",
        ];
      
        const scales = ["", "Thousand", "Lakh", "Crore"];
      
        // Helper function to convert numbers less than 1000
        function convertBelowThousand(num) {
          let str = "";
      
          const hundred = Math.floor(num / 100);
          num %= 100;
      
          if (hundred > 0) {
            str += `${ones[hundred]} Hundred `;
          }
      
          if (num > 0) {
            if (num < 20) {
              str += ones[num] + " ";
            } else {
              str += tens[Math.floor(num / 10)] + " ";
              if (num % 10 > 0) {
                str += ones[num % 10] + " ";
              }
            }
          }
      
          return str.trim();
        }
      
        if (number === 0) return "Zero Rupees";
      
        const parts = number.toString().split(".");
        const rupeesPart = parseInt(parts[0], 10);
        const paisePart = parts.length > 1 ? parseInt(parts[1].substr(0, 2), 10) : 0;
      
        let words = "";
      
        let scale = 0;
        let currentRupees = rupeesPart;
      
        while (currentRupees > 0) {
          const currentPart = currentRupees % 1000;
      
          if (currentPart > 0) {
            const scaleWord = scales[scale];
            words = `${convertBelowThousand(currentPart)} ${scaleWord} ${words}`.trim();
          }
      
          currentRupees = Math.floor(currentRupees / 1000);
          scale++;
        }
      
        words = `${words} Rupees`.trim();
      
        if (paisePart > 0) {
          words += ` and ${convertBelowThousand(paisePart)} Paise`;
        }
      
        return words;
      }
}

export default AdminInfo;
