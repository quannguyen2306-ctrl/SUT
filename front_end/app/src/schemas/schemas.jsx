import { gql } from '@apollo/client';

const GET_COURTS = gql`
    query Courts($params: InputLimitParams!) {
        courts(params: $params) {
            _id
            _courtId
            courtName
            categories
            address
            pricePerHour
            rating {
                totalRating
                sumRating
            }
            image
            inactive
        }
    }
`;

const GET_SINGLE_COURT = gql`
    query SingleCourt($courtId: String!) {
        singleCourt(_courtId: $courtId) {
            _id
            _ownerId
            _courtId
            courtName
            categories
            address
            description
            utility
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
`;

const SEARCH_COURTS = gql`
    query SearchCourts($searchInput: String!) {
        searchCourts(searchInput: $searchInput) {
            _id
            _courtId
            courtName
            pricePerHour
            image
            address
        }
    }
`;


const LOCK_COURTS = gql`
    mutation UpdateAvailabilityDaily($courtId: ID!, $body: InputAvailabilityCourtUpdated!) {
        updateAvailabilityDaily(_courtId: $courtId, body: $body) {
            errors {
                message
                code
            }
        }
    }
`

const GET_COMMENTS = gql`
    query GetComments($courtId: String!, $params: InputLimitParams!) {
        getComments(_courtId: $courtId, params: $params) {
            _id
            _commentId
            _courtId
            _userId
            name
            rating
            comment
            commentDate
            createdAt
        }
    }
`

const CREATE_COMMENTS = gql`
    mutation CreateComment($body: InputComment) {
        createComment(body: $body)
    }
`

const GET_BOOKINGS = gql`
    query GetBookings($bookerId: String!, $params: InputLimitParams!) {
        getBookings(_bookerId: $bookerId, params: $params) {
            _id
            _bookingId
            _bookerId
            _courtId
            courtName
            address
            image
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

const GET_SINGLE_BOOKING = gql`
    query GetSingleBooking($bookingId: String!) {
        getSingleBooking(_bookingId: $bookingId) {
            _id
            _bookingId
            _bookerId
            _courtId
            courtName
            address
            image
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

const CREATE_BOOKING = gql`
    mutation CreateBooking($body: InputBooking!) {
        createBooking(body: $body)
    }
`

const GET_FAVORITES = gql`
    query GetFavorites($userId: String!, $params: InputLimitParams!) {
        getFavorites(_userId: $userId, params: $params) {
            _id
            _courtId
            courtName
            address
            pricePerHour
            image
        }
    }
`
const IS_FAVORITE = gql`
    query Query($userId: String!, $id: String!) {
        isFavorite(_userId: $userId, _id: $id)
    }
`
const CREATE_FAVORITE = gql`
    mutation CreateFavorite($userId: String!, $courtId: String!) {
  createFavorite(_userId: $userId, _courtId: $courtId)
}
`
const DELETE_FAVORITE = gql`
    mutation DeleteFavorite($userId: String!, $id: String!) {
        deleteFavorite(_userId: $userId, _id: $id)
    }
`

const GET_STATUS_CHECK_IN = gql`
    query StatusCheckin($bookingId: String!) {
        getStatusCheckin(_bookingId: $bookingId)
    }
`
const CANCEL_BOOKING = gql`
    mutation CancelBooking($bookingId: String!) {
        cancelBooking(_bookingId: $bookingId)
    }
`

const UPDATE_AVAILABILITY = gql`
    mutation UpdateAvailabilityDaily($courtId: ID!, $body: InputAvailabilityCourtUpdated!) {
        updateAvailabilityDaily(_courtId: $courtId, body: $body) {
            message
        }
    }
`

export {
    GET_COURTS,
    GET_SINGLE_COURT,
    SEARCH_COURTS,
    LOCK_COURTS,
    GET_COMMENTS,
    CREATE_COMMENTS,
    GET_BOOKINGS,
    GET_SINGLE_BOOKING,
    CREATE_BOOKING,
    GET_FAVORITES,
    IS_FAVORITE,
    CREATE_FAVORITE,
    DELETE_FAVORITE,
    GET_STATUS_CHECK_IN,
    CANCEL_BOOKING,
    UPDATE_AVAILABILITY
}