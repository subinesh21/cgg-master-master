import React from "react";
import styles from "./sidebar.module.css";
import { MdAddToPhotos, MdDashboard, MdSaveAlt, MdChurch, MdSupervisorAccount, MdApproval, MdHowToReg } from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import { getSession } from "@/app/lib/actions";
// import { auth } from "@/app/auth";

const menuItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
    },
    {
        title: "Leads",
        path: "/dashboard/leads",
        icon: <MdSupervisorAccount />,
    },
    {
        title: "Confirmed",
        path: "/dashboard/confirmed",
        icon: <MdApproval />,
    },
    {
        title: "Closed",
        path: "/dashboard/closed",
        icon: <MdHowToReg />,
    },
    {
        title: "Add Lead",
        path: "/dashboard/add-lead",
        icon: <MdSaveAlt />,
    },
];

async function Sidebar() {
    // const {user} = await auth();
    const session = await getSession()

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <img src={session.image || "/profile.jpg"} alt="" width="120" height="120" />
                <div className={styles.userDetails}>
                    <span className={styles.userName}>{session.name}</span>
                    <span className={styles.userTitle}>{session.email}</span>
                </div>
            </div>
            <div className={styles.menu}>
                {menuItems.map((menuitem) => (
                    <MenuLink item={menuitem} key={menuitem.title} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
