import React from 'react'
import styles from "../../ui/dashboard/addAdmin/addAdmin.module.css";
import AddAdminForm from '@/app/ui/dashboard/addAdmin/addAdminForm/addAdminForm';
import { getSession } from '@/app/lib/actions';

async function AddAdmin() {
    const session = await getSession()
    return (
        <div className={styles.container}>
            <AddAdminForm token={session.accessToken} baseUrl={process.env.BASE_URL} />
        </div>
    );
}

export default AddAdmin;