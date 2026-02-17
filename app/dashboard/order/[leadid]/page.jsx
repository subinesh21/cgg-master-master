import React from 'react'
import styles from "@/app/ui/dashboard/users/singleOrder/singleOrder.module.css";
import { getSession } from '@/app/lib/actions';
import SingleOrderDetails from '@/app/ui/dashboard/users/singleOrder/singleOrderDetails/singleOrderDetails';
async function UserOrder({ params }) {
  const session = await getSession()
  return (
    <div className={styles.container}>
        <div className={styles.top}>
            <h2 className="text-2xl font-bold	">Lead ID : {params.leadid}</h2>
        </div>
        <div>
          <SingleOrderDetails token={session.accessToken} baseUrl={process.env.BASE_URL} trid={params.leadid} />
        </div>
    </div>
);
}

export default UserOrder