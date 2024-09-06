import styles from './singleBooking.module.css'
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';

import { useNavigate } from "react-router-dom";

import { useState, useRef, useEffect } from 'react';
import { availability } from '../../fixtures/fixtures';
import { reverseGap, seperateArrays } from '../../middlewares/middlewares';
import { spacing, colors } from '../../constants/constants'

import Navbar from '../../components/Navbar/Navbar'
import displayTimeSelection from '../../middlewares/displayTimeSelection';

import client from '../../context/client.context';
import { gql } from '@apollo/client';
import { _ownerId } from '../../context/id.context';

registerLocale('vi', vi)

const CREATE_BOOKING = gql`
    mutation CreateBooking($body: InputBooking!) {
        createBooking(body: $body)
    }
`

const OWNER_GET_SINGLE_COURT = gql`
    query Owner_singleCourt($ownerId: String!) {
        owner_singleCourt(_ownerId: $ownerId) {
            _id
            _ownerId
            _courtId
            courtName
            categories
            address
            description
            utility
            location {
            latitude
            longitude
            }
            pricePerHour
            variableCost
            workingHours {
            start
            end
            }
            depositPercentage
            maxSCourt
            rating {
            totalRating
            sumRating
            }
            image
            inactive
        }
    }
`

export default function SingleBooking() {

    const navigate = useNavigate()
    const [courtData, setCourtData] = useState({
        owner_singleCourt: {
            _courtId: "",
            pricePerHour: 0,
        }
    })

    const [date, setDate] = useState(new Date())
    const [selectedButtons, setSelectedButtons] = useState([]);
    const [availabilityArray, setAvailabilityArray] = useState(seperateArrays(availability.data.availabilityCourtDaily[0].availability))

    const [inputs, setInputs] = useState({
        name: '',
        phoneNumber: '',
        fullPayment: true,
    })

    const handleButtonClick = (buttonIndex) => {
        const newArray = Array.from(selectedButtons)
        newArray.sort(function (a, b) { return a - b });

        const index = newArray.indexOf(buttonIndex);

        if (index !== -1) {
            if (newArray.includes(buttonIndex - 1) && newArray.includes(buttonIndex + 1)) {
                alert('Yoo please choose 2 consecutive time gaps and dont break the chain')
            } else {
                setSelectedButtons([
                    ...newArray.slice(0, index),
                    ...newArray.slice(index + 1),
                ]);
            }
        } else {
            if (
                newArray.length === 0 ||
                newArray.includes(buttonIndex - 1) ||
                newArray.includes(buttonIndex + 1)
            ) {
                setSelectedButtons([...newArray, buttonIndex]);
            } else {
                alert('Yoo please choose 2 consecutive time gaps and dont break the chain')
            }
        }
    };

    function queryDate() {
        // setAvailabilityArray(seperateArrays(availability.data.availabilityCourtDaily[1].availability))
    }

    const time = selectedButtons.length > 0 ? displayTimeSelection(selectedButtons) : "chưa chọn"

    const totalPrice = selectedButtons.length * (courtData.pricePerHour / 2)
    const price = inputs.fullPayment === true ?
        selectedButtons.length * (courtData.pricePerHour / 2)
        : selectedButtons.length * (courtData.pricePerHour / 2) * (courtData.depositPercentage / 100);


    async function handleClick() {
        if (inputs.name !== '' && inputs.phoneNumber !== '' && selectedButtons.length > 1) {
            try {
                const { data } = await client.mutate({
                    mutation: CREATE_BOOKING,
                    variables: {
                        body: {
                            _bookerId: _ownerId,
                            _courtId: courtData._courtId,
                            userName: inputs.name,
                            userPhone: inputs.phoneNumber,

                            timeSelection: selectedButtons,
                            date: String(new Date(date.getFullYear(), date.getMonth(), date.getDate(), reverseGap(selectedButtons[0]).startHour, reverseGap(selectedButtons[0]).startMinute)),

                            totalPrice: totalPrice,
                            depositedAmount: price,
                            paymentMethod: "đặt cọc qua chủ sân"
                        }
                    }
                })

                if (data.createBooking.length > 0) {
                    navigate('/')
                    window.location.reload()
                }

            } catch (err) {
                console.log(JSON.stringify(err, null, 2))
                throw new Error('Error', err.message)
            }
        }
    }

    async function owner_singleCourt() {
        try {
            const { data } = await client.query({
                query: OWNER_GET_SINGLE_COURT,
                variables: {
                    ownerId: _ownerId
                }
            })
            setCourtData(data.owner_singleCourt)
        } catch (err) {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        }
    }

    useEffect(() => {
        owner_singleCourt()
    }, [])


    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.navHolder}></div>


            <div className={styles.content}>
                <div className={styles.left}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <DatePicker
                            selected={date}
                            onChange={date => {
                                setDate(date)
                            }}
                            locale="vi"
                            className={styles.datePicker}
                        />
                        <button onClick={queryDate} className={styles.check}>Kiểm tra</button>
                    </div>
                    <br />
                    <br />
                    <div className={styles.availabilityCalendar}>
                        {availabilityArray.map((array, index) => {
                            if (array.length > 1) {
                                const firstItem = reverseGap(array[0])
                                const lastItem = reverseGap(array[array.length - 1])
                                const firstItemStart = `${firstItem.startHour}:${String(firstItem.startMinute).padStart(2, "0")}`
                                const lastItemEnd = `${lastItem.endHour}:${String(lastItem.endMinute).padStart(2, "0")}`
                                return (
                                    <div key={index}>
                                        <div style={{ marginHorizontal: spacing.margin }}>
                                            <div className={styles.line}></div>
                                            <br />
                                            {array.length > 1 ?
                                                <p className={styles.startEnd}>{firstItemStart} - {lastItemEnd}</p>
                                                : null
                                            }
                                        </div>
                                        <div className={styles.gridContainer}>
                                            {array.map((item, index) => {
                                                const avail = reverseGap(item)
                                                const start = `${avail.startHour}:${String(avail.startMinute).padStart(2, "0")}`
                                                const end = `${avail.endHour}:${String(avail.endMinute).padStart(2, "0")}`
                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleButtonClick(item)}
                                                        className={selectedButtons.includes(item) ? styles.gridItem : styles.gridItemNot}>
                                                        {start} - {end}
                                                    </button>
                                                )
                                            }
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                            return <div key={index}></div>
                        }
                        )}
                    </div>
                </div>
                <form className={styles.priceBottom}>
                    <h3>Tổng: {`${Number(totalPrice).toLocaleString()} đ`}</h3>
                    <p>Khung giờ: {time}</p>

                    <div className={styles.line}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <p>Họ và tên</p>
                        <input
                            type="text"
                            required={true}
                            className={styles.textInput}
                            value={inputs.name}
                            onChange={e => setInputs(prev => ({
                                ...prev,
                                name: e.target.value,
                            })
                            )}
                        />
                    </div>

                    <div className={styles.line}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <p>Số điện thoại</p>
                        <input
                            className={styles.textInput}
                            value={inputs.phoneNumber}
                            type="text"
                            required={true}
                            onChange={e => {
                                const numericInput = e.target.value.replace(/[^0-9]/g, '');
                                setInputs(prev => ({
                                    ...prev,
                                    phoneNumber: numericInput,
                                })
                                )
                            }}
                        />
                    </div>

                    <div className={styles.line}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <label>
                            Trả toàn bộ
                            <input
                                type="radio"
                                className={styles.radio}
                                checked={inputs.fullPayment}
                                onChange={() => setInputs(prev => ({
                                    ...prev,
                                    fullPayment: true
                                }))}
                            />
                        </label>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <label>
                            Đặt cọc
                            <input
                                type="radio"
                                className={styles.radio}
                                checked={!inputs.fullPayment}
                                onChange={() => setInputs(prev => ({
                                    ...prev,
                                    fullPayment: false
                                }))}
                            />
                        </label>
                    </div>

                    <div className={styles.line}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <p>Khách đã trả: {`${Number(price).toLocaleString()} đ`}</p>
                        <p>Khách cần trả khi đến sân: {`${Number(totalPrice - price).toLocaleString()} đ`}</p>
                    </div>


                    <div className={styles.line}></div>

                    <button className={styles.goPayment} onClick={e => {
                        e.preventDefault()
                        handleClick()
                    }}>Xác nhận</button>
                </form>
            </div>
        </div>
    )
}
