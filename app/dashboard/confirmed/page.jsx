
import React, { Suspense } from "react";
import styles from "../../ui/dashboard/users/users.module.css";
import { getSession } from "@/app/lib/actions";
import ConfirmedList from "@/app/ui/dashboard/users/confirmedList/confirmedList";

async function Confirmed() {
    const session = await getSession()
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className="text-2xl font-bold m-0">All Confirmed</h2>
                
            </div>
            <ConfirmedList token={session.accessToken} baseUrl={process.env.BASE_URL} />
        </div>
    );
}

export default Confirmed;
