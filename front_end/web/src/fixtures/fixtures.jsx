const courtData = {
    "singleCourt": {
        "_id": "658ea3cf9a092c8da06dfae5",
        "_courtId": "429cc781-0993-46da-9b26-0e98bee89b5c",
        "courtName": "san cau long nguyen van nghi",
        "categories": [
            "cau long",
            "bong ro"
        ],
        "address": "208, Nguyen Huu Canh, P3, Go Vap",
        "description": "Day la mot san cau long rat dang cap",
        "utility": [
            "Free wifi",
            "Free tra da"
        ],
        "location": {
            "latitude": "0.2391049",
            "longitude": "0.28329232"
        },
        "pricePerHour": 300000,
        "variableCost": 0,
        "workingHours": {
            "start": String(new Date(2024, 2,2, 6, 0)),
            "end": String(new Date(2024, 2,2, 23, 0))
        },
        "rating": {
            "totalRating": 1,
            "sumRating": 3
        },
        "image": [
            "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fHw%3D"
        ]
    }
}

const rate = 0.06

const bookingData = {
    "getBookings": [
        {
            _id: "093f10sdfoios",
            _bookingId: "0139fj0w9df0sdk",
            _bookerId: "8c72ff39-fbf6-42ea-8955-7ad9f88eab99",
            _courtId: "54b56957-c01e-43b8-877c-096ad9e36010",
            courtName: "Nguyen Van Nghi",
            address: "208 Nguyen Huu Canh",
            image: ["https://sieuthicaulong.vn/images/badminton-yard/1689155044_gallery_san-cau-long-105-lang-ha-1.jpg"],
            userName: "Khang Tran",
            userPhone: "0344556853",
            timeSelection: [25, 26, 27],
            date: "2024-01-20T17:00:00.000Z",
            totalPrice: 300000,
            depositedAmount: 150000,
            owe: 132000,
            courtNumber: 'S1',
            paymentMethod: "VNPay",
            promotions: [""],
            cancelled: false,
            checkIn: false,
            transactionStatus: ""
        },
        {
            _id: "093f10sdfoios",
            _bookingId: "0139fj0w9df0sdk",
            _bookerId: "8c72ff39-fbf6-42ea-8955-7ad9f88eab99",
            _courtId: "54b56957-c01e-43b8-877c-096ad9e36010",
            courtName: "Nguyen Van Nghi",
            address: "208 Nguyen Huu Canh",
            image: ["https://sieuthicaulong.vn/images/badminton-yard/1689155044_gallery_san-cau-long-105-lang-ha-1.jpg"],
            userName: "Danh Bui",
            userPhone: "0999998369",
            timeSelection: [30, 31, 32],
            date: "2024-01-20T17:00:00.000Z",
            totalPrice: 300000,
            depositedAmount: 150000,
            owe: 132000,
            courtNumber: 'S2',
            paymentMethod: "VNPay",
            promotions: [""],
            cancelled: false,
            checkIn: false,
            transactionStatus: ""
        },
        {
            _id: "093f10sdfoios",
            _bookingId: "0139fj0w9df0sdk",
            _bookerId: "8c72ff39-fbf6-42ea-8955-7ad9f88eab99",
            _courtId: "54b56957-c01e-43b8-877c-096ad9e36010",
            courtName: "Nguyen Van Nghi",
            address: "208 Nguyen Huu Canh",
            image: ["https://sieuthicaulong.vn/images/badminton-yard/1689155044_gallery_san-cau-long-105-lang-ha-1.jpg"],
            userName: "Chuong Tran",
            userPhone: "0999998369",
            timeSelection: [22, 23, 24],
            date: "2024-01-20T17:00:00.000Z",
            totalPrice: 300000,
            depositedAmount: 150000,
            owe: 132000,
            courtNumber: 'S3',
            paymentMethod: "VNPay",
            promotions: [""],
            cancelled: false,
            checkIn: false,
            transactionStatus: ""
        },

    ]
}

const pendings = {
    data: [
        {
            "_bookingId": "0129f01foiwofsos",
            courtNumber: 'S2',
            "userName": "Nam Nguyen",
            "userPhone": "0344556853",
            "amountDue": 50000
        },
        // {
        //     "_bookingId": "0129f01foiwofsos",
        //     courtNumber: 'S1',
        //     "userName": "Phuoc An",
        //     "userPhone": "0344556853",
        //     "amountDue": 100000
        // },
        {
            "_bookingId": "0129f01foiwofs3os",
            courtNumber: 'S3',
            "userName": "Dan Le",
            "userPhone": "0999998369",
            "amountDue": 150000
        },
    ]
}

const availability = {
    "data": {
        "availabilityCourtDaily": [
            {
                "_courtId": "e00346ea-0455-41cb-9647-8720ec778731",
                "availability": [
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25,
                    26,
                    27,
                    28,
                    30,
                    31,
                    32,
                    33,
                    34,
                    35,
                    36,
                    38,
                ],
                "date": new Date()
            },
            {
                "_courtId": "e00346ea-0455-41cb-9647-8720ec778731",
                "availability": [
                    18,
                    19,
                    24,
                    25,
                    26,
                    27,
                    28,
                    29,
                    33,
                    34,
                    35,
                ],
                "date": new Date() + 1
            },
            {
                "_courtId": "e00346ea-0455-41cb-9647-8720ec778731",
                "availability": [
                    19,
                    20,
                    21,
                    22,
                    30,
                    31,
                    32
                ],
                "date": new Date()
            },
            {
                "_courtId": "e00346ea-0455-41cb-9647-8720ec778731",
                "availability": [
                    15,
                    16,
                    17,
                    19,
                    20,
                    21,
                    22,
                    25,
                    26,
                    27,
                    30,
                    31,
                    32
                ],
                "date": new Date()
            },
            {
                "_courtId": "e00346ea-0455-41cb-9647-8720ec778731",
                "availability": [
                    19,
                    20,
                    21,
                    22,
                    28,
                    29,
                    30,
                ],
                "date": new Date()
            },
            {
                "_courtId": "e00346ea-0455-41cb-9647-8720ec778731",
                "availability": [
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    25
                ],
                "date": new Date()
            },
            {
                "_courtId": "e00346ea-0455-41cb-9647-8720ec778731",
                "availability": [
                    19,
                    20,
                    21,
                    22,
                    25,
                    26,
                    27,
                    28,
                    31,
                    32,
                    33,
                    36,
                    37
                ],
                "date": new Date()
            },
        ]
    }
}

const statistics = {
    "data": {
        "getStatistics": {
            "bookings": 3,
            "revenue": 275000,
            "owe": 300000
        }
    }
}

//Data for chat website
// const sampleUserData = {
//     khang: "Trần Gia Khang",
//     namnguyen: "Nguyễn Nam Nguyên",
//     hoangquan: "Nguyễn Hoàng Quân"
// }

const sampleUserData = [
    {
        senderId: 'namnguyen',
        userName: "Nguyễn Nam Nguyên",
        messageTime: "2 days ago",
        // messageText: "Bạn: Có nhé em"
    },
    // {
    //     senderId: 2,
    //     userName: "San cau long Nguyen Hoang Quan",
    //     messageTime: "1 days ago",
    //     messageText: "Chuc mung nam moi, an khang thinh vuong"
    // },
    // {
    //     senderId: 3,
    //     userName: "San cau long Mike Dien",
    //     messageTime: "1 hour ago",
    //     messageText: "Chuc mung nam moi giap thin 2024"
    // },
]

export { courtData, bookingData, availability, statistics, pendings, rate, sampleUserData }