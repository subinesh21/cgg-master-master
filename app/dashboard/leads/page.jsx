
import React, { Suspense } from "react";
import styles from "@/app/ui/dashboard/users/users.module.css";
import { getSession } from "@/app/lib/actions";
import LeadList from "@/app/ui/dashboard/users/leadList/leadList";

async function User() {
    const session = await getSession()
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className="text-2xl font-bold m-0">All Leads</h2>
                
            </div>
            <LeadList token={session.accessToken} baseUrl={process.env.BASE_URL} />
        </div>
    );
}

export default User;
