import { useState } from 'react'
import styles from './big.module.css'

import displayTimeSelection from '../../middlewares/displayTimeSelection'
import reverseGap from '../../middlewares/reverseGap'

export default function BigBookingCard({ booking, setViewing }) {
    const timeSelection = displayTimeSelection(booking.timeSelection)
    const courtAssignment = JSON.parse(booking.courtAssignment)

    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const date = new Date(booking.date * 1)
    const end = reverseGap(booking.timeSelection[booking.timeSelection.length - 1])
    const bookedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), end.endHour, end.endMinute)
    const today = new Date()
    return (
        <div className={styles.container} onClick={() => setViewing(booking._bookingId)}>
            <div className={styles.firstArea}>
                <div className={styles.box}>
                    <h2>S{courtAssignment[booking.timeSelection[0]]}</h2>
                </div>
                <div>
                    <h3>{booking.userName}</h3>
                    <p>{booking.userPhone}</p>
                </div>
            </div>
            <div className={styles.secondArea}>
                <p>{timeSelection}</p>
            </div>
            <div className={styles.secondArea}>
                <p>{date.getDate()}/{date.getMonth()}/{date.getFullYear()} - {daysOfWeek[date.getDay()]}</p>
            </div>
            <div className={styles.secondArea}>
                <p>{`${Number(booking.totalPrice).toLocaleString()} đ`}</p>
            </div>
            <div className={styles.secondArea}>
                <p>{`${Number(booking.totalPrice - booking.depositedAmount).toLocaleString()} đ`}</p>
            </div>
            <div className={styles.thirdArea}>
                <p>{today > bookedDate ? 'Đúng' : 'Sai'}</p>
            </div>
            <div className={styles.thirdArea}>
                <p>{booking.cancelled === true ? 'Đúng' : 'Sai'}</p>
            </div>
        </div>
    )
}
