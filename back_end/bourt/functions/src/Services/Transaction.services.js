import Transaction from '../Model/Transaction.model.js'


function calculateDeposit(depositPercentage, timeSelection, pricePerHour) {
    const percentage = depositPercentage / 100;
    const totalPrice = timeSelection.length * (pricePerHour / 2)
    return totalPrice * percentage
}

async function deposit(_courtId, _bookingId, depositPercentage, timeSelection, pricePerHour) {
    try {
        const amount = calculateDeposit(depositPercentage, timeSelection, pricePerHour)

        const newTransaction = new Transaction({
            _courtId: _courtId,
            _bookingId: _bookingId,
            type: "deposit",
            amount: amount
        })
        await newTransaction.save()

        return "Success man";

    } catch (err) {
        throw new Error('Error: ' + err.message);
    }
}

async function restDeposit(_courtId, _bookingId, timeSelection, depositPercentage, pricePerHour) {
    try {
        const newTransaction = new Transaction({
            _courtId: _courtId,
            _bookingId: _bookingId,
            type: "restDeposit",
            amount: calculateDeposit(100 - depositPercentage, timeSelection, pricePerHour)
        })
        await newTransaction.save()

        return "Success man";

    } catch (err) {
        throw new Error('Error: ' + err.message);
    }
}

async function fullPayment(_courtId, _bookingId, timeSelection, pricePerHour) {
    try {
        const newTransaction = new Transaction({
            _courtId: _courtId,
            _bookingId: _bookingId,
            type: "fullPayment",
            amount: calculateDeposit(100, timeSelection, pricePerHour)
        })
        await newTransaction.save()

        return "Success man";

    } catch (err) {
        throw new Error('Error: ' + err.message);
    }
}

export { deposit, fullPayment, restDeposit }