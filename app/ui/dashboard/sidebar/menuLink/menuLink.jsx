"use client"
import React from 'react'
import styles from './menulink.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function MenuLink( {item} ) {
    const pathName = usePathname()
  return (
    <Link href={item.path} className={`${styles.container} ${item.path!=="/dashboard"? (pathName.startsWith(item.path) && styles.active): (pathName===item.path && styles.active)}`}>
        <span className={styles.icon}>{item.icon}</span>
        <span className={styles.text}>{item.title}</span>
    </Link>
  )
}

export default MenuLink