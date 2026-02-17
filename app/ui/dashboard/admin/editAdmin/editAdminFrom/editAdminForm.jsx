"use client";
import React, { useEffect, useState } from "react";
import styles from "./editAdminForm.module.css";
import { TextField } from "@mui/material";
import axios from "axios";
import { Button } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { useRouter } from "next/navigation";
import { RotatingLines } from "react-loader-spinner";

function EditAdminForm({ token, baseUrl, adminid }) {
    const router = useRouter();

    const [adminLoading, setAdminLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);

    const [currentUrl, setCurrentUrl] = useState("");

    const [churchName, setChurchName] = useState("");
    const [churchAddress, setChurchAddress] = useState("");
    const [churchPhone1, setChurchPhone1] = useState("");
    const [churchEmail, setChurchEmail] = useState("");

    const [fatherUrl, setFatherUrl] = useState("");

    const [fatherName, setFatherName] = useState("");
    const [fatherAddress, setFatherAddress] = useState("");
    const [fatherPhone1, setFatherPhone1] = useState("");
    const [fatherPhone2, setFatherPhone2] = useState("");
    const [fatherEmail, setFatherEmail] = useState("");

    const [inchargeUrl, setInchargeUrl] = useState("");

    const [inchargeName, setInchargeName] = useState("");
    const [inchargeAddress, setInchargeAddress] = useState("");
    const [inchargePhone1, setInchargePhone1] = useState("");
    const [inchargePhone2, setInchargePhone2] = useState("");
    const [inchargeEmail, setInchargeEmail] = useState("");
    const [inchargeAadharNum, setInchargeAadharNum] = useState("");
    const [inchargeAadharImg, setInchargeAadharImg] = useState("");

    const [printUrl, setPrintUrl] = useState("");

    const [printTitle, setPrintTitle] = useState("");
    const [printTitleSize, setPrintTitleSize] = useState(0);
    const [printSubTitle, setPrintSubTitle] = useState("");
    const [printSubTitleSize, setPrintSubTitleSize] = useState(0);

    const [adminPass, setAdminPass] = useState("");

    useEffect(() => {
        setAdminLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        axios.get(`${baseUrl}masterusers/getIndAdminOnly/${adminid}`, config).then((result) => {
            if (result.data.success) {
                setCurrentUrl(result.data.data.agntDP);

                setChurchName(result.data.data.agntName);
                setChurchAddress(result.data.data.agntAddress);
                setChurchPhone1(result.data.data.agntPhone);
                setChurchEmail(result.data.data.agntEmail);

                setFatherUrl(result.data.data.agntContactDP);

                setFatherName(result.data.data.agntContactName);
                setFatherAddress(result.data.data.agntContactDes);
                setFatherPhone1(result.data.data.agntContactMobile);
                setFatherPhone2(result.data.data.agntContactAlterMobile);
                setFatherEmail(result.data.data.agntContactEmail);

                setInchargeUrl(result.data.data.agntInchargeDP);

                setInchargeName(result.data.data.agntInchargeName);
                setInchargeAddress(result.data.data.agntInchargeAddress);
                setInchargePhone1(result.data.data.agntInchargeMobile);
                setInchargePhone2(result.data.data.agntInchargeAlterMobile);
                setInchargeEmail(result.data.data.agntInchargeEmail);
                setInchargeAadharNum(result.data.data.agntInchargeAadharNumber);
                setInchargeAadharImg(result.data.data.agntInchargeAadharImage);

                setPrintUrl(result.data.data.agntprintDp);

                setPrintTitle(result.data.data.agntprintTitle);
                setPrintTitleSize(result.data.data.agntprintTitleSize);
                setPrintSubTitle(result.data.data.agntprintAddress);
                setPrintSubTitleSize(result.data.data.agntprintAddressSize);

                setAdminLoading(false);
            } else {
                console.log(result.data.message);
            }
        });
    }, []);

    const handleSave = () => {
        setSaveLoading(true);
        const config = {
            headers: { Authorization: "Bearer " + token },
        };
        const bodytxt = {
            loginId: adminid,
            agntDP: currentUrl,
            agntName: churchName,
            agntAddress: churchAddress,
            agntPhone: churchPhone1,
            agntEmail: churchEmail,
            agntContactDP: fatherUrl,
            agntContactName: fatherName,
            agntContactDes: fatherAddress,
            agntContactMobile: fatherPhone1,
            agntContactAlterMobile: fatherPhone2,
            agntContactEmail: fatherEmail,
            agntInchargeDP: inchargeUrl,
            agntInchargeName: inchargeName,
            agntInchargeAddress: inchargeAddress,
            agntInchargeMobile: inchargePhone1,
            agntInchargeAlterMobile: inchargePhone2,
            agntInchargeEmail: inchargeEmail,
            agntInchargeAadharNumber: inchargeAadharNum,
            agntInchargeAadharImage: inchargeAadharImg,
            agntprintDp: printUrl,
            agntprintTitle: printTitle,
            agntprintTitleSize: printTitleSize,
            agntprintAddress: printSubTitle,
            agntprintAddressSize: printSubTitleSize,
        };
        axios
            .post(`${baseUrl}masterusers/updateAdminByMaster`, bodytxt, config)
            .then((resultt) => {
                if (resultt.data.success) {
                    router.push(`/dashboard/admin/${adminid}`)
                }
                else{
                    console.log(resultt.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.churchDetails}>
                <div className={styles.top}>
                    <div className={styles.title1}>Church Details</div>
                    <Button color="orange" appearance="ghost" onClick={() => router.push(`/dashboard/admin/${adminid}`)}>GO BACK</Button>
                </div>
                <div className={styles.details}>
                    <TextField value={currentUrl} helperText="Upload the Image into Hosting and enter the URL (Image Size:500 x 500)" onChange={(e) => setCurrentUrl(e.target.value)} fullWidth variant="filled" type="text" label="Update Church App Icon" name="currentUrl" sx={{ gridColumn: "span 4" }} />

                    <TextField value={churchName} onChange={(e) => setChurchName(e.target.value)} fullWidth variant="filled" type="text" label="Church Name" name="churchName" sx={{ gridColumn: "span 2" }} />
                    <TextField value={churchAddress} onChange={(e) => setChurchAddress(e.target.value)} fullWidth variant="filled" type="text" label="Church Address" name="churchAddress" sx={{ gridColumn: "span 2" }} />
                    <TextField value={churchPhone1} onChange={(e) => setChurchPhone1(e.target.value)} fullWidth variant="filled" type="text" label="Church Phone Number" name="churchPhone1" sx={{ gridColumn: "span 2" }} />
                    <TextField value={churchEmail} onChange={(e) => setChurchEmail(e.target.value)} fullWidth variant="filled" type="email" label="Church Email Address" name="churchEmail" sx={{ gridColumn: "span 2" }} />
                </div>
                <div className={styles.title}>Father Details</div>
                <div className={styles.details}>
                    <TextField value={fatherUrl} helperText="Upload the Image into Hosting and enter the URL (Image Size:500 x 500)" onChange={(e) => setFatherUrl(e.target.value)} fullWidth variant="filled" type="text" label="Update Father Image" name="fatherUrl" sx={{ gridColumn: "span 4" }} />

                    <TextField value={fatherName} onChange={(e) => setFatherName(e.target.value)} fullWidth variant="filled" type="text" label="Father Name" name="fatherName" sx={{ gridColumn: "span 2" }} />
                    <TextField value={fatherAddress} onChange={(e) => setFatherAddress(e.target.value)} fullWidth variant="filled" type="text" label="Father Address" name="fatherAddress" sx={{ gridColumn: "span 2" }} />
                    <TextField value={fatherPhone1} onChange={(e) => setFatherPhone1(e.target.value)} fullWidth variant="filled" type="tel" label="Father Primary Phone Number" name="fatherPhone1" sx={{ gridColumn: "span 2" }} />
                    <TextField value={fatherPhone2} onChange={(e) => setFatherPhone2(e.target.value)} fullWidth variant="filled" type="tel" label="Father Alternate Phone Number" name="fatherPhone2" sx={{ gridColumn: "span 2" }} />
                    <TextField value={fatherEmail} onChange={(e) => setFatherEmail(e.target.value)} fullWidth variant="filled" type="email" label="Father Email Address" name="fatherEmail" sx={{ gridColumn: "span 2" }} />
                </div>
                <div className={styles.title}>In-charge Details</div>
                <div className={styles.details}>
                    <TextField value={inchargeUrl} helperText="Upload the Image into Hosting and enter the URL (Image Size:500 x 500)" onChange={(e) => setInchargeUrl(e.target.value)} fullWidth variant="filled" type="text" label="Update Incharge Image" name="inchargeUrl" sx={{ gridColumn: "span 4" }} />

                    <TextField value={inchargeName} onChange={(e) => setInchargeName(e.target.value)} fullWidth variant="filled" type="text" label="Incharge Name" name="inchargeName" sx={{ gridColumn: "span 2" }} />
                    <TextField value={inchargeAddress} onChange={(e) => setInchargeAddress(e.target.value)} fullWidth variant="filled" type="text" label="Incharge Address" name="inchargeAddress" sx={{ gridColumn: "span 2" }} />
                    <TextField value={inchargePhone1} onChange={(e) => setInchargePhone1(e.target.value)} fullWidth variant="filled" type="tel" label="Incharge Primary Phone Number" name="inchargePhone1" sx={{ gridColumn: "span 2" }} />
                    <TextField value={inchargePhone2} onChange={(e) => setInchargePhone2(e.target.value)} fullWidth variant="filled" type="tel" label="Incharge Alternate Phone Number" name="inchargePhone2" sx={{ gridColumn: "span 2" }} />
                    <TextField value={inchargeEmail} onChange={(e) => setInchargeEmail(e.target.value)} fullWidth variant="filled" type="email" label="Incharge Email Address" name="inchargeEmail" sx={{ gridColumn: "span 2" }} />
                    <TextField value={inchargeAadharNum} onChange={(e) => setInchargeAadharNum(e.target.value)} fullWidth variant="filled" type="text" label="Incharge Aadhar Number" name="inchargeAadharNum" sx={{ gridColumn: "span 2" }} />
                    <TextField value={inchargeAadharImg} onChange={(e) => setInchargeAadharImg(e.target.value)} fullWidth variant="filled" type="text" label="Incharge Aadhar Image URL" name="inchargeAadharImg" sx={{ gridColumn: "span 2" }} />
                </div>
                <div className={styles.title}>Print Settings</div>
                <div className={styles.details}>
                    <TextField value={printUrl} helperText="Upload the Image into Hosting and enter the URL (Image Size:300 x 344)" onChange={(e) => setPrintUrl(e.target.value)} fullWidth variant="filled" type="text" label="Update Print App Icon" name="printUrl" sx={{ gridColumn: "span 4" }} />

                    <TextField value={printTitle} onChange={(e) => setPrintTitle(e.target.value)} fullWidth variant="filled" type="text" label="Print Form Title" name="printTitle" sx={{ gridColumn: "span 2" }} />
                    <TextField value={printTitleSize} onChange={(e) => setPrintTitleSize(parseInt(e.target.value))} fullWidth variant="filled" type="number" label="Print Title Size" name="printTitleSize" sx={{ gridColumn: "span 2" }} />
                    <TextField value={printSubTitle} onChange={(e) => setPrintSubTitle(e.target.value)} fullWidth variant="filled" type="text" label="Print Form Subtitle" name="printSubTitle" sx={{ gridColumn: "span 2" }} />
                    <TextField value={printSubTitleSize} onChange={(e) => setPrintSubTitleSize(parseInt(e.target.value))} fullWidth variant="filled" type="number" label="Print Subtitle Size" name="printSubTitleSize" sx={{ gridColumn: "span 2" }} />
                </div>
                <div className={styles.button}>
                    <Button color="orange" onClick={() => handleSave()} appearance="primary">
                        {saveLoading? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="22"/>: "SAVE CHANGES"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EditAdminForm;
