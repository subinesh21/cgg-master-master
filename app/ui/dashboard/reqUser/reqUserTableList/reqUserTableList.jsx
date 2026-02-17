"use client";
import React, { useEffect, useState } from "react";
import styles from "./reqUserTable.module.css";
import Link from "next/link";
import Image from "next/image";
import { LiaPhoneVolumeSolid, LiaCalendarDaySolid } from "react-icons/lia";
import { PiCreditCardLight } from "react-icons/pi";
import axios from "axios";
import AllUserLoading from "../../users/allUserLoading";
import { MdSearch } from "react-icons/md";
import { Pagination } from "@mui/material";

function ReqUserTableList({ token, baseUrl }) {
    const [userLoading, setUserLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [allAdmins, setAllAdmins] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [totPages, setTotPages] = useState(1);
    const [serQuery, setSerQuery] = useState("");

    useEffect(() => {
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        axios
            .get(`${baseUrl}masterusers/getAllAdmins`, config)
            .then((result1) => {
                if (result1.data.success) {
                    setAllAdmins(result1.data.data);
                    getData(1);
                } else {
                    console.log(result1.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const getData = (pgno) => {
        setUserLoading(true);
        const bodytxt = {
            pageno: pgno,
            search: serQuery,
            perpage: 15,
        };
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        axios
            .post(`${baseUrl}masterusers/getReqUsersByMaster`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setAllUsers(result.data.data);
                    setTotPages(result.data.totPage);
                    setUserLoading(false);
                } else {
                    console.log(result.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getPayClass = (plan) => {
        let hello;
        if(plan === "Done"){
          hello = "doneStyle"
        }
        else if(plan === "Submitted" || plan === "Payment"){
          hello = "subStyle"
        }
        else if(plan == undefined){
          hello = "emptyStyle"
        }
        else{
          hello = "numberStyle";
        }
        return hello 
      }
      const getAdminDetails = (assAdmin) => {
        const admin = allAdmins.find((admin) => admin.loginId === assAdmin);
        return admin
      };

      const formatDateFull = ( ddt ) => {
        var xxx = new Date(ddt)
        if(!isNaN(xxx.getTime())){
          return xxx.toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-')
        }
        else{
          return "-"
        }
      }

      const handleSearchEnter = (event) => {
        if(event.keyCode === 13){
          getData(1)
        }
      }

      const handlePageChange = (event, value) => {
        setPageno(value)
        getData(value)
      }

    return (<>
        <div className={styles.search}>
        <div className={styles.searchContainer}>
            <MdSearch />
            <input
                type="text"
                placeholder={"Search Here"}
                className={styles.input}
                // onChange={handleSearch}
                onChange={(e) => setSerQuery(e.target.value)} 
                onKeyDown={handleSearchEnter}
            />
            </div>
        </div>
        {userLoading?
        <AllUserLoading nos={15}/>
        :
        <div className={styles.table}>
            {allUsers.map((item, index) => {
                return (
                    
                    <div key={`userSingle${index}`} className={styles.singleUser}>
                        <div className={styles.userCard}>
                            <div>
                                <img src={item.profilePicLowRes || "/no-profile-image.png"} alt={item.gbName} className={styles.profilePic} width={60} height={60} />
                            </div>
                            <div className={styles.userInfo}>
                                <span className={styles.name}>{item.gbName}</span>
                                <span className={styles.trid}>{formatDateFull(item.dateOfBirth)}</span>
                                <span className={styles.gender}>{item.gender}</span>
                            </div>
                        </div>
                        <div className={styles.group1}>
                            <div className={styles.loginInfo}>
                                <span className={styles.phoneNumber}>
                                    <LiaPhoneVolumeSolid className={styles.icon} /> {item.gbMobileNumber}
                                </span>
                                <span className={styles.cardNumber}>
                                    <PiCreditCardLight className={styles.icon} /> {item.otpVal}
                                </span>
                            </div>

                            <div className={styles.plan}>
                                <span className={getPayClass(item.statusAvtd)}>{item.statusAvtd}</span>
                            </div>
                        </div>
                        <div className={styles.group2}>
                            <div className={styles.churchInfo}>
                                <div>
                                    <img src={getAdminDetails(item.assAdmin).agntDP} alt={getAdminDetails(item.assAdmin).agntName} className={styles.churchDp} width={40} height={40} />
                                </div>
                                <div className={styles.details}>
                                    <span className={styles.churchName}>{getAdminDetails(item.assAdmin).agntName}</span>
                                    <span className={styles.churchid}>{getAdminDetails(item.assAdmin).loginId}</span>
                                    
                                    
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <div>{formatDateFull(item.createdAt)}</div>
                            </div>
                        </div>
                    </div>
                );
            })}
            
        </div>}
        <div className="flex flex-row justify-end mt-4 mr-1">
                <Pagination onChange={handlePageChange} page={pageno} count={totPages} variant="outlined" color="primary" shape="rounded" />
            </div>
        </>
    );
}

export default ReqUserTableList;
