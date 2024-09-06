import { useState, useEffect } from 'react'
import styles from './booking.module.css'

import { gql } from '@apollo/client'
import client from '../../context/client.context'
import { _courtId } from '../../context/id.context'

import Modal from 'react-modal';

import Navbar from '../../components/Navbar/Navbar'
import BigBookingCard from '../../components/BookingCard/BigBookingCard'
import BookingDetail from '../../components/BookingDetail/BookingDetail'

const GET_COURT_BOOKINGS_TODAY = gql`
    query GetCourtBookings($courtId: String!, $params: InputLimitParams!) {
        getCourtBookings(_courtId: $courtId, params: $params) {
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
            promotions
            cancelled
            checkIn
            transactionStatus
        }
    }
`

const SEARCH_COURT_BOOKINGS = gql`
    query SearchCourtBookings($searchInput: String!) {
        searchCourtBookings(searchInput: $searchInput) {
            _bookingId
            _bookerId
            _id
            userName
            userPhone
            timeSelection
            date
            courtAssignment
            totalPrice
            depositedAmount
            paymentMethod
            promotions
            cancelled
            checkIn
            transactionStatus
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

function Booking() {
    const [viewing, setViewing] = useState(false)
    const [bookings, setBookings] = useState([])
    const [params, setParams] = useState({
        start: 0,
        end: 10
    })
    const [searchTerm, setSearchTerm] = useState('')

    async function getCourtBookings() {
        try {
            const { data } = await client.query({
                query: GET_COURT_BOOKINGS_TODAY,
                variables: {
                    courtId: _courtId,
                    params: params
                }
            })
            setBookings(data.getCourtBookings)
        } catch (err) {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        }
    }

    useEffect(() => {
        getCourtBookings()
    }, [params])

    async function searchCourtBookings() {
        if (searchTerm.length > 0) {
            try {
                const { data } = await client.mutate({
                    mutation: SEARCH_COURT_BOOKINGS,
                    variables: {
                        searchInput: searchTerm
                    }
                })

                setBookings(data.searchCourtBookings)

            } catch (err) {
                console.log(JSON.stringify(err, null, 2))
                throw new Error('Error', err.message)
            }
        }
    }

    return (
        <div className={styles.container}>
            <Modal
                isOpen={viewing !== false}
                style={customStyles}
                onRequestClose={() => setViewing(false)}
            >
                {viewing !== false ?
                    <BookingDetail page="booking" booking={bookings.find(item => item._bookingId === viewing)} setViewing={setViewing} /> : null
                }
            </Modal>

            <Navbar />
            <div className={styles.navHolder}></div>
            <div className={styles.content}>
                <div className={styles.todayBookings}>
                    <h2>Tất cả đơn đặt</h2>
                    <div className={styles.filterBar}>
                        <input
                            type="text"
                            placeholder='Tìm kiếm tên và số điện thoại'
                            className={styles.search}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    searchCourtBookings()
                                }
                            }}
                        />
                        <button onClick={() => {
                            searchTerm === '' ? window.location.reload() : searchCourtBookings()
                        }} className={styles.searchButton}>{searchTerm === '' ? 'Tải lại' : 'Tìm'}</button>
                    </div>
                    <div className={styles.infoContainer}>
                        <p>Thông tin</p>
                        <p>Giờ đánh</p>
                        <p>Ngày</p>
                        <p>Tổng giá tiền</p>
                        <p>Cần trả</p>
                        <p>Đã qua</p>
                        <p>Đã hủy</p>
                    </div>
                    <div className={styles.bookings}>
                        {bookings.map((booking, index) => <BigBookingCard setViewing={setViewing} key={index} booking={booking} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Booking

// Pending
// 