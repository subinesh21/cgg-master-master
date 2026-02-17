"use client";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./approvalList.module.css";
import { RotatingLines } from "react-loader-spinner";
import "rsuite/dist/rsuite-no-reset.min.css";
import { Button } from "rsuite";

function ApprovalList({ token, baseUrl }) {
    const [userLoading, setUserLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [allUsers2, setAllUsers2] = useState([]);
    const [allUsers3, setAllUsers3] = useState([]);
    const [allAdmins, setAllAdmins] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [totPages, setTotPages] = useState(1);
    const [approveLoad1, setApproveLoad1] = useState(null);
    const [rejectLoad1, setRejectLoad1] = useState(null);
    const [approveLoad2, setApproveLoad2] = useState(null);
    const [rejectLoad2, setRejectLoad2] = useState(null);
    const [approveLoad3, setApproveLoad3] = useState(null);
    const [rejectLoad3, setRejectLoad3] = useState(null);
    const [updateed, setUpdateed] = useState(0);

    useEffect(() => {
        getData(1);
    }, [updateed]);

    const getData = (pgno) => {
        setUserLoading(true);
        const bodytxt = {
            pageno: pgno,
            perpage: 15,
        };
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        axios
            .post(`${baseUrl}masterusers/getAllApproval`, bodytxt, config)
            .then((result) => {
                if (result.data.success) {
                    setAllUsers(result.data.gal1records);
                    setAllUsers2(result.data.gal2records);
                    setAllUsers3(result.data.gal3records);

                    setUserLoading(false);
                } else {
                    console.log(result.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const adminApproveImage = (trid, galNo) => {
        if (galNo === "1") {
            setApproveLoad1(trid);
        } else if (galNo === "2") {
            setApproveLoad2(trid);
        } else if (galNo === "3") {
            setApproveLoad3(trid);
        } else {
        }

        const headtxt = {
            headers: { Authorization: "Bearer " + token },
        };

        const bodytxt = {
            trid: trid,
            galid: galNo,
        };

        axios.post(`${baseUrl}masterusers/approveGalImage/`, bodytxt, headtxt).then((response1) => {
            if (galNo === "1") {
                setApproveLoad1(null);
            } else if (galNo === "2") {
                setApproveLoad2(null);
            } else if (galNo === "3") {
                setApproveLoad3(null);
            } else {
            }
            if (response1.data.success) {
                console.log(response1.data.data);
                setUpdateed((prevUpdated) => prevUpdated + 1);
            } else {
                console.log(response1.data.data);
            }
        });
    };

    const adminRejectImage = (trid, galNo) => {
        if (galNo === "1") {
            setRejectLoad1(trid);
        } else if (galNo === "2") {
            setRejectLoad2(trid);
        } else if (galNo === "3") {
            setRejectLoad3(trid);
        } else {
        }

        const headtxt = {
            headers: { Authorization: "Bearer " + token },
        };

        const bodytxt = {
            trid: trid,
            galid: galNo,
        };

        axios.post(`${baseUrl}masterusers/rejectGalImage/`, bodytxt, headtxt).then((response1) => {
            if (galNo === "1") {
                setRejectLoad1(null);
            } else if (galNo === "2") {
                setRejectLoad2(null);
            } else if (galNo === "3") {
                setRejectLoad3(null);
            } else {
            }

            if (response1.data.success) {
                console.log(response1.data.data);
                setUpdateed((prevUpdated) => prevUpdated + 1);
            } else {
                console.log(response1.data.data);
            }
        });
    };
    return (
        <div>
            {userLoading ? (
                <div className={styles.loading}><RotatingLines strokeColor="orange" strokeWidth="5" animationDuration="0.75" width="40" /></div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.approvalSection}>
                        <div className={styles.secContainer}>
                            
                            {allUsers.length==0?
                            <div className={styles.noApproval}>No Pending Approvals</div>
                            :allUsers.map((item, index) => {
                                return (
                                    <div key={index} className={styles.singleCustomer}>
                                        <div className={styles.photoSection}>
                                            <img
                                                src={
                                                    item.oldGallery1Sqr ||
                                                    "https://firebasestorage.googleapis.com/v0/b/rcm-backend-c92c2.appspot.com/o/users%2FnoImage.jpg?alt=media&token=4b5b9019-33b3-466b-a872-2e40350d1a94&_gl=1*11gctv4*_ga*MTk3MzY5NDY2OS4xNjg5NjcxNzUw*_ga_CW55HF8NVT*MTY5NzAxMzMxNy4yMC4xLjE2OTcwMTM2OTUuNTUuMC4w"
                                                }
                                                alt="Customer Image"
                                            />
                                            <img src="/arrow.png" className={styles.arrrr} alt="Arrow" />
                                            <img src={item.gallery1full} alt="New Image" />
                                        </div>
                                        <div className={styles.customerDetails}>
                                            <span className={styles.name}>{item.twoRingsId}</span>
                                        </div>

                                        <div className={styles.duration}>
                                            <Button color="orange" onClick={() => adminApproveImage(item.twoRingsId, "1")} appearance="primary">
                                                {approveLoad1 === item.twoRingsId ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="20" visible={true} /> : "Approve"}
                                            </Button>
                                            <Button color="orange" onClick={() => adminRejectImage(item.twoRingsId, "1")} appearance="ghost">
                                                {rejectLoad1 === item.twoRingsId ? <RotatingLines strokeColor="orange" strokeWidth="5" animationDuration="0.75" width="20" visible={true} /> : "Reject"}
                                            </Button>
                                        </div>
                                    </div>                                    
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.approvalSection}>
                        <div className={styles.secContainer}>
                            {allUsers2.length==0?
                            <div className={styles.noApproval}>No Pending Approvals</div>
                            :allUsers2.map((item, index) => {
                                return (
                                    <div key={index} className={styles.singleCustomer}>
                                        <div className={styles.photoSection}>
                                            <img
                                                src={
                                                    item.oldGallery2Sqr ||
                                                    "https://firebasestorage.googleapis.com/v0/b/rcm-backend-c92c2.appspot.com/o/users%2FnoImage.jpg?alt=media&token=4b5b9019-33b3-466b-a872-2e40350d1a94&_gl=1*11gctv4*_ga*MTk3MzY5NDY2OS4xNjg5NjcxNzUw*_ga_CW55HF8NVT*MTY5NzAxMzMxNy4yMC4xLjE2OTcwMTM2OTUuNTUuMC4w"
                                                }
                                                alt="Customer Image"
                                            />
                                            <img src="/arrow.png" className={styles.arrrr} alt="Arrow" />
                                            <img src={item.gallery2full} alt="New Image" />
                                        </div>
                                        <div className={styles.customerDetails}>
                                            <span className={styles.name}>{item.twoRingsId}</span>
                                        </div>

                                        <div className={styles.duration}>
                                            <Button color="orange" onClick={() => adminApproveImage(item.twoRingsId, "2")} appearance="primary">
                                                {approveLoad2 === item.twoRingsId ? <RotatingLines strokeColor="blue" strokeWidth="5" animationDuration="0.75" width="20" visible={true} /> : "Approve"}
                                            </Button>
                                            <Button color="orange" onClick={() => adminRejectImage(item.twoRingsId, "2")} appearance="ghost">
                                                {rejectLoad2 === item.twoRingsId ? <RotatingLines strokeColor="blue" strokeWidth="5" animationDuration="0.75" width="20" visible={true} /> : "Reject"}
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.approvalSection}>
                        <div className={styles.secContainer}>
                            {allUsers3.length==0?
                            <div className={styles.noApproval}>No Pending Approvals</div>
                            :allUsers3.map((item, index) => {
                                return (
                                    <div key={index} className={styles.singleCustomer}>
                                        <div className={styles.photoSection}>
                                            <img
                                                src={
                                                    item.oldGallery3full ||
                                                    "https://firebasestorage.googleapis.com/v0/b/rcm-backend-c92c2.appspot.com/o/users%2FnoImage.jpg?alt=media&token=4b5b9019-33b3-466b-a872-2e40350d1a94&_gl=1*11gctv4*_ga*MTk3MzY5NDY2OS4xNjg5NjcxNzUw*_ga_CW55HF8NVT*MTY5NzAxMzMxNy4yMC4xLjE2OTcwMTM2OTUuNTUuMC4w"
                                                }
                                                alt="Customer Image"
                                            />
                                            <img src="/arrow.png" className={styles.arrrr} alt="Arrow" />
                                            <img src={item.gallery3full} alt="New Image" />
                                        </div>
                                        <div className={styles.customerDetails}>
                                            <span className={styles.name}>{item.twoRingsId}</span>
                                        </div>

                                        <div className={styles.duration}>
                                            <Button color="orange" onClick={() => adminApproveImage(item.twoRingsId, "3")} appearance="primary">
                                                {approveLoad3 === item.twoRingsId ? <RotatingLines strokeColor="blue" strokeWidth="5" animationDuration="0.75" width="20" visible={true} /> : "Approve"}
                                            </Button>
                                            <Button color="orange" onClick={() => adminRejectImage(item.twoRingsId, "3")} appearance="ghost">
                                                {rejectLoad3 === item.twoRingsId ? <RotatingLines strokeColor="blue" strokeWidth="5" animationDuration="0.75" width="20" visible={true} /> : "Reject"}
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApprovalList;
