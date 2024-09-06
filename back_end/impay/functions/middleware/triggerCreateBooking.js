const fetch = require('node-fetch');

const endpoint = 'http://localhost:8000/api/v1';

const graphqlMutation = `
    mutation CreateBooking($body: InputBooking!) {
        createBooking(body: $body)
    }
`;

async function triggerCreateBooking(params) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: graphqlMutation,
                variables: {
                    body: {
                        "_userId": params._userId,
                        "_courtId": params._courtId,
                        "timeSelection": params.timeSelection,
                        "date": params.date,
                        paymentMethod: "VNPay"
                    }
                }
            }),
        });

        const data = await response.json();
        console.log('GraphQL response:', data);
    } catch (error) {
        console.error('Error fetching GraphQL data:', error);
    }
};


module.exports = { triggerCreateBooking }