const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createRazorpayOrder = async (amount) => {
    const options = {
        amount: amount * 100, // amount in smallest currency unit
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`
    };

    try {
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
