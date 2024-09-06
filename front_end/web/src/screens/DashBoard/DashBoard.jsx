import styles from './dashboard.module.css'
import Navbar from '../../components/Navbar/Navbar'
import BookingCard from '../../components/BookingCard/BookingCard'
import PendingCard from '../../components/Pending/PendingCard'

import { Link } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react'
import { gql } from '@apollo/client';

import Modal from 'react-modal';

import client from '../../context/client.context'
import { _courtId } from '../../context/id.context'

import BookingDetail from '../../components/BookingDetail/BookingDetail'


const GET_PENDINGS = gql`
    query GetPendings($courtId: String!) {
        getPendings(_courtId: $courtId) {
            _bookingId
            userName
            userPhone
            amountDue
            courtAssignment
        }
    }
`

const GET_COMING_BOOKINGS_TODAY = gql`
    query GetComingBookingsToday($courtId: String!, $params: InputLimitParams!) {
        getComingBookingsToday(_courtId: $courtId, params: $params) {
            _id
            _bookingId
            _bookerId
            userName
            userPhone
            timeSelection
            date
            courtAssignment
            totalPrice
            depositedAmount
            owe
            paymentMethod
            cancelled
            checkIn
            transactionStatus
        }
    }
`

const SET_TRANSACTION_STATUS = gql`
    mutation SetTransactionStatus($bookingId: String!) {
        setTransactionStatus(_bookingId: $bookingId)
    }
`

const GET_STATISTICS = gql`
    query GetStatistics($courtId: String!, $queryType: String!, $date: String!) {
        getStatistics(_courtId: $courtId, queryType: $queryType, date: $date) {
            bookings
            revenue
            owe
        }
    }
`

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 15,
        width: '40%'
    },
};

export default function DashBoard() {
    const [viewing, setViewing] = useState(false)

    const [bookings, setBookings] = useState([])
    const [pendingsData, setPendingData] = useState([])

    const [params, setParams] = useState({
        start: 0,
        end: 10
    })

    const [stats, setStats] = useState({
        totalBookingsToday: 0,
        todaysRevenue: 0,
        owe: 0
    })

    const notify = async () => {
        toast("Nam Nguyên đã đặt sân của bạn!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "light",
        });
    }

    async function handleClick(item) {
        try {
            const { data } = await client.mutate({
                mutation: SET_TRANSACTION_STATUS,
                variables: {
                    bookingId: item._bookingId
                }
            })

            if (data.setTransactionStatus === 'success') {
                setPendingData(prevState => prevState.filter(obj => obj._bookingId !== item._bookingId))
            }
        } catch (err) {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        }
    }

    async function getPendings() {
        try {
            const { data } = await client.query({
                query: GET_PENDINGS,
                variables: {
                    courtId: _courtId
                }
            })
            setPendingData(data.getPendings)
        } catch (err) {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        }
    }

    async function getComingBookingsToday() {
        try {
            const { data } = await client.query({
                query: GET_COMING_BOOKINGS_TODAY,
                variables: {
                    courtId: _courtId,
                    params: params
                }
            })
            setBookings(data.getComingBookingsToday)
        } catch (err) {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        }
    }

    async function getStatistics() {
        try {
            const { data } = await client.query({
                query: GET_STATISTICS,
                variables: {
                    courtId: _courtId,
                    queryType: "day",
                    date: String(new Date())
                }
            })

            setStats({
                totalBookingsToday: data.getStatistics.bookings,
                todaysRevenue: data.getStatistics.revenue,
                owe: data.getStatistics.owe
            })
        } catch (err) {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        }
    }

    useEffect(() => {
        getPendings()
        getStatistics()
    }, [])
    
    useEffect(() => {
        getComingBookingsToday()
    }, [params])




    return (
        <div className={styles.container}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <Modal
                isOpen={viewing !== false}
                style={customStyles}
                onRequestClose={() => setViewing(false)}
            >
                {viewing !== false ?
                    <BookingDetail booking={bookings.find(item => item._bookingId === viewing)} setViewing={setViewing} /> : null
                }
            </Modal>

            <div className={styles.navHolder}></div>
            <Navbar />
            <div className={styles.content}>
                <h1 className={styles.hi}>Xin chào Quân!</h1>
                <br />
                <div className={styles.quickPeak} onClick={notify}>
                    <Link to="single_booking" className={styles.createBooking}>
                        Tạo đơn
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                        </svg>
                    </Link>
                    <Link className={styles.quickStats}>
                        <h2>{stats.totalBookingsToday}</h2>
                        <p>Đơn đặt mới hôm nay</p>
                    </Link>
                    <Link className={styles.quickStats}>
                        <h2>{`${Number(stats.todaysRevenue).toLocaleString()} đ`}</h2>
                        <p>Doanh thu hôm nay</p>
                    </Link>
                    <Link className={styles.quickStats}>
                        <h2>{`${Number(stats.owe).toLocaleString()} đ`}</h2>
                        <p>Khoản cần thu</p>
                    </Link>
                </div>
                <div className={styles.bookingsContainer}>
                    <div className={styles.todayBookings}>
                        <h2>Đơn sẽ diễn ra hôm nay</h2>
                        <div className={styles.infoContainer}>
                            <p>Thông tin</p>
                            <p>Giờ đánh</p>
                            <p>Sân sẽ đánh</p>
                            <p>Cần trả</p>
                        </div>
                        <div className={styles.bookings}>
                            {bookings.map((booking, index) => <BookingCard setViewing={setViewing} key={index} booking={booking} />)}
                        </div>
                    </div>
                    <div className={styles.playing}>
                        <h2>Đơn đang đánh</h2>
                        <div className={styles.infoContainer2}>
                            <p>Thông tin</p>
                            <p>Cần trả</p>
                            <p>Xác nhận</p>
                        </div>
                        {pendingsData.map((item, index) => <PendingCard key={index} item={item} handleClick={handleClick} />)}

                    </div>
                </div>
            </div>
        </div>
    )
}
