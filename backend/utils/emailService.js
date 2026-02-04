const nodemailer = require('nodemailer');

const sendVerificationEmail = async (to, productTitle, status, reason = '') => {
    // Check if SMTP credentials are provided
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT || 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            const subject = `Product Verification Update: ${productTitle}`;
            let text = `Your product "${productTitle}" has been updated to status: ${status}.`;

            if (status === 'rejected') {
                text += `\n\nReason for rejection: ${reason}\n\nPlease update your listing and try again.`;
            } else if (status === 'active') {
                text += `\n\nIt is now live on the marketplace!`;
            }

            await transporter.sendMail({
                from: `"ThriftX Admin" <${process.env.SMTP_USER}>`,
                to,
                subject,
                text,
            });
            console.log(`Email sent to ${to}: ${status}`);
        } catch (error) {
            console.error('Email sending failed:', error);
        }
    } else {
        // Fallback: Mock Logger (if no credentials)
        console.log(`[MOCK EMAIL] To: ${to} | Subject: Product Verification Update: ${productTitle}`);
        console.log(`[MOCK EMAIL] Body: Status changed to ${status}. Reason: ${reason}`);
    }
};

module.exports = { sendVerificationEmail };
