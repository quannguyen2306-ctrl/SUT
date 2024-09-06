import styles from './styles.module.css'
import { bookingData } from "../../fixtures/fixtures"
import { Link } from 'react-router-dom'

import BookingCard from '../BookingCard/BookingCard'

export default function TodayBooking({ full }) {
    return (
        <div className={styles.container}>
            <h4>Đơn đặt diễn ra hôm nay</h4>
            <br />
            <div className={styles.list}>
                {bookingData.getBookings.map((booking, index) => (
                    <BookingCard key={index} booking={booking} />
                ))}
            </div>
            {
                full !== true ?
                    <Link to={'/booking'}>Xem tất cả</Link> : null
            }
        </div>
    )
}
