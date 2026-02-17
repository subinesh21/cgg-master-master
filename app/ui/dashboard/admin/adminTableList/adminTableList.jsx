"use client";
import React, { useEffect, useState } from "react";
import styles from "./adminTableList.module.css";
import Image from "next/image";
import Link from "next/link";
import { LiaPhoneVolumeSolid, LiaCalendarDaySolid } from "react-icons/lia";
import { PiCreditCardLight } from "react-icons/pi";
import axios from "axios";
import AllUserLoading from "../../users/allUserLoading";

function AdminTableList({ token, baseUrl }) {
    const [userLoading, setUserLoading] = useState(true);
    const [allAdmins, setAllAdmins] = useState([]);
    const [monthUsers, setMonthUsers] = useState([]);
    const [todayUsers, setTodayUsers] = useState([]);
    const [monthPayments, setMonthPayments] = useState([]);

    useEffect(() => {
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodyTxt = {};
        axios
            .post(`${baseUrl}masterusers/getAllAdminsNew`, bodyTxt, config)
            .then((result1) => {
                if (result1.data.success) {
                    setAllAdmins(result1.data.allAdmins);
                    setMonthUsers(result1.data.monthUserList);
                    setTodayUsers(result1.data.todayUserList);
                    setMonthPayments(result1.data.monthTrans);
                    setUserLoading(false);
                } else {
                    console.log(result1.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const getPlandetails = (adminId) => {
        const payments = monthPayments.filter((admin) => admin.assAdmin === adminId);
        const monthNos = monthUsers.filter((users) => users.assAdmin === adminId).length;
        const todayNos = todayUsers.filter((users) => users.assAdmin === adminId).length;
        let totalAmount = 0;
        console.log(payments);
        payments.map((admin) => {
            totalAmount += Number(admin.paidAmount);
        });
        const ourTotal = totalAmount / 2;
        return {
            ourTotal: ourTotal,
            monthNos: monthNos,
            todayNos: todayNos,
        };
    };

    return (
        <div className={styles.table}>
            <div className={styles.singleTitle}>
                <div className={styles.userCard}>
                    <strong>Church Details</strong>
                </div>
                <div className={styles.group1}>
                    <div className={styles.loginInfo}>
                        <strong>Contact</strong>
                    </div>

                    <div className={styles.plan}>
                        <strong>This Month</strong>
                    </div>
                </div>
                <div className={styles.group2}>
                    <div className={styles.churchInfo}>
                        <strong>Incharge</strong>
                    </div>
                    <div className={styles.actions}>
                        <strong>Status</strong>
                    </div>
                </div>
            </div>

            {userLoading ? (
                <AllUserLoading nos={7} />
            ) : (
                <>
                    {allAdmins.map((item, index) => {
                        const { ourTotal, monthNos, todayNos } = getPlandetails(item.loginId);

                        return (
                            <Link key={`userSingle`} href={`/dashboard/admin/${item.loginId}`} className={styles.singleUser}>
                                <div className={styles.userCard}>
                                    <div>
                                        <img src={item.agntDP || "/no-profile-image.png"} alt={item.loginId} className={styles.profilePic} width={60} height={60} />
                                    </div>
                                    <div className={styles.userInfo}>
                                        <span className={styles.name}>{item.agntName}</span>
                                        <span className={styles.trid}>{item.agntAddress}</span>
                                        <span className={styles.gender}>{item.loginId}</span>
                                    </div>
                                </div>
                                <div className={styles.group1}>
                                    <div className={styles.loginInfo}>
                                        <span className={styles.phoneNumber}>
                                            <LiaPhoneVolumeSolid className={styles.icon} /> {item.agntPhone}
                                        </span>
                                        <span className={styles.cardNumber}>
                                            <PiCreditCardLight className={styles.icon} /> <p>{item.agntEmail}</p>
                                        </span>
                                    </div>

                                    <div className={styles.plan}>
                                        <span className={styles.amount}>₹{ourTotal.toLocaleString("en-IN")}</span>
                                        <span className={styles.remcount}>
                                            Month: {monthNos} | Today: {todayNos}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.group2}>
                                    <div className={styles.churchInfo}>
                                        <div>
                                            <img src={item.agntInchargeDP || "/no-profile-image.png"} alt="" className={styles.churchDp} width={40} height={40} />
                                        </div>
                                        <div className={styles.details}>
                                            <span className={styles.churchName}>{item.agntInchargeName}</span>
                                            <span className={styles.churchid}>{item.agntInchargeMobile}</span>
                                        </div>
                                    </div>
                                    <div className={styles.actions}>
                                        <div className={item.actStatus}>{item.actStatus}</div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}{" "}
                </>
            )}
        </div>
    );
}

export default AdminTableList;
