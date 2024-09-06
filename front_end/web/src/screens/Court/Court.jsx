import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Court.module.css";
// import Badminton from "../../assets/badminton.png";
// import Basketball from "../../assets/basketball.png";
// import Volleyball from "../../assets/volleyball.png";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';

import { gql } from "@apollo/client";
import client from "../../context/client.context";
import { _ownerId } from '../../context/id.context'

const GET_MY_COURT = gql`
    query Owner_singleCourt($ownerId: String!) {
        owner_singleCourt(_ownerId: $ownerId) {
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
            image
        }
    }
`

const UPDATE_MY_COURT = gql`
    mutation Owner_updateCourt($ownerId: String!, $body: InputCourt!) {
        owner_updateCourt(_ownerId: $ownerId, body: $body)
    }
`

function Court() {
    const [inputs, setInputs] = useState({
        "courtName": "",
        "categories": ["Cầu lông"],
        "address": "",
        "description": "",
        "utility": [],
        location: {
            latitude: '',
            longitude: ''
        },
        "pricePerHour": 0,
        variableCost: 0,
        "workingHours": {
            "start": "",
            "end": ""
        },
        "depositPercentage": 0,
        "maxSCourt": 1,
        "image": [
            "https://sieuthicaulong.vn/images/badminton-yard/1689155044_gallery_san-cau-long-105-lang-ha-1.jpg",
            "https://thethaothienlong.vn/wp-content/uploads/2022/04/dac-diem-san-cau-long-1.jpg"
        ]
    })

    const [inputUtility, setInputUtility] = useState('')

    async function getMyCourt() {
        try {
            const { data } = await client.query({
                query: GET_MY_COURT,
                variables: {
                    ownerId: _ownerId,
                }
            })
            setInputs({
                "courtName": data.owner_singleCourt.courtName,
                "categories": data.owner_singleCourt.categories,
                "address": data.owner_singleCourt.address,
                "description": data.owner_singleCourt.description,
                "utility": data.owner_singleCourt.utility,
                location: {
                    latitude: data.owner_singleCourt.location.latitude,
                    longitude: data.owner_singleCourt.location.longitude
                },
                "pricePerHour": data.owner_singleCourt.pricePerHour,
                variableCost: data.owner_singleCourt.variableCost,
                "workingHours": {
                    "start": data.owner_singleCourt.workingHours.start,
                    "end": data.owner_singleCourt.workingHours.end
                },
                "depositPercentage": data.owner_singleCourt.depositPercentage,
                "maxSCourt": data.owner_singleCourt.maxSCourt,
                "image": data.owner_singleCourt.image,
            })
        } catch (err) {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        }
    }

    async function updateMyCourt() {

        console.log(inputs)
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_MY_COURT,
                variables: {
                    ownerId: _ownerId,
                    body: inputs
                }
            })

            if (data.owner_updateCourt === 'Court updated!') {
                await alert('Lưu thay đổi thành công!')
                window.location.reload()
            }
        } catch (err) {
            console.log(JSON.stringify(err, null, 2))
            throw new Error('Error', err.message)
        }
    }

    useEffect(() => {
        getMyCourt()
    }, [])

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.navHolder}></div>
            <div className={styles.content}>
                <div className={styles.contentContainer}>
                    <h2>Hãy cho chúng tôi biết về sân của bạn</h2>

                    {/* area to choose your sport
                    <h2>Mon the thao</h2>
                    <div className={styles.chooseSport}>
                        {courtData.singleCourt.categories.map((sport, index) => (
                            <div className={styles.singlecourt}>
                                <img
                                    className={styles.logo}
                                    src={courtData.singleCourt.sportsLogo[index]}
                                    alt="sport-logo"
                                />
                                <h2
                                className={styles.single - sport}
                                    onClick={() => setPick(sport)}
                                    key={sport}
                                    style={{
                                        color: pick === sport ? "black" : "rgba(99, 96, 96, 1)",
                                    }}
                                >
                                    {sport}
                                </h2>
                                </div>
                        ))}
                    </div> */}

                    <h3 style={{ marginTop: 20 }}>Tên sân</h3>
                    <input
                        type="text"
                        className={styles.input}
                        value={inputs.courtName}
                        placeholder="Ví dụ: Sân cầu lông Nguyễn Văn Nghi"
                        onChange={e => setInputs(prev => ({
                            ...prev,
                            courtName: e.target.value,
                        }))}
                    />

                    <h3 style={{ marginTop: 20 }}>Số lượng sân nhỏ</h3>
                    <input
                        type="number"
                        placeholder="So luong san"
                        className={styles.input}
                        min="1"
                        value={inputs.maxSCourt}
                        onChange={e => setInputs(prev => ({
                            ...prev,
                            maxSCourt: parseInt(e.target.value),
                        }))}
                    />

                    <h3 style={{ marginTop: 20 }}>Địa chỉ</h3>
                    <input
                        placeholder="Ví dụ: 161 Nguyễn Văn Nghi, Phường 7, Gò Vấp, Thành phố Hồ Chí Minh"
                        className={styles.input}
                        value={inputs.address}
                        onChange={e => setInputs(prev => ({
                            ...prev,
                            address: e.target.value,
                        }))}
                    />

                    {/* description area */}
                    <h3 style={{ marginTop: 20 }}>Mô tả sân</h3>
                    <textarea
                        placeholder="Mô tả sân"
                        className={styles.descriptionPara}
                        type="text"
                        value={inputs.description}
                        onChange={e => setInputs(prev => ({
                            ...prev,
                            description: e.target.value,
                        }))}
                    />

                    {/* facilities, similar to do-do list */}
                    <h3 style={{ marginTop: 20 }}>Tiện ích</h3>

                    <input
                        placeholder="Ví dụ: trà đá miễn phí"
                        className={styles.input}
                        style={{ marginBottom: 10 }}
                        value={inputUtility}
                        onChange={e => setInputUtility(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                setInputs(prev => ({
                                    ...prev,
                                    utility: [...prev.utility, inputUtility]
                                }))
                                setInputUtility('')
                            }
                        }}
                    />

                    {inputs.utility.map((item, index) => (
                        <p
                            key={index}
                            className={styles.utility}
                            onClick={() => setInputs(prev => ({
                                ...prev,
                                utility: prev.utility.filter((uti, utiIndex) => utiIndex !== index)
                            }))}
                        >{`\u2022 ${item}`}</p>
                    ))}

                    <h3 style={{ marginTop: 20 }}>Giờ làm việc</h3>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <p>Bắt đầu: </p>
                        <TimePicker
                            placeholder="Chọn giờ bắt đầu"
                            use12Hours={false}
                            showSecond={false}
                            focusOnOpen={true}
                            allowEmpty={false}
                            minuteStep={30}
                            onChange={e => setInputs(prev => ({
                                ...prev,
                                workingHours: {
                                    start: e,
                                    end: prev.workingHours.end
                                }
                            }))}
                        />
                        <p>{String(new Date(inputs.workingHours.start).getHours())}:{String(new Date(inputs.workingHours.start).getMinutes()).padStart(2, '0')}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 5 }}>
                        <p>Kết thúc: </p>
                        <TimePicker
                            placeholder="Chọn giờ kết thúc"
                            use12Hours={false}
                            showSecond={false}
                            focusOnOpen={true}
                            allowEmpty={false}
                            minuteStep={30}
                            onChange={e => setInputs(prev => ({
                                ...prev,
                                workingHours: {
                                    start: prev.workingHours.start,
                                    end: e
                                }
                            }))}
                        />
                        <p>{String(new Date(inputs.workingHours.end).getHours())}:{String(new Date(inputs.workingHours.end).getMinutes()).padStart(2, '0')}</p>
                    </div>
                    <div className={styles.line}></div>
                    <h3 style={{ marginTop: 20 }}>Giá sân trên một tiếng</h3>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <input
                            type="number"
                            placeholder="Giá tiền"
                            className={styles.input}
                            min="1"
                            value={inputs.pricePerHour}
                            onChange={e => setInputs(prev => ({
                                ...prev,
                                pricePerHour: parseInt(e.target.value),
                            }))}
                        />
                        <p>{` ${Number(inputs.pricePerHour).toLocaleString()} đ`}</p>
                    </div>
                    <h3 style={{ marginTop: 20 }}>Phần trăm cần đặt cọc</h3>
                    <p>*Lưu ý: Nếu chỉ nhận trả toàn bộ, ghi 100.</p>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <input
                            type="number"
                            placeholder="Ví dụ: 50%, ghi 50"
                            className={styles.input}
                            min="0"
                            value={inputs.depositPercentage}
                            onChange={e => setInputs(prev => ({
                                ...prev,
                                depositPercentage: parseInt(e.target.value),
                            }))}
                        />
                        <p>{inputs.depositPercentage}%</p>
                    </div>

                    <div className={styles.line}></div>
                    <button className={styles.saveButton} onClick={updateMyCourt}>Lưu thay đổi</button>
                </div>
            </div>
        </div >
    );
}

export default Court;
