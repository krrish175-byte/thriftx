const Razorpay = require('razorpay');
const crypto = require('crypto');

let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
} else {
    console.warn('Razorpay keys missing. Payment features will be disabled.');
}

exports.createRazorpayOrder = async (amount) => {
    const options = {
        amount: amount * 100, // amount in smallest currency unit
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`
    };

    try {
        if (!razorpay) {
            throw new Error('Razorpay is not initialized. Please check your environment variables.');
        }
        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        throw error;
    }
};

exports.verifyPaymentSignature = (orderId, paymentId, signature) => {
    const text = orderId + "|" + paymentId;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(text.toString())
        .digest("hex");

    return expectedSignature === signature;
};
