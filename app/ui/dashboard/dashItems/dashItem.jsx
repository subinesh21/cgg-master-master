"use client";
import React, { useEffect, useState } from 'react'
import styles from "./dashItem.module.css";
import { BiCaretDown } from "react-icons/bi";
import { BiCaretUp } from "react-icons/bi";
import { SlUserFemale, SlUser } from "react-icons/sl";
import { MdNumbers } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";

import { CChart } from "@coreui/react-chartjs";
import axios from "axios";
import Image from "next/image";
import DashboardTop from '../../skeletons/dashboardTop';
import DashboardTitle from '../../skeletons/dashboardTitle';
import DashboardList from '../../skeletons/dashboardList';
import DashboardSideBar from '../../skeletons/dashboardSideBar';
function DashItem({ token, baseUrl }) {
    const [monthRange, setMonthRange] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [currentMonthDates, setCurrentMonthDates] = useState("");
    const [adminLoading, setAdminLoading] = useState(true);
    const [selectedAdminData, setSelectedAdminData] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [paymentData, setPaymentData] = useState([]);

    const [lastLoginData, setLastLoginData] = useState([]);

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
        if(selectedMonth!==""){
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
            gMonth: Number(monthYear[0]),
            gYear: Number(monthYear[1]),
        };

        axios.post(`${baseUrl}masterusers/getFullDashNew`, bodytxt, config).then((result) => {
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

                const resultLoginData = result.data.recentLogin.filter((user) => user.twoRingsId !== "TR100001");

                setLastLoginData(resultLoginData)

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

    const converToAgo = (datestr) => {
        const now = new Date().getTime();
        const actDate = new Date(datestr)
        const timeElapsed = now - actDate.getTime();
    
        let seconds = Math.floor(timeElapsed / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
    
        let agostr;
        if (days > 0) {
          agostr = `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
          agostr = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
          agostr = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
          agostr = `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        }
    
        return agostr
      }

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
  return (
    <>
            <div className="flex justify-end">
                <div className={styles.selectBtn}>
                    <select
                        id="countries"
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
            {adminLoading ? <DashboardTitle /> : <div className={styles.siteTitle}>Welcome to {selectedAdminData.allAdmin[0].agntName}</div>}
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
                                <span>Male Users</span>
                                <p>{selectedAdminData.allMale}</p>
                            </div>
                            <div className={styles.allActive}>
                                <span>Female Users</span>
                                <p>{selectedAdminData.allFemale}</p>
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
                                                    <div className={`${styles.progBar} w-full bg-gray-200 rounded-full h-2.5`}>
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
                                                    <div className={`${styles.progBar} w-full bg-gray-200 rounded-full h-2.5`}>
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
                                                    <div className={`${styles.progBar} w-full bg-gray-200 rounded-full h-2.5`}>
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
                                                    <div className={`${styles.progBar} w-full bg-gray-200 rounded-full h-2.5`}>
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
                                                    <div className={`${styles.progBar} w-full bg-gray-200 rounded-full h-2.5`}>
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
                                                    <div className={`${styles.progBar} w-full bg-gray-200 rounded-full h-2.5`}>
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
                                        <td align='left' className="py-2">Total</td>
                                        <td align='center'>{selectedAdminData.monthTotal}</td>
                                        <td align='right'>₹{thisMonthAmount.toLocaleString("en-IN")}</td>
                                        <td align='right'>₹{(thisMonthAmount/2).toLocaleString("en-IN")}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className={styles.paymentsSection}>
                        <div className={styles.PaymentTitle}>
                            <h2>Used Coupons</h2>
                        </div>
                        {adminLoading?
                        <DashboardList />
                        :(
                            <table className={styles.paymentsTable}>
                                <thead className="bg-amber-300">
                                    <tr>
                                        <th>Name</th>
                                        <th className="py-2">Admin ID</th>
                                        <th>Coupon Code</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedAdminData.userCoupon.map((coupon) => {
                                        

                                        return (
                                            <tr key={coupon.couponCode}>
                                                <td>
                                                {coupon.avilUserName}
                                                </td>
                                                <td>
                                                {coupon.avilUserAdmin}
                                                </td>
                                                <td>
                                                {coupon.couponCode}
                                                </td>
                                                <td>
                                                    {coupon.discType==="amt"? `₹${coupon.discAmt}`:`${coupon.discAmt}%`}
                                                </td>

                                                <td>
                                                {formatData(coupon.updatedAt)}
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
                        {adminLoading? 
                        <DashboardList />
                        :
                        (
                            <table className={styles.paymentsTable}>
                                <tbody>
                                    {selectedAdminData.userCoupon.map((coupon) => {
                                        
                                        return (
                                            <tr key={coupon.couponCode}>
                                                <td>
                                                    <div>
                                                    {coupon.avilUserName}
                                                    </div>
                                                    <div>
                                                    {coupon.avilUserAdmin}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap items-end flex flex-col">
                                                    <div>
                                                    {coupon.couponCode}
                                                    </div>
                                                    <div>
                                                    {coupon.discType==="amt"? `₹${coupon.discAmt}`:`${coupon.discAmt}%`}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                    {formatData(coupon.updatedAt)}
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
                    {adminLoading?
                    <DashboardSideBar />
                    : (
                        <div className={styles.detailsSection}>
                            <div className={styles.profileCard}>
                                <div className={styles.pentagon}>
                                    <Image src="/app-icon-a.png" fill />
                                </div>
                                <div className={styles.churchDetails}>
                                    <table className='w-full'>
                                        <tbody>
                                            <tr>
                                                <td>Next Generating ID</td>
                                                <td>{selectedAdminData.metaData.nextID}</td>
                                            </tr>
                                            <tr>
                                                <td>OTP SMS Remaining</td>
                                                <td>{selectedAdminData.metaData.smsBalance}</td>
                                            </tr>
                                            <tr>
                                                <td>Android App Version</td>
                                                <td>{selectedAdminData.metaData.androidVerison}</td>
                                            </tr>
                                            <tr>
                                                <td>iOS App Version</td>
                                                <td>{selectedAdminData.metaData.iosVerison}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {!adminLoading && <div className={styles.profileCard}>
                                <p className='font-bold'>Last Login</p>
                                <div className={styles.lastLogin}>
                                    <table>
                                        <tbody>
                                            {
                                                lastLoginData.map((resentUser)=>{
                                                    return(
                                                        <tr key={resentUser.twoRingsId}>
                                                            <td>
                                                                <div className={styles.payUser}>
                                                                    <img className='rounded-lg border-2 border-amber-400' src={resentUser.gbProfilePicLowRes || "no-profile-image.png"} width={50} height={50} />
                                                                    <div className={styles.payUserDetail}>
                                                                        {resentUser.gbName}
                                                                        <span>
                                                                            {resentUser.twoRingsId}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td align='right'><div className={styles.agoText}>{converToAgo(resentUser.lastLogin)}</div></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>}
                            
                        </div>
                    )}
                </div>
            </div>
        </>
  )
}

export default DashItem