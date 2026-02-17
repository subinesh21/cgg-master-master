import React from 'react'
import styles from "../ui/dashboard/dashboard.module.css";
import { getSession } from '../lib/actions';
import ReceiptTableList from '../ui/dashboard/users/receiptTableList/receiptTableList';
async function Dashboard() {
  const session = await getSession()
    return (
      <div className={styles.innerContainer}>
          <div className={styles.top}>
                <h2 className="text-2xl font-bold m-0">All Receipts</h2>
                
            </div>
            <ReceiptTableList token={session.accessToken} baseUrl={process.env.BASE_URL} />
      </div>
    )
}

export default Dashboard