import { useMemo, useState } from 'react';

import { _ownerId } from '../../context/id.context';

import styles from './BookingDetail.module.css'

import client from '../../context/client.context';
import { gql } from '@apollo/client';

import reverseGap from '../../middlewares/reverseGap';
import displayTimeSelection from '../../middlewares/displayTimeSelection'
import splitObjectByValue from '../../middlewares/splitObjectByValue'

const GET_STATUS_CHECK_IN = gql`
    query Query($bookingId: String!) {
        getStatusCheckin(_bookingId: $bookingId)
    }
`
const CANCEL_BOOKING = gql`
    mutation CancelBooking($bookingId: String!) {
        cancelBooking(_bookingId: $bookingId)
    }
`

export default function BookingDetail({ page, booking, setViewing }) {
    const timeSelection = displayTimeSelection(booking.timeSelection)
    const courtAssignment = JSON.parse(booking.courtAssignment)

    const splittedCourtAssignment = splitObjectByValue(courtAssignment)

    console.log('splittedCourtAssignment', splittedCourtAssignment)

    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const date = new Date(booking.date * 1)
    const end = reverseGap(booking.timeSelection[booking.timeSelection.length - 1])
    const bookedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), end.endHour, end.endMinute)
    const today = new Date()

    const [checkInStatus, setCheckInStatus] = useState(null)

    async function checkIn() {
        try {
            const { data } = await client.query({
                query: GET_STATUS_CHECK_IN,
                variables: {
                    bookingId: booking._bookingId
                }
            })

            if (data.getStatusCheckin === true) {
                setViewing(false)
                window.location.reload()
            } else {
                setCheckInStatus('Check in chưa thành công, vui lòng thử lại sau giờ đã đặt')
            }

        } catch (err) {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        }
    }

    async function cancel() {
        if (window.confirm("Bạn chắc chứ?")) {
            try {
                const { data } = await client.mutate({
                    mutation: CANCEL_BOOKING,
                    variables: {
                        bookingId: booking._bookingId
                    }
                })

                if (data.cancelBooking === "Booking cancelled") {
                    setViewing(false)
                    window.location.reload()
                } else {
                    console.log('cannot cancel')
                }

            } catch (err) {
                console.log(JSON.stringify(err, null, 2))
                throw new Error('Error', err.message)
            }
        };
    }

    return (
        <div className={styles.container}>
            <h3>{booking.userName} - {booking.userPhone}</h3>
            <p><span>Giờ đánh:</span> {timeSelection}</p>
            <p><span>Ngày đánh:</span> {date.getDate()}/{date.getMonth()}/{date.getFullYear()} - {daysOfWeek[date.getDay()]}</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
                <p><span>Sân:</span> </p>
                {splittedCourtAssignment.map((item, index) => {
                    const selection = displayTimeSelection(item.timeSelection);
                    return (
                        <p key={index}>S{item.courtNumber} -{'>'} {selection}</p>
                    )
                })}
            </div>
            <p><span>Tổng giá tiền:</span> {` ${Number(booking.totalPrice).toLocaleString()} đ`}</p>
            <p><span>Cần trả:</span> {` ${Number(booking.totalPrice - booking.depositedAmount).toLocaleString()} đ`}</p>
            <p><span>Phương thức thanh toán:</span> {booking.paymentMethod}</p>
            {page === 'booking' ?
                <>
                    <p><span>Đã qua:</span> {today > bookedDate ? 'đúng' : 'sai'}</p>
                    <p><span>Đã hủy:</span> {booking.cancelled === true ? 'đúng' : 'sai'}</p>
                </>
                :
                <></>
            }
            {page === 'booking' ?
                <button onClick={cancel}>Khách không đến</button>
                :
                <>
                    <p>{checkInStatus !== null ? checkInStatus : null}</p>
                    <div style={{ display: 'flex', gap: 15 }}>
                        <button onClick={checkIn}>Check in</button>
                        <button onClick={cancel}>Khách không đến</button>
                    </div>
                </>
            }
        </div>
    )
}
