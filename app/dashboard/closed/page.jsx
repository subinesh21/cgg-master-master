
import React, { Suspense } from "react";
import styles from "../../ui/dashboard/users/users.module.css";
import { getSession } from "@/app/lib/actions";
import UserTableListClosed from "@/app/ui/dashboard/users/userTableListClosed/userTableListClosed";

async function Closed() {
    const session = await getSession()
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className="text-2xl font-bold m-0">All Closed</h2>
                
            </div>
            <UserTableListClosed token={session.accessToken} baseUrl={process.env.BASE_URL} />
        </div>
    );
}

export default Closed;
