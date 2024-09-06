import { useState } from 'react'
import styles from './styles.module.css'

import displayTimeSelection from '../../middlewares/displayTimeSelection'

export default function BookingCard({ booking, setViewing }) {
    const timeSelection = displayTimeSelection(booking.timeSelection)
    const courtAssignment = JSON.parse(booking.courtAssignment)
    const uniqueCourtNumbers = [...new Set(Object.values(courtAssignment))];

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
            <div className={styles.thirdArea}>
                {uniqueCourtNumbers.map((item, index) => {
                    if (index === uniqueCourtNumbers.length - 1) {
                        return (
                            <p key={index}>S{item}</p>
                        )
                    } else {
                        return (
                            <p key={index}>S{item},</p>
                        )
                    }
                })}
            </div>
            <div className={styles.fourthArea}>
                <p>{`${Number(booking.totalPrice - booking.depositedAmount).toLocaleString()} đ`}</p>
            </div>
        </div>
    )
}
