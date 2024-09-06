import styles from './styles.module.css'

import { statistics } from '../../fixtures/fixtures'
import { Link } from 'react-router-dom'
// revenue, total booking orders, costs

export default function Statistics() {
    const stat = statistics.data.getStatistics
    return (
        <>
            <div className={styles.boxContainer}>
                <div className={styles.box}>
                    <h1>{stat.bookings}</h1>
                    <h4>So luong don dat san</h4>
                    <select>
                        <option value="ngay">Ngay</option>
                        <option value="ngay">Thang</option>
                        <option value="ngay">Nam</option>
                    </select>
                </div>
                <div className={styles.box}>
                    <h1>{`${Number(stat.revenue).toLocaleString()} đ`}</h1>
                    <h4>Doanh thu</h4>
                    <select>
                        <option value="ngay">Ngay</option>
                        <option value="ngay">Thang</option>
                        <option value="ngay">Nam</option>
                    </select>
                </div>
                <div className={styles.box} style={{height: 100}}>
                    <h1>{`${Number(stat.owe).toLocaleString()} đ`}</h1>
                    <h4>Tiền chưa thu về</h4>
                </div>
            </div>

            <div className={styles.boxContainer}>
                <Link to="/single_booking" className={styles.createBookingButton}>Create a booking order</Link>
                <Link to="/single_booking" className={styles.createBookingButton}>Request payment</Link>
            </div>
        </>
    )
}
